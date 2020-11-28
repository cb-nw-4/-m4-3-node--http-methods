"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { customers, stock } = require("./data/inventory.js"); 

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
  .post ('/order', (req, res) => {
    // deconstruct req.body to access properties
    const {
      order,
      size,
      givenName, 
      surname,
      email, 
      address,
      city,
      province,
      country
    } = req.body
    // check if customer's name, email, or address already exists
    const customerFound = customers.find((customer) => {
      return customer.givenName === givenName || customer.email === email || customer.address === address;
    });
    // check if email is valid
    let emailValid = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    }

    // check if any form data is missing
    let dataIsAvailable = () => {
      return surname && givenName && email && address && province && country
    };

    // check if item is in stock
    let stockIsAvailable = () => {
      return stock[order] && (stock[order] != 0 || stock[order][size] != 0);
    }

    if(customerFound){
      res.status(400).send({
        status: "error",
        error:  "repeat-customer"
      })
    // check if country selected is Canada or if any information is missing
    } else if (country.toLowerCase() !== 'canada'){
      res.status(400).send({
        status: "error",
        error: "undeliverable"
      })
    } else if (!emailValid(email)){
      res.status(400).send({
        status: "error",
        error: "email is not valid"
      })
    } else if (!dataIsAvailable()) {
      res.status(400).send({
        status: "error",
        error: "missing-data"
      })
    } else if (!stockIsAvailable()) {
      res.status(400).send({
        status: "error",
        error: "unavailable"
      })
    } else{
      res.status(200).send({
        status: "success",
      })
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
