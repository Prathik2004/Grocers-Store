// index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('./database/connection'); // Ensure this connects to MongoDB
const LoginAccDetails = require('./models/LoginAccDetails');

const app = express();
app.use(express.json());
app.use(cors());

// Register user
app.post('/register', async (req, res) => {
    console.log("Received registration data:", req.body); // Log the incoming data
    try {
        const user = await LoginAccDetails.create(req.body);
        console.log("User saved:", user); // Log the saved user
        res.status(201).json(user);
    } catch (err) {
        console.error("Error saving user:", err); // Log the error
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

const myServer = http.createServer(app);
myServer.listen(8000, () => {
    console.log("Server running on port 8000");
});