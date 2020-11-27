"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { stock, customers } = require("./data/inventory");
const bodyParser = require("body-parser");

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

  .post("/order", (req, res) => {
    console.log(req.body);
    const data = req.body;
    const orderedSize = data.size;
    const stockSize = stock.shirt;

    if (orderedSize !== "undefined" && stockSize[orderedSize] <= 0) {
      res.status(200).json({ status: "error", error: "unavailable" });
    }

    customers.filter((customer) => {
      if (
        (customer.givenName === data.givenName &&
          customer.surname === data.surname &&
          customer.email === data.email) ||
        customer.address === data.address
      ) {
        return res
          .status(200)
          .json({ status: "error", error: "repeatCustomer" });
      }
    });

    if ((data.email.indexOf("@") === -1) || (data.email.indexOf(".") === -1)) {
      res.status(200).json({ status: "error", error: "missingData" });
    }
    if (data.country !== "Canada") {
      res.status(200).json({ status: "error", error: "undeliverable" });
    }

    res.status(200).json({ status: "success" });
  })

  // })
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
