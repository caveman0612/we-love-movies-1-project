const Knex = require("../../db/connection");

function list() {
  //   console.log("error");
  return Knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select(
      "*",
      "t.created_at as t_created",
      "t.updated_at as t_updated",
      "m.created_at as m_created",
      "m.updated_at as m.updated"
    )
    .orderBy("m.movie_id");
}

module.exports = { list };
