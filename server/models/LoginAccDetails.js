// models/LoginAccDetails.js
const mongoose = require('mongoose');

const LoginAccDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true }, // Ensure this is a Number
    email: { type: String, required: true, unique: true }, // Ensure unique constraint
    password: { type: String, required: true }
});

module.exports = mongoose.model("LoginAccDetails", LoginAccDetailsSchema);
