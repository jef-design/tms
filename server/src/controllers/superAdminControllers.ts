// controllers/superAdmin.controller.ts
import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

 const createCompany = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Company name required" });
  }

  const company = await prisma.company.create({
    data: { name },
  });

  res.status(201).json(company);
};
// controllers/superAdmin.controller.ts

 const createCompanyAdmin = async (req: Request, res: Response) => {
  const { username, password, companyId } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: "COMPANY_ADMIN",
      companyId,
    },
  });

  res.status(201).json(admin);
};

export {createCompany, createCompanyAdmin}