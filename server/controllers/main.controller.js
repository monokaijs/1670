const Account = require("../models/account.model");

const MainController = {
  loadProfile: async (req, res, next) => {
    let userId = req.body.userId;
    if (userId === "me") userId = req.userId;
    const account = await Account.findOne({
      id: userId
    });
    if (!account) return res.json({
      error: true,
      message: "User not found"
    });
    return res.json(account);
  }
};

module.exports = MainController;
