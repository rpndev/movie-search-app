const fetch = require("node-fetch");
const express = require("express");
var cache = require("memory-cache");

const router = express.Router();
router.route("/").get((req, res) => {
  const apikey = req.query["apikey"];
  const search = req.query["keyword"];
  const page = req.query["page"];

  fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${search}&page=${page}`)
    .then((response) => response.json())
    .then((response) => {
      const searchJson = response;
      if (cache.get(search)) {
        res.send(cache.get(search));
      } else {
        res.send(searchJson);
      }
      cache.put(search, searchJson, 30000);
    });
});

module.exports = router;
