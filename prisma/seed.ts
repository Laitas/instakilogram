import { PrismaClient } from "@prisma/client";
import { SHA256 } from "crypto-js";

const hashPassword = (password: string) => {
  return SHA256(password).toString();
};
const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      name: "Laitas",
      email: "Laitas@insta.com",
      password: hashPassword("Laitas"),
    },
  });
};
main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
