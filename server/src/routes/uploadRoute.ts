import express,{ Request, Response } from "express";
import multer from "multer";
import path from "path";
import { uploadCustomers, getCustomerInfo, exportCustomersToExcel } from "../controllers/uploadContollers.js";


const router = express.Router();


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
router.get('/customers/export', exportCustomersToExcel)
router.patch('/customers', upload.single("file"), uploadCustomers)
router.get('/customers/:id', getCustomerInfo)


export default router