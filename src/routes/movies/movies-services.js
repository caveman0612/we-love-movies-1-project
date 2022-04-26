const knex = require("../../db/connection");

function list() {
  //return all columns form movies table
  return knex("movies").select("*");
}

function filteredList(query) {
  return knex("movies as m") //getting from movies table
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id") //joinging movies-theaters table
    .select("*") //getting all
    .groupBy("m.movie_id") //merging by movie id
    .where({ is_showing: query === "true" }); //filtering by is showing
}

function read(movieId) {
  return knex("movies").where({ movie_id: movieId }).first(); //getting first object in movies table
}

function theatersShowingMovie(movieId) {
  return knex("movies as m") //from movies
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id") //connecting movies-theater
    .join("theaters as t", "mt.theater_id", "t.theater_id") //joining theater table
    .select("t.*", "mt.is_showing", "m.movie_id") //getting specific columns
    .where({ "m.movie_id": movieId }); //filter by movieId
}

function criticDataByMovie(movieId) {
  return knex("movies as m") //form movies
    .join("reviews as r", "m.movie_id", "r.movie_id") // join reviews table
    .join("critics as c", "r.critic_id", "c.critic_id") // join critics table
    .select(
      //select all columns
      "c.*",
      "r.*",
      "r.created_at as r_created",
      "c.created_at as c_created",
      "r.updated_at as r_updated",
      "c.updated_at as c_updated"
    )
    .where({ "m.movie_id": movieId }); //filter by movie id
}

module.exports = {
  list,
  read,
  filteredList,
  theatersShowingMovie,
  criticDataByMovie,
};
