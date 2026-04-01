import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "./generated/prisma";
import "dotenv/config";

const app = fastify({ logger: true });
const prisma = new PrismaClient();
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
  return await prisma.users.findMany();
});

app.post("/contracts/:id/start", async (req, res) => {
  const params = req.params as { id: string };
  const jId = params.id;

  const neww = await prisma.contracts.update({
    where: { id: jId },
    data: { lockedTill: new Date(Date.now() + 3600000) }, //locked for an hour
  });
  return neww;
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
