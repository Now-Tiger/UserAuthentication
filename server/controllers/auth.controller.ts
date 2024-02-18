import { Request, Response } from "express";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import ws from "ws";

dotenv.config();
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DB_NEON}`;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString, // Using `url` instead of `connector`
    },
  },
});

const userClient = prisma.user;

/** Login user bassed on password */
export const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userClient.findUnique({
      where: {
        email: email,
      },
    });
    if (user && user.password == password) {
      console.log(`Password matched`);
      res.status(200).json({ data: "You are logged in." });
    } else {
      console.log("password doesn't match");
      res.status(404).json({ Error: "Incorrect Password" });
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(400).json({ Error: "Server Error" });
  }
};
