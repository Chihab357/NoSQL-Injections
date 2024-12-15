const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB connection URI and database name
const uri = "mongodb://localhost:27017";
const dbName = "demo";

let db, usersCollection;

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log("Connected to MongoDB");
        db = client.db(dbName);
        usersCollection = db.collection('users');
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Middleware to parse form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Allows raw JSON inputs for testing injections

// Serve static files (e.g., images, CSS, etc.) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    res.render('index'); // Login page
});

app.post('/login', async (req, res) => {
    try {
        // Log the request body to see what the front end sends
        console.log("Request body:", req.body);

        // Vulnerable query
        const query = req.body;
        console.log("MongoDB query:", query); // Log the query

        const user = await usersCollection.findOne(query);

        if (user) {
            res.render('success', { username: req.body.username });
        } else {
            res.render('error');
        }
    } catch (err) {
        console.error("Database query error:", err);
        res.render('error');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
