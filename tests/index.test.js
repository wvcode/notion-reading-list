const supertest = require("supertest");
const app = require("../index");
const originalEnv = Object.assign({}, process.env);
const testApp = supertest(app);

beforeEach(() => {
  process.env = Object.assign({}, originalEnv);
});

afterEach(() => {
  process.env = Object.assign({}, originalEnv);
});

test("GET / - App está UP", async () => {
  const response = await testApp.get("/");
  expect(response.status).toBe(200);
  expect(response.body.status == "UP");
});

test("GET / - App está em Manutenção", async () => {
  process.env.STATUS = "DOWN";
  const response = await testApp.get("/");
  expect(response.status).toBe(200);
  expect(response.body.status == "DOWN");
});

test("GET /test - Sem Token", async () => {
  const response = await testApp.get("/test");
  expect(response.status).toBe(500);
  expect(response.body.auth === false);
});

test("GET /test - Token Inválido", async () => {
  const response = await testApp.get("/test").set("Authorization", "eroeri");
  expect(response.status).toBe(401);
  expect(response.body.auth === false);
});

test("GET /test - Token Válido", async () => {
  const response = await testApp
    .get("/test")
    .set("Authorization", process.env.APIKEY);
  expect(response.status).toBe(200);
  expect(response.body.status === "OK");
});

test("POST /post - Criar Post ", async () => {
  const response = await testApp
    .post("/save")
    .send({
      db: "Media",
      name: "Testing 2",
      url: "http://www.google.com",
      date_saved: "2021-12-05",
    })
    .set("Authorization", process.env.APIKEY);
  expect(response.status).toBe(200);
  expect(response.body.content.length > 0);
});

test("POST /post - Criar Post with Now", async () => {
  const response = await testApp
    .post("/save")
    .send({
      db: "Media",
      name: "Testing Date with Now",
      url: "http://www.google.com",
      date_saved: "now",
    })
    .set("Authorization", process.env.APIKEY);
  expect(response.status).toBe(200);
  expect(response.body.content.length > 0);
});

test("POST /post - Criar Post with null", async () => {
  const response = await testApp
    .post("/save")
    .send({
      db: "Media",
      name: "Testing Date with Now",
      url: "http://www.google.com",
      date_saved: null,
    })
    .set("Authorization", process.env.APIKEY);
  expect(response.status).toBe(200);
  expect(response.body.content.length > 0);
});

test("GET /database - Buscar Database ID", async () => {
  const response = await testApp
    .get("/database/Media")
    .set("Authorization", process.env.APIKEY);
  expect(response.status).toBe(200);
  expect(response.body.database_id.length > 0);
});
