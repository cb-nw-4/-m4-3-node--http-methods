# [4-3]

# GET method

---

- `GET` requests are meant to _fetch_ data from the server.
- `GET` requests are requests for data.
- The service initiating the request is usually a browser, or some sort of frontend that needs data.

It is supposed to be _read-only_. We shouldn't send data to a `.get()` endpoint.

---

## Wait a minute! What about...

```
http://www.my-site.com/user-signin?firstName=Homer&password=doh_DOH
```

We did use `GET` to send data along with `query` parameters.

**Use of query parameters, should be limited to actual queries.**

A good example of this is a search bar. That is a query. We are still `get`ting data, but it is based on a specific query.

---

`GET` requests are not secure, in the sense that any data sent with the request is

- visible all along its merry way to the server
- cached in browser history.

_In the context of Node, the `get` is our server answering a simple request for information._

---

What do we do if we want to send data to the server?
