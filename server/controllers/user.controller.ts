import { Request, Response } from "express";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import ws from "ws";

dotenv.config();
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DB_NEON}`;

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString, // Using `url` instead of `connector`
    },
  },
});

const userClient = prisma.user;

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

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(`name: ${name} | email: ${email} | password: ${password}`);
    const newUser = await userClient.create({
      data: {
        name: name,
        email: email,
        password: password,
        role: "user",
      },
    });
    res.status(201).json({ data: newUser });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(400).json({ Error: "Error while creating user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const updatedUser = await userClient.update({
      where: {
        email: email,
      },
      data: {
        name: name,
        password: password,
      },
    });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(400).json({ Error: "Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const deletedUser = await userClient.delete({
      where: { email: email },
    });
    console.log(deletedUser)
    res.status(200).json({ data: deletedUser });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(400).json({ Error: "Server Error" });
  }
};
