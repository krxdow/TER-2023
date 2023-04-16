const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function connect() {
  await prisma.$connect();
  console.log("Connected to the database");
}

async function disconnect() {
  await prisma.$disconnect();
  console.log("Disconnected from the database");
}

module.exports = {
  prisma,
  connect,
  disconnect,
};
