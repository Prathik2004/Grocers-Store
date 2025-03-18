// index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('./database/connection'); 
const LoginAccDetails = require('./models/LoginAccDetails');
const Order = require('./models/Orders');
const Stripe = require('stripe');
const app = express();
app.use(express.json());
app.use(cors());
const stripe = new Stripe(sk_test_51R3wwRKxWJHlkcPMHuK5pKvan6AL2qPwM1IKvhQSR3SYsPAjRChP2yPMD7YlB7H0aeDlv6pWKYkC2530XXg0uIYB00b3MilnbQ);

// Register user
app.post('/register', async (req, res) => {
    console.log("Received registration data:", req.body); 
    try {
        const user = await LoginAccDetails.create(req.body);
        console.log("User saved:", user); 
        res.status(201).json(user);
    } catch (err) {
        console.error("Error saving user:", err); 
        res.status(400).json({ error: err.message });
    }
});


// Login user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await LoginAccDetails.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/orders', async (req, res) => {
    try {
      const { name, address, phone, cart, subtotal } = req.body;
      const newOrder = new Order({ name, address, phone, cart, subtotal });
  
      await newOrder.save();
      res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to place order" });
    }
  });

  app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Test Product" },
                        unit_amount: 5000, // $50.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:8000/success",
            cancel_url: "http://localhost:8000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const myServer = http.createServer(app);
myServer.listen(8000, () => {
    console.log("Server running on port 8000");
});
