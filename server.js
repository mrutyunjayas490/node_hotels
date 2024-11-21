const express = require('express');
const app = express();
const db = require('./db'); // Ensure this is properly configured and connects to your database
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON bodies in incoming requests
const PORT = process.env.PORT || 300;

// Root route
app.get('/', function (req, res) {
    res.send('Hello, welcome to OUR HOTEL');
});

//import the Person Router files
const personRoutes = require('./routes/personRoutes');

//Use the person routers
app.use('/person',personRoutes);

//import the menuitem Router files
const menuitemRoutes = require('./routes/menuitemRoutes');

//Use the menuitem routers
app.use('/menuitem',menuitemRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
