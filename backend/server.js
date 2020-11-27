"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

//Data
  const { customers, stock } = require('./data/inventory');
  // console.log(customers);
  // const { stock } = require('./data/inventory');
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
  .post('/order', (req, res) => {
    const INCOMING_ACCOUNT = req.body;
    console.log(req.body);

    let isAnEmail = false;
    let sameData = false;
    let shipTo = false;

    //Check if the email is an email AND if the country is Canada
    if(INCOMING_ACCOUNT.email.includes('@')){
      isAnEmail = true;
    }  
    if (INCOMING_ACCOUNT.country.toLowerCase() === 'canada') {
      shipTo = true;
    }
    //Check if the givenName is already used
    customers.forEach((account) => {
      if(
          account.givenName.toLowerCase() === INCOMING_ACCOUNT.givenName.toLowerCase() ||
          account.email.toLowerCase() === INCOMING_ACCOUNT.email.toLowerCase() ||
          account.address.toLowerCase().split(' ').join('') === INCOMING_ACCOUNT.address.toLowerCase().split(' ').join('') //||
          // account.postcode.toLocaleLowerCase().split(' ').join('') === INCOMING_ACCOUNT.postalcode.toLocaleLowerCase().split(' ').join('') //Getting an error after the second try with another postal code
          ) {
          sameData = true;
      }
    });

    //If sameData = false, push the INCOMING_ACCOUNT
    if(isAnEmail === true && shipTo === true && sameData === false) {
      customers.push(INCOMING_ACCOUNT);
    }

    //Check if the item is in stock or not
    let isInStock = false;
    const ITEM_NAME = INCOMING_ACCOUNT.order;
    const SHIRT_SIZE = INCOMING_ACCOUNT.size;
    // console.log(ITEM_NAME, '1');
    // console.log(stock.bottle, '2');
    // console.log(stock[ITEM_NAME], '3');
    // console.log(stock[ITEM_NAME][SHIRT_SIZE]);

    if(ITEM_NAME === 'shirt' && parseInt(stock[ITEM_NAME][SHIRT_SIZE]) > 0){
      isInStock = true;
    } else if(parseInt(stock[ITEM_NAME]) > 0){ // is the number a string? Do I have to turn it into a num?
      isInStock = true;
    };
    // console.log(isInStock, 'inStock' );

    //Testing to send an error
    let currentStatus = 200;
    let errorId;
      //Test if we have an empty value
        let objectValues = Object.values(INCOMING_ACCOUNT);
        let isValueEmpty = false;
        // console.log(objectValues, 'values');
        objectValues.forEach((object) => {
          if(object === '') {
            isValueEmpty = true;
          }
        })
        // console.log(isValueEmpty, 'check')

    if(isValueEmpty === true){
      currentStatus = "error";
      errorId = "missing-data";
    } else if(isAnEmail === false){
      currentStatus = "error";
      errorId = "Not an email";
    } else if (shipTo === false) {
      currentStatus = "error";
      errorId = "undeliverable";
    } else if (isInStock === false) {
      currentStatus = "error";
      errorId = "unavailable";
    } else if (sameData === true) {
      currentStatus = "error";
      errorId = "repeat-customer";
    }  else {
      currentStatus = "success";
    }
    //Send to the endpoint
    res.status(200).send({ status: currentStatus, error: errorId })
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
