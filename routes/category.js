const express = require("express");
const Category = require("../models/category");

categoryRouter = express.Router();

categoryRouter.post("/api/categories", async (req, res) => {
  try {
    const { name, image, banner } = req.body;
    const category = new Category({ name, image, banner });
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
categoryRouter.get("/api/categories", async (req, res) => {
  try {
    const categoreis = await Category.find();
    res.status(200).send({categoreis});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = categoryRouter;
