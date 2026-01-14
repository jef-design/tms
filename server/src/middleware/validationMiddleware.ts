import { body, param } from "express-validator";


const registerValidator = [
    body("company").notEmpty().withMessage("Invalid Company Name"),
    body("username").notEmpty().withMessage("Username must be filled"),
    body("password")
        .notEmpty()
        .withMessage("Password must be filled")
        .isLength({min: 6, max: 12})
        .withMessage("Password must be 6-12 characters"),
];

const signInValidator = [
    body("company").notEmpty().withMessage("Invalid Company Name"),
    body("username").notEmpty().withMessage("Username must be filled"),
    body("password")
        .notEmpty()
        .withMessage("Password must be filled")
        .isLength({min: 6, max: 12})
        .withMessage("Password must be 6-12 characters"),
];


export {registerValidator,signInValidator}