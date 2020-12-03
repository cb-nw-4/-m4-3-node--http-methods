"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-Parser");

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
  .post("/order", (req, res) => {
    const newCustomer = customers.find((e) => {
      return (e.givenName === req.body.givenName && e.surname === req.body.surname) || (e.email === req.body.email) || (e.address === req.body.address);
    });

    const order = req.body.order;
    const size = req.body.size;
    let stockStatus = false;
    if (order === "tshirt" && stock.shirt[size] > 0) {
      stockStatus = true;
    } else if (stock[order] > 0) {
      stockStatus = true;
    }
    
    if (newCustomer) {
      return res.status(200).json({ status: "error", error: "repeatCustomer" });
    } else if (req.body.email.indexOf('@') === -1) {

      return res.status(200).json({ status: "error", error: "missingData" });
    } else if (req.body.country.toLowerCase() !== 'canada') {

      return res.status(200).json({ status: "error", error: "undeliverable" });
    } else if (!stockStatus) {

      return res.status(200).json({ status: "error", error: "unavailable" });
    } else {
      return res.status(200).json({ status: "success" });
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
