const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
let dotenv = require("dotenv").config({path:'../.env'}); // Add this line to load environment variables from .env file
console.log(dotenv);

const coursesRoutes = require("./routes/coursesRoutes");
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.NEXT_PUBLIC_PORT;// || 4000; // Fallback port
//console.log(`PORT from .env: ${process.env.PORT}`); // Add this line to check the PORT value

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/courses", coursesRoutes);
app.use('/auth', authRoutes);

// Health check route
app.get("/", (req, res) => res.send("Backend is running!"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

// Export app for Vercel
module.exports = app;
