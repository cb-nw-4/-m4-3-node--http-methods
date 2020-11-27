"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
var bodyParser = require('body-parser');
var {customers, stock} = require("./data/inventory");
const e = require("express");

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
  .post('/order', (req, res)=>{


    let isCustomerGivenName = req.body.givenName;
    let isCustomerSurname = req.body.surname;
    let isCustomerEmail = req.body.email;
    let isCustomerStreetNumber = req.body.address.split(' ')[0];
    let isCustomerStreetName= req.body.address.slice(isCustomerStreetNumber.length);


    let isCustomer = customers.filter(customer => (
      (customer.givenName == isCustomerGivenName && customer.surname ==isCustomerSurname) ||
      (customer.email == isCustomerEmail)||
      ((customer.address.split(' ')[0] == isCustomerStreetNumber) && 
          (customer.address.slice(customer.address.split(' ')[0].length) == isCustomerStreetName))
    ))

    


    const validateEmail = (email)  => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
  }

  let isValidEmail = validateEmail(req.body.email)

  let isDeliverable = (req.body.country.toLowerCase() === 'canada');



  //console.log("stock", stock)

  const itemInStock = (item, size) =>{
    if(item == 'tshirt'){
      return (stock.shirt[size] > 0)
    } else {
      return (stock[item] > 0)
    }
  }

  let isItemInStock = itemInStock(req.body.order, req.body.size);


    if(isCustomer.length != 0){
      res.status(404).json({
        "status": "error",
        "error": "repeat-customer"
      })
    } else if(!isValidEmail){
      res.status(404).json({
        "status": "error",
        "error": "missing-data"
      })
    } else if(!isDeliverable){
      res.status(404).json({
        "status": "error",
        "error": "undeliverable"
      })
    }else if(!isItemInStock){
      res.status(404).json({
        "status": "error",
        "error": "unavailable"
      })
    }
    else{
      res.status(200).json({
        "status": "success"
      })
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
