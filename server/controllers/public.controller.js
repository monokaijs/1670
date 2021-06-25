const Account = require("../models/account.model");
const Role = require("../models/role.model");

const PublicController = {
  loadConfig: async (req, res, next) => {
    const roles = await Role.find({}).select("-_id -__v");
    return res.json({
      roles: roles
    });
  }
};

module.exports = PublicController;
