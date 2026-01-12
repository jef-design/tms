import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export const loginUser = async (req: Request, res: Response) => {
   
  try {
    const { username, password, company } = req.body;

    if (!username || !password || !company) {
      return res.status(400).json({
        message: "Username, password, and company are required",
      });
    }

    // 1. Find company
    const existingCompany = await prisma.company.findUnique({
      where: { name: company },
    });

    if (!existingCompany) {
      return res.status(401).json({ message: "Invalid credentials comp" });
    }
    
    // 2. Find user under company
    const user = await prisma.user.findUnique({
      where: {
        username_companyId: {
          username,
          companyId: existingCompany.id,
        },
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials user" });
    }

    // 3. Compare password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
     const isPasswordValid = password === user?.password
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials pass" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        company: existingCompany.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, company } = req.body;

    // 1️⃣ Validate input
    if (!username || !password || !company) {
      return res.status(400).json({
        message: "Username, password, and company are required",
      });
    }

    // 2️⃣ Find company
    const existingCompany = await prisma.company.findUnique({
      where: { name: company },
    });

    if (!existingCompany) {
      return res.status(400).json({
        message: "Company does not exist. Ask admin to create it first.",
      });
    }

    // 3️⃣ Check if username already exists for this company
    const existingUser = await prisma.user.findUnique({
      where: {
        username_companyId: {
          username,
          companyId: existingCompany.id,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already taken in this company",
      });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        companyId: existingCompany.id,
        role: "USER", // default role
      },
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser.id,
        username: newUser.username,
        company: existingCompany.name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};