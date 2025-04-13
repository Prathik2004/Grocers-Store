const mongoose = require('mongoose');

const LoginAccDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
});

module.exports = mongoose.model("LoginAccDetails", LoginAccDetailsSchema);
