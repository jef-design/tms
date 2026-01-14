import {Request, Response} from "express";
import XLSX from "xlsx";
import {prisma} from "../lib/prisma.js";
import ExcelJS from "exceljs";
interface CustomerExcelRow {
  salesman?: string;
  custcode?: string;
  customer?: string;
  contact?: string;
  longitude?: number | string;
  latitude?: number | string;
  status?: string;
}
const HEADER_MAP: Record<string, string> = {
  salesman: "salesman",

  custcode: "custcode",

  customer: "customer",

  contact_no: "contact",

  longitude: "longitude",

  latitude: "latitude",

  tagging_completed: "status",
};

function normalizeRow(row: Record<string, any>) {
  const normalized: Record<string, any> = {};

  Object.keys(row).forEach((key) => {
    const cleanKey = key
      .toLowerCase()
      .replace(/\./g, "")      // remove dots
      .trim()
      .replace(/\s+/g, "_");  // spaces → underscore

    const mappedKey = HEADER_MAP[cleanKey];
    if (mappedKey) {
      normalized[mappedKey] = row[key];
    }
  });

  return normalized;
}


export const uploadCustomers = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Read Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
      defval: null,
    });

    if (!rawRows.length) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // Normalize and map rows
    const rows = rawRows.map(normalizeRow);

    const customers = rows.map((row, index) => {
      const { salesman, custcode, status } = row;

      const isEmpty = (v: any) =>
        v === null || v === undefined || String(v).trim() === "";

      if (isEmpty(salesman) || isEmpty(custcode) || isEmpty(status)) {
        throw new Error(
          `Invalid Excel format at row ${index + 2}: SALESMAN, CUSTCODE, TAGGING COMPLETED are required`
        );
      }

      return {
        salesman: String(salesman).trim(),
        customer_code: String(custcode).trim(),
        customer_name: row.customer ? String(row.customer).trim() : null,
        contact: row.contact ? String(row.contact).trim() : null,
        longitude: row.longitude ? Number(row.longitude) : null,
        latitude: row.latitude ? Number(row.latitude) : null,
        taggingStatus: String(status).trim(),
      };
    });

    // Upsert customers (insert or update if exists)
    await Promise.all(
      customers.map((customer) =>
        prisma.customer.upsert({
          where: { customer_code: customer.customer_code }, // must be unique in your model
          update: {
            salesman: customer.salesman,
            customer_name: customer.customer_name,
            contact: customer.contact,
            longitude: customer.longitude,
            latitude: customer.latitude,
            taggingStatus: customer.taggingStatus,
          },
          create: customer,
        })
      )
    );

    return res.status(201).json({
      success: true,
      message: `${customers.length} customers uploaded/updated successfully`,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Failed to upload customers",
    });
  }
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
    } catch (error) {}
};
const EXPORT_COLUMNS = [
  { header: "SALESMAN", key: "salesman", width: 20 },
  { header: "CUSTCODE", key: "customer_code", width: 20 },
  { header: "CUSTOMER", key: "customer_name", width: 30 },
  { header: "CONTACT NO.", key: "contact", width: 20 },
  { header: "LONGITUDE", key: "longitude", width: 15 },
  { header: "LATITUDE", key: "latitude", width: 15 },
  { header: "TAGGING COMPLETED", key: "taggingStatus", width: 25 },
];
export const exportCustomersToExcel = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        salesman: true,
        customer_code: true,
        customer_name: true,
        contact: true,
        longitude: true,
        latitude: true,
        taggingStatus: true,
      },
    });

    if (!customers.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Customers");

    worksheet.columns = EXPORT_COLUMNS;

    customers.forEach((cust: any) => worksheet.addRow(cust));

    // 🔥 STYLE HEADER
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFEFEFEF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=customers.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to export Excel" });
  }
};

