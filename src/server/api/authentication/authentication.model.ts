import { Schema, model } from "mongoose";

const priceTrackerUserSchema: Schema = new Schema({
  email: { type: String, required: true },
  token: { type: String },
  password: { type: String, required: true },
});

export = model("user", priceTrackerUserSchema);
