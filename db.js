// Import Mongoose
const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; // Replace 'ecommerce' with your database name

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
