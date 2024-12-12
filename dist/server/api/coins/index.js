"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller = require("./coins.controller");
const router = express_1.default.Router();
router.get("/list", controller.coins);
module.exports = router;
