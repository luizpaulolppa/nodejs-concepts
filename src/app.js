const express = require("express");
const RepositoryController = require("./controllers/RepositoryController");

const app = express();

app.use(express.json());
app.use("/repositories", RepositoryController);

module.exports = app;