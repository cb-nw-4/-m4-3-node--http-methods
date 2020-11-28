"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')

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

  .post("/order", (req,res) => { 
    const incomingOrder = req.body; 
    customers.forEach((element)=> {
      if(element.givenName===incomingOrder.givenName && 
        element.surname===incomingOrder.surname || 
        element.email===incomingOrder.email || 
        element.address===incomingOrder.address
        ) {
        res.json({
          "status":"error",
          "error": "repeat-customer"
        });
      };
    }); 
    let email = incomingOrder.email;
    if(email.includes("@")===false ) { 
      res.json({
        "status":"error",
        "error":"missing-data"
      });
    };
    if(incomingOrder.country.toLowerCase()!=="canada") {
      res.json({
        "status":"error",
        "error":"undeliverable"
      });
    }; 
    if(incomingOrder.order==="tshirt" && incomingOrder.size==="undefined"){
      res.json({
        "status":"error",
        "error":"missing-data"
      });
    };

    if (incomingOrder.order==="tshirt" ) { 
      let shirtStock = parseInt(stock["shirt"][incomingOrder.size]);
      if(shirtStock===0) {
        res.json({
          "status":"error",
          "error":"unavailable"
        });
      }; 
    }; 

    let stockOfOrder = stock[incomingOrder["order"]]; 
    if(parseInt(stockOfOrder)===0) {
      res.json({
        "status":"error",
        "error":"unavailable"
      });
    }; 
    
    // customers.push(incomingOrder); 
    res.json({"status": "success"});
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
