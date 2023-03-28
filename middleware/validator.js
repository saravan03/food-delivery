const validator = (validationSchema, reqData = "body") => {
  return async (req, res, next) => {
    try {
      let data;
      if (reqData === "query") data = req.query;

      if (reqData === "params") data = req.params;
      if (reqData === "body") data = req.body;
      await validationSchema.validateAsync(data);
      next();
    } catch (e) {
      return res.status(422).json({
        status: 422,
        message: e.message,
      });
    }
  };
};

module.exports = validator;
