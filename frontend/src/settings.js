export const itemOptions = [
  { value: "undefined", label: "Pick an item" },
  { value: "tshirt", label: "T-shirt" },
  { value: "socks", label: "Socks" },
  { value: "bottle", label: "Bottle" },
];

export const sizeOptions = [
  { value: "undefined", label: "Select" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "extralarge", label: "Extra-large" },
];

export const imgFiles = {
  undefined: "question.jpg",
  tshirt: "tshirt.png",
  socks: "socks.jpg",
  bottle: "bottle.png",
};

export const initialState = {
  order: "undefined",
  size: "undefined",
  givenName: "",
  surname: "",
  email: "",
  address: "",
  province: "",
  postcode: "",
  country: "",
};

export const errorMessages = {
  unavailable: "Item out of stock. :(",
  "repeat-customer":
    "Existing user. Not allowed to place another order at the moment.",
  undeliverable: "Outside of delivery zone. :(",
  "missing-data": "Oops! Looks like we're missing some information.",
};
