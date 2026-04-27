import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "./generated/prisma";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const app = fastify({ logger: true });
const prisma = new PrismaClient();
const mongoUrl = process.env.DATABASE_URL;

if (!mongoUrl) {
  throw new Error("DATABASE_URL is not set");
}

const mongoClient = new MongoClient(mongoUrl);
const mongoDb = mongoClient.db();
const PORT = 5000;

app.register(cors, { origin: true });

app.get("/contracts", async (req, reply) => {
  return await prisma.contracts.findMany();
});

app.get("/products", async (req, reply) => {
  return await prisma.products.findMany();
});

app.get("/stocks", async (req, reply) => {
  return await prisma.stocks.findMany();
});

app.get("/users", async (req, reply) => {
  const users = await prisma.users.findMany();
  if (users.length > 0) {
    return users;
  }

  const mongoUsers = await mongoDb.collection<any>("users").find({}).toArray();
  const fixedUsers = [];

  for (const user of mongoUsers) {
    if (!user.id && user._id) {
      user.id = String(user._id);
    }
    fixedUsers.push(user);
  }

  return fixedUsers;
});

app.post("/contracts/:id/start", async (req, res) => {
  const id = (req.params as { id: string }).id;
  const lockedTill = new Date(Date.now() + 3600000); //locked for an hour

  await mongoDb
    .collection<any>("contracts")
    .updateOne({ $or: [{ _id: id }, { id: id }] }, { $set: { lockedTill } });

  return { lockedTill };
});

app.post("/users/:id/start", async (req, res) => {
  const id = (req.params as { id: string }).id;
  const { amount } = req.body as { amount: number };

  await mongoDb
    .collection<any>("users")
    .updateOne(
      { $or: [{ _id: id }, { id: id }] },
      { $inc: { wallet: amount } },
    );

  const upd = await mongoDb
    .collection<any>("users")
    .findOne({ $or: [{ _id: id }, { id: id }] });

  return upd;
});

app.post("/users/:id/pay", async (req, res) => {
  const id = (req.params as { id: string }).id;
  const { amount } = req.body as { amount: number };

  await mongoDb
    .collection<any>("users")
    .updateOne(
      { $or: [{ _id: new ObjectId(id) }, { id: id }] },
      { $inc: { wallet: amount } },
    );

  const ugh = await mongoDb
    .collection<any>("users")
    .findOne({ $or: [{ _id: new ObjectId(id) }, { id: id }] });

  return ugh;
});

app.post("/users/:id/buy", async (req, res) => {
  const userId = (req.params as { id: string }).id;
  const { productId, price } = req.body as { productId: string; price: number };

  try {
    const objectId = new ObjectId(userId);
    const user = await mongoDb
      .collection<any>("users")
      .findOne({ _id: objectId });

    if (user.wallet < price) {
      return res.status(400).send({ error: "Not enough $$$" });
    }

    await mongoDb
      .collection<any>("users")
      .updateOne({ _id: objectId }, {
        $inc: { wallet: -price },
        $push: { inventory: productId },
      } as any);
  } catch (error) {
    console.error("error w bying", error);
  }
});

const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
