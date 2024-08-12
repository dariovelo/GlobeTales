const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("../backend/routes/userRoutes"));
app.listen(port, () => console.log(`Server listening on port ${port}`));
