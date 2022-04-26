const knex = require("../../db/connection");

function criticDataByMovie(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "c.*",
      "r.*",
      "r.created_at as r_created",
      "c.created_at as c_created",
      "r.updated_at as r_updated",
      "c.updated_at as c_updated"
    )
    .where({ "m.movie_id": movieId });
}

function list() {
  return knex("movies").select("*");
}

function filteredList(query) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("*")
    .groupBy("m.movie_id")
    .where({ is_showing: true });
}

function read(movieId) {
  return knex("movies").where({ movie_id: movieId });
}

function theatersShowingMovie(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "m.movie_id": movieId });
}

module.exports = {
  list,
  read,
  filteredList,
  theatersShowingMovie,
  criticDataByMovie,
};
