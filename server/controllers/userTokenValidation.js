import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenValidation = (req, res) => {
  const token = req.cookies?.userToken;
  if (!token) {
    return false;
  }

  try {
    // Verify and decode the token
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // Handle errors (e.g., token expired, invalid token)
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const validateAdminToken = (req, res) => {
  const token = tokenValidation(req, res);
  return token.role == "admin" ? token : false;
};

export const validateHost = (req, res) => {
  const token = tokenValidation(req, res);
  return token.role == "host" ? token : false;
};

export const validateUser = (req, res) => {
  const token = tokenValidation(req, res);
  return token ? token : false;
};

// const validateUser = (req, res) => {
//   const valid = tokenValidation(req, res);
//   if (valid) {
//     res.status(200).send({
//       success: true,
//     });
//   } else {
//     res.status(401).json({ success: false, message: "Unauthorized Access" });
//   }
// };
