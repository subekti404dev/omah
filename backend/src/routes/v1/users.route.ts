import { database } from "../../db/db";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    const { password, ...data } = database.getUser();
    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
