// Este componente é utilizado para carregar as configurações
// que estão em variáveis de ambiente
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { notion_db } = require("./notion-wrapper");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// Aqui estão os middlewares utilizados nos endpoints
const { verifyJWT, verifyStatus } = require("./middleware");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());

// Endpoints
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", verifyStatus, (req, res, next) => {
  /* 
    #swagger.tags = ['Test']
    #swagger.summary = 'This method return the status of the API'
  */
  res.send({
    status: process.env.STATUS,
    message: "A API está funcionando.",
  });
});

app.get("/test/", verifyStatus, verifyJWT, (req, res, next) => {
  /* 
    #swagger.security = [{"api_key": ['read', 'write']}]
    #swagger.tags = ['Test']
    #swagger.summary = 'This method tests if your API Key is valid'
  */
  res.send({
    status: process.env.STATUS,
    message: "A API está funcionando.",
  });
});

app.get(
  "/database/:dbname",
  verifyStatus,
  verifyJWT,
  async (req, res, next) => {
    /* 
    #swagger.security = [{"api_key": ['read', 'write']}]
    #swagger.tags = ['Reading List']
    #swagger.summary = 'This method returns the id for the Reading List database'
    */
    const dbid = await notion_db.returnDatabaseId(req.params.dbname);
    res.send({
      status: "OK",
      database_id: dbid,
      database_name: req.params.dbname,
    });
  }
);

app.post("/save/", verifyStatus, verifyJWT, async (req, res, next) => {
  /* 
    #swagger.security = [{"api_key": ['read', 'write']}]
    #swagger.tags = ['Reading List']
    #swagger.summary = 'This method save an item in your Reading List'
  */
  const response = await notion_db.savePage({
    dbId: process.env.DATABASE_ID,
    ...req.body,
  });
  res.send({
    status: "OK",
    content: response,
  });
});

// Inicializa a API
// Este if é utilizado para permitir que a API seja testada via jest
if (require.main === module) {
  app.listen(process.env.PORT || 3000, function () {
    console.log(`server running on port ${process.env.PORT || 3000}`);
  });
}

module.exports = app;
