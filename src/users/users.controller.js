const { UserModel } = require("./users.model");

exports.getLoggedUser = (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).send({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSubUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.body;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { subscription },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send(`User ${email} not found`);
    }

    res.status(200).send(`User subscription update to ${subscription}`);
  } catch (error) {
    next(error);
  }
};
