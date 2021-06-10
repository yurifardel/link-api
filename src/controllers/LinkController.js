const express = require("express");
const LinkCollection = require("../../database/models/links");
const User = require("../../database/models/user");
const mongo = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    // console.log(req.userId);

    const { label, url, isSocial } = body;

    const image = "https://gooogle.com/image.png";

    const link = await LinkCollection.create({
      label,
      url,
      isSocial,
      image,
      id_usuario: req.userId,
    });

    res.jsonOK(link);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const links = await LinkCollection.find();

  return res.jsonOK(links);
});

router.get("/:_id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);

    const link = await LinkCollection.findOne({ userId: id });
    if (!link) return res.jsonNotFound();
    return res.jsonOk(link);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
