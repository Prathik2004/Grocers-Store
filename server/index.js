const express = require('express');
const http = require('http');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('./database/connection');
const LoginAccDetails = require('./models/LoginAccDetails');
const Order = require('./models/Orders');
const Orders = require('./models/Orders');


const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


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

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cart, subtotal, name, address, phone } = req.body;

        if (!cart || !subtotal || !name || !address || !phone) {
            return res.status(400).json({ error: "Missing order details" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cart.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: { name: item.name },
                    unit_amount: item.price * 100, // Stripe expects amount in paise
                },
                quantity: item.kg || 1,  
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ sessionId: session.id });

    } catch (error) {
        console.error("Error in checkout session:", error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        // Work with universal model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(message);
        const reply = result.response.text();

        res.json({ reply });

    } catch (error) {
        console.error("Gemini Chatbot Error:", error);
        res.status(500).json({ error: "Chatbot failed to respond" });
    }
});

// Place an order after successful payment
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

const myServer = http.createServer(app);
myServer.listen(8000, () => {
    console.log("Server running on port 8000");
});
