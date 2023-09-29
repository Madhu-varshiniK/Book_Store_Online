const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const payment = require("./routes/payment-routes")
const users = require("./routes/user-routes");

const cors = require("cors");
const stripe = require('stripe')('sk_test_51NsHM7SCGefnowhAvJsHno517yH6lHcKh9BIYxrLdY2fpcTxAdrEGKaILxzDhTpfb2qSsHLGUDN5c6eQziWr0NuV00A9Lq6ZQe');

const app = express();

app.use(express.json());
app.use(cors());
app.use("/books",router) //localhost:5000/books
app.use("/users", users) //localhost:5000/users
app.use("/checkout",payment) //localhost:5000/checkout

mongoose.connect(
    "mongodb+srv://admin:tkJCg07ohOXFzRhX@cluster0.xvkycsb.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to DB"))
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => console.log(err))

