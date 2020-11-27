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
  .post('/order', (req, res) =>{
    console.log(req.body);
    const repeatCustomer = customers.find((customer)=>(
      (req.body.givenName.toLowerCase() === customer.givenName.toLowerCase() &&
      req.body.surname.toLowerCase() === customer.surname.toLowerCase()) ||
      req.body.email.toLowerCase() === customer.email.toLowerCase() ||
      req.body.address.toLowerCase() === customer.address.toLowerCase()));
    
    const order = req.body.order === "tshirt" ? "shirt" : req.body.order;
    let isCompletedData = /(.+)@(.+){2,}\.(.+){2,}/.test(req.body.email);    
    if (order === "shirt" && (req.body.size === undefined || req.body.size === "undefined"))
      isCompletedData = false;      
     
    const isDeliverable = req.body.country.toLowerCase() === "canada";

    let isAvailable = stock[order] !== "0";
    if (order === "shirt" && stock.shirt[req.body.size] === "0")
      isAvailable= false;

    if (repeatCustomer){
      res.status(404).json({
        status: "error",
        error: 'repeat-customer',
      });  
    }
    else if(!isCompletedData) {
      res.status(404).json({
        status: "error",
        error: 'missing-data',
      });  
    }
    else if(!isDeliverable) {
      res.status(404).json({
        status: "error",
        error: 'undeliverable',
      });  
    }
    else if(!isAvailable) {
      res.status(404).json({
        status: "error",
        error: 'unavailable',
      });  
    }
    else {
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
  .listen(8000, () => console.log(`Listening on port 8000`));
