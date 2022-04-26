if (process.env.USER) require("dotenv").config();
const express = require("express"); //get express
const cors = require("cors"); //get cors
const app = express(); //make app

// get all routers
const movieRouter = require("./routes/movies/movies-router");
const reviewRouter = require("./routes/reviews/reviews-router");
const theaterRouter = require("./routes/theaters/theaters-router");

//import error handlers
const notFound = require("./error/notFound");
const errorHandler = require("./error/errorHandler");

//implament middleware
app.use(cors());
app.use(express.json());

//implement routes
app.use("/movies", movieRouter);
app.use("/reviews", reviewRouter);
app.use("/theaters", theaterRouter);

// implement error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
