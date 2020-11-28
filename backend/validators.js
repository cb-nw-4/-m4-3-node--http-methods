const e = require("express");
const inventory = require("./data/inventory");

const validateCustomers = (req, res) => {
  // All of the data sent via a POST request is available in req.body
  let uniqueNameEmailAddress = checkNameEmailAddress(req);
  let validEmailAddress = checkEmail(req);
  let validAddress = checkCanada(req);
  let validStock = checkStock(req);

  if (uniqueNameEmailAddress.includes(false)) {
    res.status(200).json({
      status: "error",
      error: "repeat-customer",
      uniqueNameEmailAddress,
    });
  } else if (validEmailAddress === false) {
    res.status(200).json({
      status: "error",
      error: "repeat-customer",
    });
  } else if (validAddress === false) {
    res.status(200).json({
      status: "error",
      error: "undeliverable",
    });
  } else if (validStock === false) {
    res.status(200).json({
      status: "error",
      error: "unavailable",
    });
  } else {
    res.status(200).json({
      status: "success",
      uniqueNameEmailAddress,
    });
  }
};

checkNameEmailAddress = (req) => {
  let unique = [];
  inventory.customers.forEach((customer, i) => {
    if (
      customer.givenName.toLowerCase() === req.body.givenName.toLowerCase() &&
      customer.surname.toLowerCase() === req.body.surname.toLowerCase()
    )
      unique[i] = false;
    else if (customer.email.toLowerCase() === req.body.email.toLowerCase())
      unique[i] = false;
    else if (customer.address.toLowerCase() === req.body.address.toLowerCase())
      unique[i] = false;
    else unique[i] = true;
  });
  return unique;
};

checkEmail = (req) => {
  if (req.body.email.includes("@")) return true;
  else return false;
};

checkCanada = (req) => {
  if (req.body.country.toLowerCase() === "canada") return true;
  else return false;
};

checkStock = (req) => {
  if (req.body.order === "bottle" && inventory.stock.bottle > 0) return true;
  else if (req.body.order === "socks" && inventory.stock.socks > 0) return true;
  else if (
    req.body.order === "tshirt" &&
    inventory.stock.shirt[req.body.size] > 0
  )
    return true;
  else return false;
};

module.exports = {
  validateCustomers,
};
