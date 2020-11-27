"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const { stock, customers } = require('./data/inventory');

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
    const { order,
            size,
            givenName,
            surname,
            email,
            address,
            province,
            postcode,
            country,
            city } = req.body;
    let error = false;
    let errorMsg = '';
  
    // Check if customer has ordered before
    if (!error) {
      customers.forEach(customer => {
        if ((customer.givenName.toLowerCase() === givenName.toLowerCase() && customer.surname.toLowerCase() === surname.toLowerCase()) ||
          customer.email.toLowerCase() === email.toLowerCase() ||
          customer.address.toLowerCase() === address.toLowerCase()) {
          error = true;
          errorMsg = 'repeat-customer';
        }
      })
    }
  
    // Check for blank required fields
    if (!error && (givenName.length === 0 ||
      surname.length === 0 ||
      email.length === 0 ||
      address.length === 0 ||
      province.length === 0 ||
      postcode.length === 0 ||
      country.length === 0 ||
      city.length === 0)) {
      error = true;
      errorMsg = 'missing-data';
    }
  
    // Check for valid email format (simple regex stolen from the Internet)
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!error && !regExp.test(email)) {
      error = true;
      errorMsg = 'missing-data';
    }
  
    // Check for Canada only
    if (!error && country.toLowerCase() !== 'canada') {
      error = true;
      errorMsg = 'undeliverable';
    }

    // Check for stock
    if (!error) {
      if (size === 'undefined' && stock[order] < 1) {
        error = true;
        errorMsg = 'unavailable';
      }

      if (size !== 'undefined' && stock[order][size] < 1) {
        error = true;
        errorMsg = 'unavailable';
      }
    }
  
    if (!error) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'error', error: errorMsg});
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
