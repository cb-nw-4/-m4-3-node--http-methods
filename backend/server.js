"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { stock, customers } = require("./data/inventory");

const app = express();
// Below are methods that are included in express(). We chain them for convenience.
// --------------------------------------------------------------------------------

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny")).use(express.json());

// Any requests for static files will go into the public folder
app.use(express.static("public"));

app.use(bodyParser.json());
// Nothing to modify above this line
// ---------------------------------
// add new endpoints here 👇
app.post("/order", (req, res) => {
    console.log(req.body);
    const firstName = req.body.givenName;
    const lastName = req.body.surname;
    const email = req.body.email;
    const streetAddress = req.body.address;
    const country = req.body.country;
    const bottle = stock.bottle;
    const socks = stock.socks;

    const customerFoundName = customers.find((customer) => {
        console.log(customer.givenName, firstName);
        return customer.givenName === firstName;
    });
    const customerFoundLName = customers.find((customer) => {
        console.log(customer.surname, lastName);
        return customer.surname === lastName;
    });
    const customerFoundEmail = customers.find((customer) => {
        console.log(customer.email, email);
        return customer.email === email;
    });
    const customerFoundAddress = customers.find((customer) => {
        return customer.address === streetAddress;
    });

    // const inStockShS = stock.find((shirts) => {
    //     return stock.shirts === req.body.shirt.small;
    // });

    if (
        (customerFoundName && customerFoundLName) ||
        customerFoundEmail ||
        customerFoundAddress
    ) {
        res.status(400).json({
            status: "error",
            error: "repeat-customer",
        });
    } else if (!email.includes("@")) {
        res.status(400).json({
            status: "error",
            error: "missing-data",
        });
    } else if (country !== "Canada" && country !== "Canada".toLowerCase()) {
        res.status(400).json({
            status: "error",
            error: "undeliverable",
        });
    } else if (bottle === "0") {
        res.status(400).json({
            status: "error",
            error: "unavailable",
        });
    } else if (socks === "0") {
        res.status(400).json({
            status: "error",
            error: "unavailable",
        });
    } else if (stock.shirt.small === "0" && req.body.size === "small") {
        res.status(400).json({
            status: "error",
            error: "unavailable",
        });
    } else if (stock.shirt.medium === "0" && req.body.size === "medium") {
        res.status(400).json({
            status: "error",
            error: "unavailable",
        });
    } else if (stock.shirt.large === "0" && req.body.size === "large") {
        res.status(400).json({
            status: "error",
            error: "unavailable",
        });
    } else if (stock.shirt.xlarge === "0" && req.body.size === "extralarge") {
        res.status(400).json({
            status: "error",
            error: "unavailable",
        });
    } else {
        res.status(200).json({
            status: "success",
        });
    }
});

// app.get("/inventoryStock", (req, res) => {
//     res.json({ data: stock });
// });

// app.get("/inventoryCustomers", (req, res) => {
//     res.json({ data: customers });
// });

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