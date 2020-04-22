# Movie-Search-App

Simple movie search application using react.js, redux and node.js

## Setup Environment Locally

To run this project, install it locally using npm:

```
$ npm install
$ cd frontend
$ npm install
$ cd ../backend
$ npm install
$ cd ..
$ npm run dev
```

## High-Level Solution

- Solution: If the user is typing, don't make any API calls until they stop typing for 300ms

```javascript
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
      if (cache.get(search)) {
        // if input text is same as any key in cache memory
        res.send(cache.get(search)); // request the data in cache memory
      } else {
        res.send(response);
      }
      cache.put(search, response, 30000); // cache memory value within 30s is saved
    });
});
```

## Cache API

### put = function(key, value, time, timeoutCallback)

- Simply stores a value
- If time isn't passed in, it is stored forever
- Will actually remove the value in the specified time in ms (via `setTimeout`)
- timeoutCallback is optional function fired after entry has expired with key and value passed (`function(key, value) {}`)
- Returns the cached value

### get = function(key)

- Retrieves a value for a given key
- If value isn't cached, returns `null`

## Conclusion

- The time you spent on the case study
  I started at 2pm on Tuesday and finished 6:10pm. Totally I spent around 4 hours on the case study.
- What would you change in your submission to make it production ready?

- What would you do differently if you had more time?
  I will make UI more effectively without any UI framework and will integrate authentication.
  If possible, I will make model to see individual Movie details.
