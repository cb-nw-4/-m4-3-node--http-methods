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

  .post("/order", (req, res) => {
    const body = req.body;

    let customerExists = customers.find((el) => {
      return (
        el.givenName === body.givenName ||
        el.surname === body.surname ||
        el.email === body.email ||
        el.address === body.address
      );
    });

    let emailValidated = body.email.includes("@");

    let countryValidated = body.country.includes("Canada");

    let checkStock = stock.shirt.filter(el => )

    if (customerExists) {
      res.json({
        status: "error",
        error: "repeat-customer",
      });
    } else if (!emailValidated) {
      res.json({
        status: "error",
        error: "missing-data",
      });
    } else if (!countryValidated) {
      res.json({
        status: "error",
        error: "undeliverable",
      });
    } else if (!customerExists) {
      res.json({
        status: "success",
      });
    } else if (emailValidated) {
      res.json({
        status: "success",
      });
    } else if (countryValidated) {
      res.json({
        status: "success",
      });
    }
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
