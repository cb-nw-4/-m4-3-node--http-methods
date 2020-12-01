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

  .post("/order", (req,res)=>{

    let errorID = "none";

    customers.forEach((customer)=>{
      if(customer.surname.toLowerCase()==req.body.surname.toLowerCase() 
      && customer.givenName.toLowerCase()==req.body.givenName.toLowerCase()){
        errorID = "repeat-customer";
      }
    })

    customers.forEach((customer)=>{
      if(customer.email == req.body.email){
        errorID = "repeat-customer";
      }
    });

    customers.forEach((customer)=>{
      if(customer.address==req.body.address){
        errorID = "repeat-customer";
      }
    });

    if(req.body.country.toLowerCase() != "canada"){
      errorID="undeliverable";
    }

    if(!req.body.email.includes('@')){
      errorID="missing-data";
    }

    if(req.body.order.toLowerCase() == "shirt"){
      if(stock.shirt[req.body.size] == 0){
        errorID = "unavailable";
      }
    }else if(stock[req.body.order] == 0){
      errorID = "unavailable";
    }

    if(errorID == "none"){
      res.status(200).json({
        "status": "success",
      });
    }else{
      res.status(404).json({
        "status": "error",
        "error": errorID
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
