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

/** regester user */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const isEmailExists = await userClient.findUnique({
      where: { email: email },
    });
    if (isEmailExists) {
      res.status(404).json({ Error: "Email already in use" });
      return;
    } else if (password === confirmPassword) {
      const registerdUser = await userClient.create({
        data: {
          name: name,
          email: email,
          password: password,
          role: "user",
        },
      });
      res.status(201).json({ data: registerdUser });
    } else {
      console.log(`Password doesn't match`);
      res.status(400).json({ Error: "Incorrect password" });
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(400).json({ Error: "Server Error" });
  }
};

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

/** Logout User */
export const logoutUser = async (req: Request, res: Response) => {
  try {
    //
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(400).json({ Error: "Server Error" });
  }
};
