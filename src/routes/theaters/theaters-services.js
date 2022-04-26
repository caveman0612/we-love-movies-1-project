const Knex = require("../../db/connection");

function list() {
  return Knex("theaters as t") //from theaters
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id") //add movies_theaters
    .join("movies as m", "m.movie_id", "mt.movie_id") //add movies
    .select(
      "*",
      "t.created_at as t_created",
      "t.updated_at as t_updated",
      "m.created_at as m_created",
      "m.updated_at as m.updated"
    ); //get all cols
}

module.exports = { list };
