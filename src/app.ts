import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { DBURL } from "./configuration/connection";
import cors from "cors";
const app: Application = express();
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    express.json()(req, res, next);
  }
);

const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3001/',
];

const options: cors.CorsOptions = {
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
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(options));

require("./routes/index")(app);


app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

/**
 * Error Handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};
app.use(errorHandler);
mongoose.set("strictQuery", false);
mongoose
  .connect(DBURL, {})
  .then(() => console.log("Database Connected Sucessfully..."))
  .catch((err) => console.log("Error in Connecting Databse... ", err));

app.listen(3000, () => {
  console.log("API is Listening to Port 3000");
});
