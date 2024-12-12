import express from "express";
const controller = require("./coins.controller");
const router = express.Router();
import { verifyToken } from "../../../middleware";

router.get("/list", controller.coins);

router.get("/fav",verifyToken, controller.favCoins);

router.get("/search", controller.search);

export = router;
