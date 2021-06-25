const PublicController = require("../controllers/public.controller");

const route = (app) => {
  app.post("/api/loadConfig", PublicController.loadConfig);
};

module.exports = route;
