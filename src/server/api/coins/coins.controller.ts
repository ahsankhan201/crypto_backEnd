import { Request, Response } from "express";
import axios from "axios"; // Import axios for making API requests
import FavouriteCoin from "../favourite-coin/favourite-coin.model"; // Import the FavouriteCoin model

/**
 * Coins List
 * @param req
 * @param res
 */
export const coins = async function (req: Request, res: Response) {
  // Fetching paginated coin data from CoinGecko API
  const page = req.query.page || 1; // Default to page 1 if not specified
  const perPage = req.query.perPage || 10; // Default to 10 coins per page

  try {
    // Make a request to the CoinGecko API to get the list of coins
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd", // You can change this to your preferred currency
          order: "market_cap_desc", // Order by market cap
          per_page: perPage,
          page: page,
        },
      }
    );

    // Return user data along with the paginated coin list
    return res.status(200).json({
      message: "Coins List",
      coins: response.data, // Paginated coin data
    });
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return res.status(500).json({
      message: "Failed to fetch coin data",
    });
  }
};

/**
 * Search and filter cryptocurrencies by name, symbol, and price change
 * @param search - search term for coin name or symbol
 * @param minPriceChange - minimum price change percentage in the last 24 hours
 * @param maxPriceChange - maximum price change percentage in the last 24 hours
 * @param page - page number for pagination
 * @param perPage - number of items per page
 * @returns filtered coins list
 */
export const searchAndFilterCoins = async (
  search: string,
  minPriceChange: number,
  maxPriceChange: number,
  page: number,
  perPage: number
) => {
  try {
    // Fetch the coins data from CoinGecko API with pagination and 24h price change percentage
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd", // Currency to convert to (usd, eur, etc.)
          order: "market_cap_desc", // Order by market cap
          per_page: perPage,
          page: page,
          price_change_percentage: "24h", // Include 24h price change percentage in the response
        },
      }
    );

    // Filter the coins based on the search term (name or symbol)
    let filteredCoins = response.data;
    if (search) {
      filteredCoins = filteredCoins.filter(
        (coin: any) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter coins by the 24-hour price change range
    filteredCoins = filteredCoins.filter(
      (coin: any) =>
        coin.price_change_percentage_24h >= minPriceChange &&
        coin.price_change_percentage_24h <= maxPriceChange
    );

    return filteredCoins;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    throw new Error("Failed to fetch and filter coin data");
  }
};

export const favCoins = async function (req: any, res: Response) {
  try {
    // Fetching favorite coins for the user from the database
    const favCoins = await FavouriteCoin.find({ user: req.userId });

     // If coinIds is empty, return an empty response with a message
     if (!favCoins.length) {
      return res.status(200).json({
        coins: [],
        message: "No fav coins found",
      });
    }

    // Extracting the coin IDs from the favorite coins
    const coinIds = favCoins.map((x) => x.coinId);   

    // Fetching coin data from the CoinGecko API
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        ids: coinIds.join(","), // Joining the coinIds array into a comma-separated string
        order: "market_cap_desc",
      },
    });

    // Returning the coin data for the specified IDs
    return res.status(200).json({
      message: "Coins List",
      coins: response.data, // The list of coins returned by the API
      coinIds: coinIds
    });
  } catch (error: any) {
    console.error("Error fetching coin data:", error.message);
    return res.status(500).json({
      message: "Failed to fetch coin data",
    });
  }
};


export const search = async function (req: Request, res: Response) {
  const search = req.query.search || ''; // Search query for coin name or symbol

  try {
    // Make a request to the CoinGecko API to get the list of coins
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search",
      {
        params: {
          query: search ? search : undefined, // Search by coin name or symbol (e.g., 'bitcoin' or 'btc')
        },
      }
    );

    let filteredCoins = response.data.coins;

    const coinIds = filteredCoins.map((x:any) => x.id);   
        // Fetching coin data from the CoinGecko API
        const result = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            ids: coinIds.join(","), // Joining the coinIds array into a comma-separated string
            order: "market_cap_desc",
          },
        });

    // Return filtered and paginated coin data
    return res.status(200).json({
      message: "Coins List",
      coins: result.data, // Ensure it respects the pagination
    });
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return res.status(500).json({
      message: "Failed to fetch coin data",
    });
  }
};
