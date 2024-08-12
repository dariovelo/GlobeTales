const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("../backend/config/db");
const port = process.env.PORT;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("../backend/routes/userRoutes"));
app.listen(port, () => console.log(`Server listening on port ${port}`));
