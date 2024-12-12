import jwt from "jsonwebtoken";
import { jwtSecret } from "../configuration/connection";
import { RESPONSE } from "../constants/response.constants";

export const verifyToken = (req: any, res: any, next: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    var token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
      if (err) {
        return res
          .status(RESPONSE.Code.Internal_Server_Error)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      req.userId = decoded._id;
      next();
    });
  } else {
    return res.status(403).send({ auth: false, message: "No token provided" });
  }
};
