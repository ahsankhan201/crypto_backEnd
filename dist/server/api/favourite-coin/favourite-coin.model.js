"use strict";
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const priceTrackerFavouriteCoinSchema = new mongoose_1.Schema({
    coinId: { type: String, required: true },
    user: { type: mongodb_1.ObjectId, required: true },
});
module.exports = (0, mongoose_1.model)("favourite-coin", priceTrackerFavouriteCoinSchema);
