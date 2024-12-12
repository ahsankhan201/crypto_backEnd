"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("./configuration/connection");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    express_1.default.json()(req, res, next);
});
const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:4200/',
];
const options = {
    allowedHeaders: [
        "Access-Control-Allow-Headers",
        "*",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        'Authorization', // Include 'Authorization' header
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: (origin, callback) => {
        // Check if the origin is in the allowed list or if it's not provided (e.g., a same-origin request)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use((0, cors_1.default)(options));
require("./routes/index")(app);
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
/**
 * Error Handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};
app.use(errorHandler);
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(connection_1.DBURL, {})
    .then(() => console.log("Database Connected Sucessfully..."))
    .catch((err) => console.log("Error in Connecting Databse... ", err));
app.listen(3000, () => {
    console.log("API is Listening to Port 3000");
});
