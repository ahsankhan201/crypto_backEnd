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
exports.searchAndFilterCoins = exports.coins = void 0;
const axios_1 = __importDefault(require("axios")); // Import axios for making API requests
/**
 * Coins List
 * @param req
 * @param res
 */
const coins = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Fetching paginated coin data from CoinGecko API
        const page = req.query.page || 1; // Default to page 1 if not specified
        const perPage = req.query.perPage || 10; // Default to 10 coins per page
        try {
            // Make a request to the CoinGecko API to get the list of coins
            const response = yield axios_1.default.get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                    vs_currency: "usd",
                    order: "market_cap_desc",
                    per_page: perPage,
                    page: page,
                },
            });
            // Return user data along with the paginated coin list
            return res.status(200).json({
                message: "Coins List",
                coins: response.data, // Paginated coin data
            });
        }
        catch (error) {
            console.error("Error fetching coin data:", error);
            return res.status(500).json({
                message: "Failed to fetch coin data",
            });
        }
    });
};
exports.coins = coins;
/**
 * Search and filter cryptocurrencies by name, symbol, and price change
 * @param search - search term for coin name or symbol
 * @param minPriceChange - minimum price change percentage in the last 24 hours
 * @param maxPriceChange - maximum price change percentage in the last 24 hours
 * @param page - page number for pagination
 * @param perPage - number of items per page
 * @returns filtered coins list
 */
const searchAndFilterCoins = (search, minPriceChange, maxPriceChange, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the coins data from CoinGecko API with pagination and 24h price change percentage
        const response = yield axios_1.default.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: perPage,
                page: page,
                price_change_percentage: "24h", // Include 24h price change percentage in the response
            },
        });
        // Filter the coins based on the search term (name or symbol)
        let filteredCoins = response.data;
        if (search) {
            filteredCoins = filteredCoins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase()));
        }
        // Filter coins by the 24-hour price change range
        filteredCoins = filteredCoins.filter((coin) => coin.price_change_percentage_24h >= minPriceChange &&
            coin.price_change_percentage_24h <= maxPriceChange);
        return filteredCoins;
    }
    catch (error) {
        console.error("Error fetching coin data:", error);
        throw new Error("Failed to fetch and filter coin data");
    }
});
exports.searchAndFilterCoins = searchAndFilterCoins;
