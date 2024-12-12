"use strict";
const mongoose_1 = require("mongoose");
const priceTrackerUserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    token: { type: String },
    password: { type: String, required: true },
});
module.exports = (0, mongoose_1.model)("user", priceTrackerUserSchema);
