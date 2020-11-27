"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { stock, customers } = require("./data/inventory");

const handleFormSubmission = (req, res) => {
  console.log(req.body);
  const country = req.body.country.toLowerCase();
  const givenName = req.body.givenName.toLowerCase();
  const surname = req.body.surname.toLowerCase();
  const email = req.body.email;
  const address = req.body.address;
  const order = req.body.order;
  const size = req.body.size;

  let nameMatch;
  let emailMatch;
  let addressMatch;

  customers.forEach((customer) => {
    if (givenName === customer.givenName.toLowerCase() && surname === customer.surname.toLowerCase()) {
      nameMatch = true;
    }
  })

  customers.forEach((customer) => {
    if (email === customer.email) {
      emailMatch = true;
    }
  })

  customers.forEach((customer) => {
    if (address === customer.address) {
      addressMatch = true;
    }
  })

  if (country !== "canada") {
    res.json({"status": "error", "error": "undeliverable"});
  } 
  else if (nameMatch || emailMatch || addressMatch) {
    res.json({"status": "error", "error": "repeat-customer"});
  } 
  else if (email.length < 5 || (!email.includes("@"))) {
    res.json({"status": "error", "error": "missing-data"});
  } 
  else if ((order === "tshirt" && stock.shirt[size] < 1) || (order === "bottle" && stock.bottle < 1) || (order === "socks" && stock.socks < 1)) {
    res.json({"status": "error", "error": "unavailable"});
  } 
  else {
    res.json({"status": "success"});
  }
}

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

  .post('/order', handleFormSubmission)

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
