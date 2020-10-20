# POST Method

---

A `POST` request is used when we want to send data to a server.

```js
// Examples
// - submitting a form to a server
// - creating a new user in a database
// - adding an item to inventory
```

---

- `POST` submits data as part of the request object. It is located in the `body` of the `req`est object.

```js
{
  ...
  body: { name: 'Rick' },
  params: {},
  query: {},
  ...
}
```

---

```js
// Example
app.post("/data-form", (req, res) => {
  // All of the data sent via a POST request is available in req.body
  console.log(req.body);

  res.send("ok");
});
```

---

On the frontend things are a little more complex.

```js
// GET request
fetch("/order-info");

// POST request
fetch("/order", {
  method: "POST",
  body: JSON.stringify({ name: "Rick" }),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
```
