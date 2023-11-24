import express, { Request, Response } from "express";
import { generateJwt } from "../../utils/jwt.util";
import { validateRequiredFields } from "../../utils/field-validation.util";
import { database } from "../../db/db";
import md5 from "md5";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    validateRequiredFields({ email, password });

    const { password_hash, ...user } = database.getUser();

    if (password_hash !== md5(password))
      throw Error("Invalid Email or Password");

    res.json({
      success: true,
      token: generateJwt(user),
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
