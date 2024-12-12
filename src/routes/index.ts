import { Application } from "express";
import { verifyToken } from "../middleware";

export = function (server: Application) {
  server.use("/auth", require("../server/api/authentication"));
  server.use("/coins", require("../server/api/coins"));
  server.use("/favourite", require("../server/api/favourite-coin"));

};
