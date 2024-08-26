const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("../backend/config/db");
const cors = require("cors");
const port = process.env.PORT;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", require("../backend/routes/userRoutes"));
app.use("/api/experiences", require("../backend/routes/experiencesRoutes"));
app.listen(port, () => console.log(`Server listening on port ${port}`));
