"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = require("../configuration/connection");
const response_constants_1 = require("../constants/response.constants");
const verifyToken = (req, res, next) => {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        var token = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, connection_1.jwtSecret, (err, decoded) => {
            if (err) {
                return res
                    .status(response_constants_1.RESPONSE.Code.Internal_Server_Error)
                    .send({ auth: false, message: "Failed to authenticate token." });
            }
            req.userId = decoded._id;
            req.role = decoded.role;
            next();
        });
    }
    else {
        return res.status(403).send({ auth: false, message: "No token provided" });
    }
};
exports.verifyToken = verifyToken;
