"use strict";
module.exports = function (server) {
    server.use("/auth", require("../server/api/authentication"));
    server.use("/coins", require("../server/api/coins"));
    server.use("/favourite", require("../server/api/favourite-coin"));
};
