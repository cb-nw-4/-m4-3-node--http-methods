"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const { stock, customers } = require("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .post("/order", (req, res) => {
    console.log(req.body);
    const {
      givenName,
      surname,
      email,
      address,
      order,
      size
    } = req.body

    const checkCustomers = customers.find((customer) => {
      return (
        customer.givenName.toLowerCase() === givenName ||
        customer.surname.toLowerCase() === surname ||
        customer.email.toLowerCase() === email ||
        customer.address.toLowerCase() === address
            )
    });
    const checkEmail = req.body.email.includes("@");
    const checkStock = order === "tshirt" ? stock.shirt[size] : stock[order]
    const checkCountry = req.body.country.toLowerCase() === "canada";

    if(checkCustomers){
      res.status(400).json({
        status: "error",
        error: "repeat-customer"
      })
    } else if (!checkEmail){
      res.status(400).json({
        status: "error",
        error: "missing-data"
      })
    } else if (!checkCountry){
      res.status(400).json({
        status: "error",
        error: "undeliverable"
      })
    } else if (checkStock == 0 ) {
      res.status(404).json({
        status: "error",
        error: "unavailable",
      });
    } else {
      res.status(200).json({
        status: "success",
      });
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
  .listen(8000, () => console.log(`Listening on port http://localhost:8000`));
