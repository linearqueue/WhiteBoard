import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization header with Bearer token is required." });
    }

    const token = authorization.split(" ")[1];
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    req.userId = decodedPayload._id;
    req.email = decodedPayload.email;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired." });
    }

    return res.status(403).json({ error: "Invalid or malformed token." });
  }
}

export default authMiddleware;
