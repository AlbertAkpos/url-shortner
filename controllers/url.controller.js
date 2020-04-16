const Url = require("../models/url.model");

//base url
const baseUrl = process.env.baseUrl || "http://localhost:3000";

const createShortLink = async (req, res) => {
  //get the originalUrl, unique_name for request body

  const { originalUrl, unique_name } = req.body;

  try {
    const nameExists = await Url.findOne({ unique_name });
    if (nameExists) {
      return res.status(403).json({
        error: "Unique name already exist, choose another",
        ok: false,
      });
    } else {
      const shortUrl = baseUrl + "/" + unique_name;
      const url = new Url({
        originalUrl,
        shortUrl,
        unique_name,
      });

      //save to db
      const saved = url.save().then((url) => console.log("url saved"));

      return res.json({
        message: "success",
        ok: true,
        shortUrl,
      });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};

const openShortLink = async (req, res) => {
  const { unique_name } = req.params;
  try {
    const url = await Url.findOne({ unique_name });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createShortLink, openShortLink };
