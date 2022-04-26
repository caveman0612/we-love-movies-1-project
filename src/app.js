if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const movieRouter = require("./routes/movies/movies-router");
const reviewRouter = require("./routes/reviews/reviews-router");
const theaterRouter = require("./routes/theaters/theaters-router");

const notFound = require("./error/notFound");
const errorHandler = require("./error/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/movies", movieRouter);
app.use("/reviews", reviewRouter);
app.use("/theaters", theaterRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
