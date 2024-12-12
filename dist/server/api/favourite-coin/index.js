"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller = require("./favourite-coin.controller");
const router = express_1.default.Router();
const middleware_1 = require("../../../middleware");
router.post("/toogle", middleware_1.verifyToken, controller.toggleFavorite);
module.exports = router;
