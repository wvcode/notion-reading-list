// Este componente é utilizado para carregar as configurações
// que estão em variáveis de ambiente
require("dotenv").config();

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Notion Reading List API",
    description: "API to save items to your Notion's Reading List.",
  },
  host:
    process.env.PORT != 80
      ? `${process.env.HOST}:${process.env.PORT}`
      : `${process.env.HOST}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Test",
      description: "Endpoints to test the API",
    },
    {
      name: "Reading List",
      description: "Endpoints to work with the Reading List",
    },
  ],
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  definitions: {
    Item: {
      $name: "Testing Title",
      $url: "https://testing.url.com",
      $date_saved: "now",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});
