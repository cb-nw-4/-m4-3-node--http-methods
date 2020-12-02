"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const { stock, customers } = require('./data/inventory.js');
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
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })
  .post("/order",(req, res)=>{
    console.log(req);
    let confirmCustomer=customers.find(customer=>{
      return (
        customer.givenName.concat(customer.surname)===req.body.givenName.concat(req.body.surname)||
        customer.email===req.body.email||
        customer.address===req.body.address
      );
    });
    let item=req.body.order;
    let size=req.body.size;

    let checkStock=()=>{
      if(item==="tshirt" && parseInt(stock[item][size])>0){
        return true;
      }
      else if(parseInt(stock[item])>0){
        return true;
      }
      else{
        return false;
      }
    };
    let finalStatus='success';
    let finalError='';
// -------------failure-statements------------//
    if(confirmCustomer){
      finalStatus="error";
      finalError="repeat-customer";
    }
    else if(!(req.body.email.includes('@'))){
      finalStatus="error";
      finalError="missing-data";
    }
    else if(!(req.body.country==="Canada")){
      finalStatus="error";
      finalError="undeliverable";
    }
    else if(!checkStock()){
      finalStatus="error";
      finalError="unavailable";
    }
    //--------------success-statement----------//
    else{
      finalStatus="success";
      finalError="none";
    }
    console.log(finalError, finalStatus);
    res.json({
      status:finalStatus,
      error:finalError
    });
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.


  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
