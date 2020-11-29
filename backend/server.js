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
  // body: {
  //   order: 'tshirt',
  //   size: 'undefined',
  //   givenName: 'vishal',
  //   surname: 'handa',
  //   email: 'blahblah@blah.meh',
  //   address: '6456 rue dontcomeforme, 666',
  //   province: 'QC',
  //   postcode: 'H4A 2E7',
  //   country: 'Canada',
  //   city: 'Montréal'
  // },
  // ---------------------------------
  // add new endpoints here 👇
  .post("/order",(req, res)=>{
    console.log(req);
    let confirmCustomer=customers.find(customer=>{
      return (
        customer.givenName.concat(customer.surname)===req.body.givenName.concat(req.body.surname)||
        customer.email===req.body.email||
        customer.address===req.body.address
      );
    })
    let item=req.body.order;
    let size=req.body.size;

    let checkStock=()=>{
      if(req.body.order==="tshirt"){
        if(stock.item.size>0){
          return true;
        }
      }
      else if(stock.item>0){
        return true;
      }
      else{
        return;
      }
    };
// -------------------failure-statements---------------//
    if(confirmCustomer){
      res.json({
        status: "error",
        "error": "repeat-customer",
        message: "Customer has already purchased an item",
      });
    }
    else if(!(req.body.email.includes('@'))){
      res.json({
        status: "error",
        "error": "missing-data",
        message: "Email invalid",
      });
    }
    else if(!(req.body.country==="Canada")){
      res.json({
        status: "error",
        "error": "undeliverable",
        message: "Customer didn't supply a Canadian shipping address",
      });
    }
    else if(!checkStock){
      res.json({
        status: "error",
        "error": "unavailable",
        message: "Item out of stock",
      });
    }
    //--------------success-statements----------//
    if(!confirmCustomer){
      res.json({
        status: "success",
      });
    }
    else if(req.body.email.includes('@')){
      res.json({
        status: "success",
      });
    }
    else if((req.body.country==="Canada")){
      res.json({
        status: "success",
      });
    }
    else if(checkStock){
      res.json({
        status: "success",
      });
    }


    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
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
