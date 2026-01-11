import express,{ Request, Response } from "express";
import { filterCustomerList, getCustomers, searchCustomers, updateCustomerRemarks } from "../controllers/customerContollers.js";

const router = express.Router();


router.get('/search', searchCustomers)
router.get('/filter', getCustomers)
router.patch('/remarks', updateCustomerRemarks)


export default router