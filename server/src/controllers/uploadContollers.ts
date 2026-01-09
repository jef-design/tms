import {Request, Response} from "express";
import XLSX from "xlsx";
import {prisma} from "../lib/prisma.js";

export interface CustomerExcelRow {
    salesman: string;
    custcode: string;
    customer?: string;
    contact?: string;
    longitude?: number | string;
    latitude?: number | string;
    status: string;
}

export const uploadCustomers = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({message: "File is required"});
        }

        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json<CustomerExcelRow>(sheet, {
            defval: null, // avoids undefined values
        });

        if (!rows.length) {
            return res.status(400).json({message: "Excel file is empty"});
        }

        const customers = rows.map((row, index) => {
            const salesman = row.salesman;
            const custcode = row.custcode;
            const status = row.status;

            const isEmpty = (v: any) => v === null || v === undefined || String(v).trim() === "";

            if (isEmpty(salesman) || isEmpty(custcode) || isEmpty(status)) {
                throw new Error(`Invalid Excel format at row ${index + 2}: salesman, custcode, status are required`);
            }

            return {
                salesman: String(salesman).trim(),
                customer_code: String(custcode).trim(), // 🔥 FIX
                customer_name: row.customer ? String(row.customer).trim() : null,
                contact: row.contact ? String(row.contact).trim() : null,
                longitude: row.longitude ? Number(row.longitude) : null,
                latitude: row.latitude ? Number(row.latitude) : null,
                taggingStatus: String(status).trim(),
            };
        });

        await prisma.customer.createMany({
            data: customers,
            skipDuplicates: true, // skips duplicate customer_code
        });

        res.status(201).json({
            success: true,
            inserted: customers.length,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: error.message || "Failed to upload customers",
        });
    }
};
export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany({
            take: 20,
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json({
            message: "success get customer",
            customers,
        });
    } catch (error) {}
};
export const getCustomerInfo = async (req: Request, res: Response) => {
    const {id} = req.params;
    console.log(id);
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                customer_code: id,
            },
        });
        if (!customer) return res.status(404).json({message: "Customer not found"});

        res.json(customer);
    } catch (error) {
        
    }
};
