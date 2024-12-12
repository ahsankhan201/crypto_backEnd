import { Request, Response } from "express";
import FavouriteCoin from "./favourite-coin.model"; // Import the FavouriteCoin model

/**
 * Toggle a coin's favorite status for a user.
 * If the coin is already in the user's favorites, remove it.
 * If the coin is not in the user's favorites, add it.
 * @param req
 * @param res
 */
export const toggleFavorite = async (req: any, res: Response) => {
  const { coinId } = req.body;

  if (!coinId) {
    return res.status(400).json({ message: "Coin ID is required" });
  }

  try {
    let user= req.userId;
    // Check if the coin is already favorited by this user
    const existingFavorite = await FavouriteCoin.findOne({ coinId, user });

    if (existingFavorite) {
      // Coin is already in favorites, so remove it
      await FavouriteCoin.findOneAndDelete({ coinId, user });
      return res.status(200).json({ message: "Coin removed from favorites" });
    } else {
      // Coin is not in favorites, so add it
      const newFavorite = new FavouriteCoin({ coinId, user });
      await newFavorite.save();
      return res.status(200).json({ message: "Coin added to favorites", coin: newFavorite });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to process the favorite action" });
  }
};
