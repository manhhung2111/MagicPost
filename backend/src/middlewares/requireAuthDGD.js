const jwt = require("jsonwebtoken");

const requireAuthTDGD = async (req, res, next) => {
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
    if (role_name == "GDT") {
      req.user = {
        role_name: role_name,
        user_name: user_name,
        center_name: center_name,
      };
    } else {
      return res.status(401).json({ error: "Request is not authorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

const requireAuthGDV = async (req, res, next) => {
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

    if (role_name == "GDV") {
      req.user = {
        role_name: role_name,
        user_name: user_name,
        center_name: center_name,
      };
    } else {
      return res.status(401).json({ error: "Request is not authorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

const requireAuthNVGHDGD = async (req, res, next) => {
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

    if (role_name == "NVGHDGD") {
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

module.exports = { requireAuthTDGD, requireAuthGDV, requireAuthNVGHDGD };
