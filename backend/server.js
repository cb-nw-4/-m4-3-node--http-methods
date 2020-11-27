"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { stock, customers } = require("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .post('/order', (req, res) => {
    console.log(req.body);
    const country = req.body.country;
    const givenName = req.body.givenName;
    const surname = req.body.surname;
    const email = req.body.email;
    const address = req.body.address;
    const order = req.body.order;
    const size = req.body.size;

    if (country !== "Canada") {
      res.json({"status": "error", "error": "undeliverable"});
    } else if ((givenName === customers.givenName && surname === customers.surname) || email === customers.email || address === customers.address) {
      res.json({"status": "error", "error": "repeat-customer"});
    } else if (email.length < 5 || (!email.includes("@"))) {
      res.json({"status": "error", "error": "missing-data"});
    } else if (order === "tshirt" && size === "medium") {
      res.json({"status": "error", "error": "unavailable"});
    } else {
      res.json({"status": "success"});
    }

  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
