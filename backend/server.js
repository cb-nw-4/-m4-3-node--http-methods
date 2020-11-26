"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

//Data
const { customers } = require('./data/inventory');
// console.log(customers);
const { stock } = require('./data/inventory');
// console.log(stock);

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
  .post('/testing', (req, res) => {
    const INCOMING_ACCOUNT = req.body;
    //Check if the givenName is already used
    let sameData = false;
    customers.forEach((account) => {
      if(
          account.givenName.toLowerCase() === INCOMING_ACCOUNT.givenName.toLowerCase() ||
          account.email.toLowerCase() === INCOMING_ACCOUNT.email.toLowerCase() ||
          account.address.toLowerCase().split(' ').join('') === INCOMING_ACCOUNT.address.toLowerCase().split(' ').join('')
          ) {
          sameData = true;
      }
    });
    //If sameData = false, push the INCOMING_ACCOUNT
    if(sameData === false) {
      customers.push(INCOMING_ACCOUNT);
    }
    // console.log(sameData, 'test');

    //Send to the ...
    res.status(200).send({ customers: customers })
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
