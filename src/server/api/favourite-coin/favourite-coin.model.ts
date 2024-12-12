import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const priceTrackerFavouriteCoinSchema: Schema = new Schema({
  coinId: { type: String, required: true },
  user: { type: ObjectId, required: true},
});

export = model("favourite-coin", priceTrackerFavouriteCoinSchema);
