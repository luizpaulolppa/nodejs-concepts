const request = require("supertest");
const app = require("../../src/app");

describe("Repositories", () => {
  beforeEach(async () => {
    const response = await request(app)
      .get("/repositories")
      .send();

      response.body.forEach(async (repo) => {
        await request(app).delete(`/repositories/${repo.id}`).send();
      });
  });

it("should be able to create a new repository", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        name: "react-starter-kit",
        description: "React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("link");
    expect(response.body).toHaveProperty("likes");
    expect(response.body).toHaveProperty("dislikes");
  });

it("should be able to list the repositories", async () => {
    await request(app)
      .post("/repositories")
      .send({
        name: "react-starter-kit",
        description: "React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

    await request(app)
      .post("/repositories")
      .send({
        name: "react-starter-kit2",
        description: "React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)",
        link: "https://github.com/kriasoft/react-starter-kit",
      });
    
    const response = await request(app)
      .get("/repositories")
      .send();

    expect(response.body).toHaveLength(2);
  });

it("should be able to update repository", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        name: "react-starter-kit",
        description: "React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

    expect(response.body.name).toEqual("react-starter-kit");
    expect(response.body.description).toEqual("React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)");
    expect(response.body.link).toEqual("https://github.com/kriasoft/react-starter-kit");
    expect(response.body.likes).toEqual(0);
    expect(response.body.dislikes).toEqual(0);

    const responseUpdated = await request(app)
      .put(`/repositories/${response.body.id}`)
      .send({
        name: "react-starter-kit2",
        description: "React Starter",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

    expect(responseUpdated.body.id).toEqual(response.body.id);
    expect(responseUpdated.body.name).toEqual("react-starter-kit2");
    expect(responseUpdated.body.description).toEqual("React Starter");
    expect(responseUpdated.body.link).toEqual("https://github.com/kriasoft/react-starter-kit");
    expect(responseUpdated.body.likes).toEqual(0);
    expect(responseUpdated.body.dislikes).toEqual(0);
  });

it("should not be able to update a repository that does not exist", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        name: "react-starter-kit",
        description: "React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

    expect(response.body.name).toEqual("react-starter-kit");
    expect(response.body.description).toEqual("React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)");
    expect(response.body.link).toEqual("https://github.com/kriasoft/react-starter-kit");
    expect(response.body.likes).toEqual(0);
    expect(response.body.dislikes).toEqual(0);

    const responseUpdated = await request(app)
      .put(`/repositories/asdfwdaf-asdfsadf-asdfasdf-asdfsdaf`)
      .send({
        name: "react-starter-kit2",
        description: "React Starter",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

      expect(responseUpdated.status).toEqual(400);
      expect(responseUpdated.body.message).toEqual("Not found repository.");
  });

it("should be able to like repository", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        name: "react-starter-kit",
        description: "React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

    expect(response.body.name).toEqual("react-starter-kit");
    expect(response.body.description).toEqual("React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)");
    expect(response.body.link).toEqual("https://github.com/kriasoft/react-starter-kit");
    expect(response.body.likes).toEqual(0);
    expect(response.body.dislikes).toEqual(0);

    let responseUpdated = await request(app)
      .post(`/repositories/${response.body.id}/likes`)
      .send();

    responseUpdated = await request(app)
      .post(`/repositories/${response.body.id}/likes`)
      .send();

    responseUpdated = await request(app)
      .post(`/repositories/${response.body.id}/likes`)
      .send();

    expect(responseUpdated.body.name).toEqual("react-starter-kit");
    expect(responseUpdated.body.description).toEqual("React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)");
    expect(responseUpdated.body.link).toEqual("https://github.com/kriasoft/react-starter-kit");
    expect(responseUpdated.body.likes).toEqual(3);
    expect(responseUpdated.body.dislikes).toEqual(0);
  });

it("should be able to dislike repository", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        name: "react-starter-kit",
        description: "React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

    expect(response.body.name).toEqual("react-starter-kit");
    expect(response.body.description).toEqual("React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)");
    expect(response.body.link).toEqual("https://github.com/kriasoft/react-starter-kit");
    expect(response.body.likes).toEqual(0);
    expect(response.body.dislikes).toEqual(0);

    let responseUpdated = await request(app)
      .post(`/repositories/${response.body.id}/dislikes`)
      .send();

    responseUpdated = await request(app)
      .post(`/repositories/${response.body.id}/dislikes`)
      .send();

    responseUpdated = await request(app)
      .post(`/repositories/${response.body.id}/dislikes`)
      .send();

    expect(responseUpdated.body.name).toEqual("react-starter-kit");
    expect(responseUpdated.body.description).toEqual("React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)");
    expect(responseUpdated.body.link).toEqual("https://github.com/kriasoft/react-starter-kit");
    expect(responseUpdated.body.likes).toEqual(0);
    expect(responseUpdated.body.dislikes).toEqual(3);
  });

it("should be able to delete repository", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        name: "react-starter-kit",
        description: "React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)",
        link: "https://github.com/kriasoft/react-starter-kit",
      });

    expect(response.body.name).toEqual("react-starter-kit");
    expect(response.body.description).toEqual("React Starter Kit — isomorphic web app boilerplate (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)");
    expect(response.body.link).toEqual("https://github.com/kriasoft/react-starter-kit");
    expect(response.body.likes).toEqual(0);
    expect(response.body.dislikes).toEqual(0);

    let responseDeleted = await request(app)
      .delete(`/repositories/${response.body.id}`)
      .send();

    expect(responseDeleted.status).toEqual(204);
  });
});