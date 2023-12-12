const jwt = require("jsonwebtoken");

const requireAuthTDTK = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // get token
  const token = authorization.split(" ")[1];

  // authentication
  try {
    const { role_name, user_name, center_name } = jwt.verify(
      token,
      process.env.SECRET
    );

    if (role_name == "TDTK") {
      req.role_name = role_name;
      req.user_name = user_name;
      req.center_name = center_name;
    } else {
      return res.status(401).json({ error: "Request is not authorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

const requireAuthNVDTK = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // get token
  const token = authorization.split(" ")[1];

  // authentication
  try {
    const { role_name, user_name, center_name } = jwt.verify(
      token,
      process.env.SECRET
    );

    if (role_name == "NVDTK") {
      req.role_name = role_name;
      req.user_name = user_name;
      req.center_name = center_name;
    } else {
      return res.status(401).json({ error: "Request is not authorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = { requireAuthTDTK, requireAuthNVDTK };
