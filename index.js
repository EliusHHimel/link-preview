const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");

const app = express();
app.use(bodyParser.json());

app.get("/fetch-meta", (req, res) => {
  const url = req.query.url;
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const $ = cheerio.load(data);
      res.send({
        title: $("title").text(),
        description: $('meta[name="description"]').attr("content"),
        image: $('meta[property="og:image"]').attr("content"),
        url: $('meta[property="og:url"]').attr("content"),
      });
    })
    .catch((error) => {
      res.send(error);
    });
});
app.listen(1111, () => {
  console.log("Server is running on port 1111");
});
