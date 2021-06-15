const express = require("express");
const LinkCollection = require("../../database/models/links");
const router = express.Router();

const { getTokenFromHeaders, verifyJwt } = require("../helpers/jwt");

router.post("/", async (req, res) => {
  try {
    const token = getTokenFromHeaders(req.headers);
    if (!token) {
      return res.json({ error: "token nonexistent" });
    }

    const decoded = verifyJwt(token);
    const id = decoded.id;

    const { label, url, isSocial } = req.body;

    const image = "https://gooogle.com/image.png";

    const link = await LinkCollection.create({
      label,
      url,
      isSocial,
      image,
      id_usuario: id,
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const link = await LinkCollection.findOne().where({ _id: id });
    if (!link) return res.jsonNotFound();

    return res.jsonOK(link);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const link = await LinkCollection.findOne().where({ _id: id });
    if (!link) return res.jsonNotFound();

    await link.deleteOne();

    return res.jsonOK();
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const fields = ["label", "url", "isSocial"];

  const link = await LinkCollection.findOne().where({ _id: id });
  if (!link) return res.jsonNotFound();

  fields.map((field) => {
    const newValue = req.body[field];
    if (newValue) link[field] = newValue;
  });

  await link.save();
  return res.jsonOK(link);
});

module.exports = router;
