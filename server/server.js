require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
// imports
const Lands = require("./routes/LandRoutes");
const User = require("./routes/UserRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// Database connect
connectDB();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Routes
app.use("/api/v1", Lands);
app.use("/api/v1", User);


// Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});