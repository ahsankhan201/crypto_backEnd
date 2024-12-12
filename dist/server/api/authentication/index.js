"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller = require("./authentication.controller");
const router = express_1.default.Router();
router.post("/signup", controller.register);
router.post("/login", controller.login);
module.exports = router;
