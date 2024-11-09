// connection.js
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/GrocersStore'; // Make sure this matches your setup

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;
