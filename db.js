// Import Mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL ; // Replace 'ecommerce' with your database name
const mongoURL = process.env.MONGODB_URL;
// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the unified topology engine
  })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Get the default connection
const db = mongoose.connection;

// Event listeners for the connection
db.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Export the connection object (optional, if used elsewhere)
module.exports = db;
