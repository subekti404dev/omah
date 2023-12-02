import { validateRequiredFields } from "../../utils/field-validation.util";
import { database } from "../../db/db";
import express, { Request, Response } from "express";
import _ from "lodash";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = database.getBookmarks();
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

router.post("/categories", async (req: Request, res: Response) => {
  try {
    const { name } = req.body || {};
    validateRequiredFields({ name });
    const data = database.getBookmarks();
    const lastId = _.sortBy(data, "id").reverse()?.[0]?.id || 0;
    const lastSort = _.sortBy(data, "sort").reverse()?.[0]?.id || 0;
    const newCategory = { id: lastId + 1, name, sort: lastSort + 1, items: [] };
    database.addCategory(newCategory);
    res.json({
      success: true,
      data: newCategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete(
  "/categories/:category_id",
  async (req: Request, res: Response) => {
    try {
      const { category_id } = req.params;
      validateRequiredFields({ category_id });
      database.deleteCategory(parseInt(category_id));
      res.json({
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.post("/items", async (req: Request, res: Response) => {
  try {
    const { name, url, icon, category_id } = req.body || {};
    validateRequiredFields({ name, url, icon, category_id });
    const category = database.getBookmarks().find((c) => c.id === category_id);
    if (!category) throw Error("category not found");
    const lastId = _.sortBy(category.items, "id").reverse()?.[0]?.id || 0;
    const lastSort = _.sortBy(category.items, "sort").reverse()?.[0]?.id || 0;
    const newItem = {
      id: lastId + 1,
      name,
      url,
      icon,
      sort: lastSort + 1,
      category_id,
    };
    database.addItem(newItem);
    res.json({
      success: true,
      data: newItem,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete(
  "/categories/:category_id/items/:item_id",
  async (req: Request, res: Response) => {
    try {
      const { category_id, item_id } = req.params;
      validateRequiredFields({ item_id, category_id });
      database.deleteItem(parseInt(item_id), parseInt(category_id));
      res.json({
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

export default router;
