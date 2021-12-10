const { notion_db } = require("./notion-wrapper");

exports.verifyJWT = function (req, res, next) {
  var token = req.headers["authorization"];
  if (!token)
    return res.status(500).send({
      status: "ERR",
      auth: false,
      message: "Token não informado.",
    });

  if (token == process.env.APIKEY) {
    next();
  } else {
    return res.status(401).send({
      status: "ERR",
      auth: false,
      message: "Token inválido.",
    });
  }
};

exports.verifyStatus = function (req, res, next) {
  if (process.env.STATUS !== "UP") {
    return res.status(200).send({ status: "OK", message: "API em Manutenção" });
  }
  next();
};
