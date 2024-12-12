import express from "express";
const controller = require("./favourite-coin.controller");
const router = express.Router();
import { verifyToken } from "../../../middleware";

router.post("/toogle", verifyToken, controller.toggleFavorite);

export = router;
