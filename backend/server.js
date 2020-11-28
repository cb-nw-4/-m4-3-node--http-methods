"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { stock, customers } = require('./data/inventory')
const bodyParser = require('body-parser');

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

  .post("/order", (req, res) => {

    const body = req.body;
    const givenName = body.givenName;
    const surname = body.surname;
    const country = body.country;
    const email = body.email;
    const address = body.address;

    const orderItem = body.order;
    const orderSize = body.size;

    customers.map((customer) => {
      if (givenName === customer.givenName && surname === customer.surname || email === customer.email || address === customer.address) {
        res.json({"status": "error", "error": "repeat-customer"})
      }
    })

    Object.values(body).map((entry) => {
      if (entry === "" || orderItem === "undefined") {
        res.json({"status": "error", "error": "missing-data"})
      }
    })
    
    if (country.includes("Canada") === false) {
      res.json({"status": "error", "error": "undeliverable"}) 
    }
    
    if (orderSize !== "undefined" && stock.shirt[orderSize] === "0") {
      res.json({"status": "error", "error": "unavailable"})
    }

    if (orderItem === "socks" && stock.socks === "0" || orderItem === "bottle" && stock.bottles === "0") {
      res.json({"status": "error", "error": "unavailable item"})
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      res.json({"status": "error", "error": "missing-data"})
    }

    else {
      res.json({"status": "success"})
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
