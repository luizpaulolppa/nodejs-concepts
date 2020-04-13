const express = require("express");
const uuid = require("uuid/v4");
const router = express.Router();
let repositories = [];

router.get("/", (req, res) => {
  const { name } = req.query;

  const repos = name
    ? repositories.filter(repo => 
      repo.name.toUpperCase().includes(name.toUpperCase()))
    : repositories;
  
  return res.json(repos);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find(repo => repo.id === id);
  if (!repository) {
    return res.status(400).json({ message: "Not found repository." });
  }

  return res.json(repository);
});

router.post("/", (req, res) => {
  const { name, description, link } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Not found name." });
  }

  if (!description) {
    return res.status(400).json({ message: "Not found description." });
  }

  if (!link) {
    return res.status(400).json({ message: "Not found link." });
  }

  const matchReposName = repositories.find(repo => repo.name == name);
  if (matchReposName) {
    return res.status(400).json({ message: "fond the same name." });
  }
  
  const repository = { id: uuid(), name, description, link, likes: 0, dislikes: 0 };

  repositories.push(repository);

  return res.json(repository);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, link } = req.body;

  const repository = repositories.find(repo => repo.id === id);
  if (!repository) {
    return res.status(400).json({ message: "Not found repository." });
  }

  if (!name) {
    return res.status(400).json({ message: "Not found name." });
  }

  if (!description) {
    return res.status(400).json({ message: "Not found description." });
  }

  if (!link) {
    return res.status(400).json({ message: "Not found link." });
  }

  const matchReposName = repositories
    .filter(repo => repo.id !== id)
    .find(repo => repo.name == name);

  if (matchReposName) {
    return res.status(400).json({ message: "fond the same name." });
  }

  repository.name = name;
  repository.description = description;
  repository.link = link;

  repositories = repositories.map(repo => repo.id === id ? repository : repo);

  return res.json(repository);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find(repo => repo.id === id);
  if (!repository) {
    return res.status(400).json({ message: "Not found repository." });
  }

  repositories = repositories.filter(repo => repo.id !== id);

  return res.status(204).send();
});

router.post("/:id/likes", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find(repo => repo.id === id);
  if (!repository) {
    return res.status(400).json({ message: "Not found repository." });
  }

  repository.likes = repository.likes +1;

  repositories = repositories.map(repo => repo.id === id ? repository : repo);

  return res.json(repository);
});

router.post("/:id/dislikes", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find(repo => repo.id === id);
  if (!repository) {
    return res.status(400).json({ message: "Not found repository." });
  }

  repository.dislikes = repository.dislikes +1;

  repositories = repositories.map(repo => repo.id === id ? repository : repo);

  return res.json(repository);
});

module.exports = router;

