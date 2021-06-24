const Account = require("../models/account.model");

const MainController = {
  loadProfile: async (req, res, next) => {
    let userId = req.body.userId;
    if (userId === "me") userId = req.userId;
    const account = await Account.findOne({
      id: userId
    }).populate("role");
    if (!account) return res.json({
      error: true,
      message: "User not found"
    });
    const accountObject = account.toObject();
    return res.json({
      ...accountObject,
      role: accountObject.role.slug
    });
  }
};

module.exports = MainController;
