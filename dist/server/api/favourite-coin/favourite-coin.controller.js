"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFavorite = void 0;
const favourite_coin_model_1 = __importDefault(require("./favourite-coin.model")); // Import the FavouriteCoin model
/**
 * Toggle a coin's favorite status for a user.
 * If the coin is already in the user's favorites, remove it.
 * If the coin is not in the user's favorites, add it.
 * @param req
 * @param res
 */
const toggleFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coinId } = req.body;
    if (!coinId) {
        return res.status(400).json({ message: "Coin ID is required" });
    }
    try {
        let user = req.userId;
        // Check if the coin is already favorited by this user
        const existingFavorite = yield favourite_coin_model_1.default.findOne({ coinId, user });
        if (existingFavorite) {
            // Coin is already in favorites, so remove it
            yield favourite_coin_model_1.default.findOneAndDelete({ coinId, user });
            return res.status(200).json({ message: "Coin removed from favorites" });
        }
        else {
            // Coin is not in favorites, so add it
            const newFavorite = new favourite_coin_model_1.default({ coinId, user });
            yield newFavorite.save();
            return res.status(200).json({ message: "Coin added to favorites", coin: newFavorite });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to process the favorite action" });
    }
});
exports.toggleFavorite = toggleFavorite;
