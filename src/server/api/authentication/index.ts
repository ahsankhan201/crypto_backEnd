import express from "express";
const controller = require("./authentication.controller");
const router = express.Router();
import { verifyToken } from "../../../middleware";



router.post("/signup", controller.register);
router.post("/login", controller.login);



export = router;