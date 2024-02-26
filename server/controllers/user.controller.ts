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

/** get all the users --> future update add pagination i.e ../users?page=10 or ../users?limit=10*/
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userClient.findMany();
    console.log(users);
    if (!users) {
      res.status(400).json({ Error: "No users data" });
    } else {
      res.status(200).json({ data: users });
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(400).json({ Error: "Server error" });
  }
};

/** For now just update the user's name */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { newName, email, password } = req.body;
    const user = await userClient.findUnique({ where: { email: email } });
    if (user && user.password === password) {
      console.log("user found");
      const updatedUser = await userClient.update({
        where: {
          email: email,
        },
        data: {
          name: newName,
        },
      });
      res.status(201).json({ data: updatedUser });
    } else {
      console.log(`user with ${email} not found.`);
      res.status(404).json({ Error: `incorrect email & password` });
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(404).json({ Error: "Server Error" });
  }
};

/** delete a user based on his unique email address */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findEmail = await userClient.findUnique({ where: { email: email } });
    if (findEmail && findEmail.password === password) {
      await userClient.delete({ where: { email: email } });
      console.log(`User deleted`);
      res.status(200).json({ Message: "User deleted", user: findEmail });
    } else {
      console.log(`User not found`);
      res.status(404).json({ Error: "User not found" });
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(400).json({ Error: "Server Error" });
  }
};
