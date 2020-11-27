"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { stock, customers } = require('./data/inventory');

const app = express();

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  app.use(morgan("tiny"));
  app.use(bodyParser.json());

  // Any requests for static files will go into the public folder
  app.use(express.static("public"));

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  const handleOrderForm = (req, res) => {
    const validateNewCustomer = customers.find((customer) => {
      return (customer.givenName === req.body.givenName && customer.surname === req.body.surname)
      || (customer.email === req.body.email) 
      || (customer.address === req.body.address);
    });
    
    let enoughStock;
    const orderItem = req.body.order;
    const orderSize = req.body.size;
    const validateStock = () => {
      if (orderItem === 'socks' || orderItem === 'bottle') {
        if (Number(stock[orderItem]) > 0) {
          enoughStock = true;
        }
      }
      if (orderItem === 'tshirt') {
        if (orderSize === 'small') {
          if (Number(stock.shirt.small) > 0) {
            enoughStock = true;
          }
        }
        else if (orderSize === 'medium') {
          if (Number(stock.shirt.medium) > 0) {
            enoughStock = true;
          }
        }
        else if (orderSize === 'large') {
          if (Number(stock.shirt.large) > 0) {
            enoughStock = true;
          }
        }
        else if (orderSize === 'extralarge') {
          if (Number(stock.shirt.xlarge) > 0) {
            enoughStock = true;
          }
        }
      }
    }

    validateStock();
    
    if ((!validateNewCustomer) && (req.body.email.indexOf('@') !== -1) && (req.body.country === 'Canada') && (enoughStock === true)) {
      res.json({ 'status': 'success' });
    }
    else if (validateNewCustomer) {
      res.json({ 'status': 'error', 'error': 'repeat-customer' });
    }
    else if (req.body.country !== 'Canada') {
      res.json({ 'status': 'error', 'error': 'undeliverable' });
    }
    else if (orderItem === 'tshirt' && orderSize === 'undefined') {
      res.json({ 'status': 'error', 'error': 'missing-data' });
    }
    else if (enoughStock !== true) {
      res.json({ 'status': 'error', 'error': 'unavailable' });
    }
  }

  app.post('/order', handleOrderForm );

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  app.get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  });

  // Node spins up our server and sets it to listen on port 8000.
  app.listen(8000, () => console.log(`Listening on port 8000`));
