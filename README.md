<div align="center">
  <img src="./assets/banner.png" alt="Black Market Banner" width="100%">
  <br />
  <h3><i>Get ready for the heists!! :3</i></h3>
  <p>Buy special combos to improve your chances to succeed (you can also go get a job if u're one of those...)</p>
</div>

## 💡 Concept

Basically an economy sim, where players manage money, buy specialized gear from marketplace, complete 'real-life' contracts, and execute heists using items they've purchased!

Check it out => [BLACKMARKETIK](https://blackmarketik.vercel.app/)

## 💻 Tech Stack

<div align="center">
  
**Frontend** <br />
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Backend & Database** <br />
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

</div>

## 👾 Functionalities

- **User Accounts**: players create an account (or log in) and start with $150
- **The Marketplace**: browsing items and buying them (this adds items to their inventories)
- **The Inventory**: players can view their purchases and choose up to 2 items as their gear for the next heist
- **Contracts (passive income)**: once started, a job gets locked for 1 hour, while the payout is added to a queue and processed automatically
- **Heists**: the heist is selected randomly. When player triggers mechanic, the server calculates success rate based on the stats of the items equipped (Combat, Hacking, Stealth) and heist's difficulty. Used items are removed from inventory and successful heists bring a fat paycheck <3

## ❗ There are also all of OP labs implemented:

- **Random generator** for random heist displayed in `Topbar.tsx` and calculating heist success change in `server.ts`
- **Memoization function:** used to optimize database, now the server contacts with DB once a minute (`memoize.ts, server.ts`)
- **Priority queue:** when player clicks 'go to work' the job is added to the queue. When multiple are queued, the one with the highest pay gets completed first (`process/queue.ts` - frontend, `Contracts.tsx`)
- **Async array:** multiple uses throughout the project (example: `server.ts`)
- **Large data processing:** generators _heistHistory_ and _filterSuccessful_ create a stream and filter database, and route _/analytics/successful-heists_ shows a summary of all successful heists ever completed (`server.ts`)
- **Reactive communication:** _window.dispatchEvent()_ to add an event, _window.addEventListener()/window.removeEventListener()_ to subscribe/unsubscribe. Those are used to dynamically change money in `Topbar.tsx` and inventory items displayed in `Inventory.tsx` (+ `Contracts.tsx, Market.tsx`)
- **Authentication** using JWT tokens, which are later stored in local storage (`process/api.ts` - frontend, `server.ts`)
- **Logging decorator:** custom decorator (_@Log_). Every time a player tries to buy an item, the exact arguments (wallet amount, price) are logged to console with timestamps (`logger.ts, server.ts`)

Phew...

## 🚀 Getting Started

```javascript
git clone https://github.com/setlors/blackmarketik.git
```

1. Set up the Environment Variables:
   create a .env file inside of server folder and add your MongoDB connection string inside it: `DATABASE_URL="your_connection_string"`

2. Set up the server:

```javascript
cd server
npm install
npm run dev
```

3. Set up frontend:

```javascript
cd frontend
npm install
npm run dev
```

🐽
