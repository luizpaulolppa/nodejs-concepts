const express = require("express");
const cors = require("cors");
const RepositoryController = require("./controllers/RepositoryController");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/repositories", RepositoryController);

module.exports = app;