import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userId = decoded?.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
