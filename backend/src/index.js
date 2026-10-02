const express = require("express");
const cors = require("cors");
const { httpServerHandler } = require("cloudflare:node");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

// Routes
app.use("/api", require("../authRoutes/authRoutes"));
app.use("/api/post", require("../postRoutes/route"));
app.use("/api/user", require("../userRoutes/userRoutes"));
app.use("/api", require("../wss/messagesRoute.js"));

app.get("/", (req, res) => {
    res.json({
        message: "CampusConnect backend is running on Cloudflare"
    });
});

app.listen(3000);

module.exports = app;

module.exports.default = httpServerHandler({
    port: 3000
});