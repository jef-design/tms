import {Request, Response} from "express";
import {prisma} from "../lib/prisma.js";


 const getCustomers = async (req: Request, res: Response) => {
  const { search, page } = req.query;

  const pageNumber = Number(page) || 1; // default to 1
  const itemsPerPage = 10; // you can change this

  const skipItems = (pageNumber - 1) * itemsPerPage;

  try {
    // Count total matching customers
    const totalCustomer = await prisma.customer.count({
      where: search
        ? {
            OR: [
              { customer_code: { contains: String(search), mode: "insensitive" } },
              { customer_name: { contains: String(search), mode: "insensitive" } },
              { salesman: { contains: String(search), mode: "insensitive" } },
            ],
          }
        : {},
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCustomer / itemsPerPage);

    // Fetch customer list
    const list = await prisma.customer.findMany({
      where: search
        ? {
            OR: [
              { customer_code: { contains: String(search), mode: "insensitive" } },
              { customer_name: { contains: String(search), mode: "insensitive" } },
              { salesman: { contains: String(search), mode: "insensitive" } },
            ],
          }
        : {},
      orderBy: { createdAt: "desc" },
      skip: skipItems,
      take: itemsPerPage,
    });

    res.status(200).json({
      message: "Fetched customers",
      list,
      totalPages,
      totalCustomer,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchCustomers = async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const employees = await prisma.customer.findMany({
        where: search
            ? {
                  OR: [
                      {customer_code: {contains: search, mode: "insensitive"}},
                      {customer_name: {contains: search, mode: "insensitive"}},
                      {salesman: {contains: search, mode: "insensitive"}},
                  ],
              }
            : {},
        orderBy: {createdAt: "desc"},
        take: 20,
    });

    res.json(employees);
};

const filterCustomerList = async (req: Request, res: Response) => {
    const {page} = req.query;

    const pageNumber: any = Number(page);
    const totalItems = 10;
    const skipItems = pageNumber ? (pageNumber - 1) * totalItems : undefined;
    // const {id} = req.params;

    try {
        const count = await prisma.customer.count({});
        const totalPages = Math.ceil(count / totalItems);
        const list = await prisma.customer.findMany({
            skip: skipItems,
            take: pageNumber ? totalItems : undefined,
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            message: "get lists",
            list,
            totalPages,
            totalCustomer: count,
            currentPage: pageNumber || "all",
        });
    } catch (error) {}
};

const updateCustomerRemarks = async (req: Request, res: Response) => {

    const {customer_code, remarks} = req.body
    try {
        const cust = await prisma.customer.update({
            where: {
                customer_code
            },
            data:{
                remarks: remarks
            }
        })
        res.status(200).json({
            message: 'Remarks Updated'
        })
    } catch (error) {
        
    }
}
export {getCustomers,searchCustomers, filterCustomerList, updateCustomerRemarks};
