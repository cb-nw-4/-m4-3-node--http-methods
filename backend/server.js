"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { stock, customers } = require("./data/inventory");

const validate = (req, res) => {
  const givenName = req.body.givenName;
  const surname = req.body.surname;
  const email = req.body.email;
  const address = req.body.address;
  const country = req.body.country;
  const order = req.body.order;
  let size = req.body.size;

  let validateEmail = /^[^@]+@\w+(\.\w+)+\w$/.test(email);
  
  const customer = customers.find((customer) => customer.givenName === givenName && customer.surname === surname || customer.email === email || customer.address === address);
  console.log(req.body);

  if(size==="extralarge"){
    size="xlarge";
  }

  let inStock = false;
  if(order != "tshirt"){
    if(stock[order] >= 1) {
    inStock = true;
    }
  } else if(order === "tshirt" && size !="undefined"){
    if(stock.shirt[size] >= 1){
      inStock = true;
    }
  } 
  
  if(!validateEmail){
    res.json({status: "error", error: "fix email"});
  } else if(customer){
    res.json({status: "error", error: "repeat-customer"});
  } else if(country != "Canada"){
    res.json({status: "error", error: "undeliverable"});
  } else if(order === "tshirt" && size === "undefined"){
    res.json({status: "error", error: "missing-data"});
  } else if (!inStock){
    res.json({status: "error", error: "unavailable"});
  } else {
    res.json({ status: "success"});
  }

//res.json({msg})
//res.json("okay")
};

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
    
  .post('/order', validate)

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
