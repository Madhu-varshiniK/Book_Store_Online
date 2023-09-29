const express = require("express");
const stripe = require('stripe')('sk_test_51NsHM7SCGefnowhAvJsHno517yH6lHcKh9BIYxrLdY2fpcTxAdrEGKaILxzDhTpfb2qSsHLGUDN5c6eQziWr0NuV00A9Lq6ZQe');
const router = express.Router();
const Book = require("../model/Book");

// Define a POST route for Stripe payments
router.post("/", async (req, res) => {
  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name
            },
            unit_amount: item.price * 100, // Convert price to cents
          },
          quantity: "1"
        }
      }),
      success_url: 'http://localhost:3000/success', 
      cancel_url: 'http://localhost:3000/cancel', 
    });

    // Respond with the Stripe Checkout session URL
    res.json({ url: session.url });
  } catch (error) {
    // Handle any errors that occur during the payment process
    console.error("Error processing payment:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Export the router for use in your application
module.exports = router;
