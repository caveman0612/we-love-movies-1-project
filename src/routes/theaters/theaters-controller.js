const theaterService = require("./theaters-services");
const asyncErrorBoundary = require("../../error/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await theaterService.list(); //gets list of all theaters and movies
  const organized = data.reduce((acc, cur) => {
    //reduce all movies to there respective theaters
    if (cur.theater_id in acc) {
      acc[cur.theater_id].movies.push({
        movie_id: cur.movie_id,
        title: cur.title,
        runtime_in_minutes: cur.runtime_in_minutes,
        rating: cur.rating,
        description: cur.description,
        image_url: cur.image_url,
        created_at: cur.m_created,
        updated_at: cur.m_updated,
        is_showing: cur.is_showing,
        theater_id: cur.theater_id,
      });
    } else {
      acc[cur.theater_id] = {
        theater_id: cur.theater_id,
        name: cur.name,
        address_line_1: cur.address_line_1,
        address_line_2: cur.address_line_2,
        city: cur.city,
        state: cur.state,
        zip: cur.zip,
        created_at: cur.t_created,
        updated_at: cur.t_updated,
        movies: [
          {
            movie_id: cur.movie_id,
            title: cur.title,
            runtime_in_minutes: cur.runtime_in_minutes,
            rating: cur.rating,
            description: cur.description,
            image_url: cur.image_url,
            created_at: cur.m_created,
            updated_at: cur.m_updated,
            is_showing: cur.is_showing,
            theater_id: cur.theater_id,
          },
        ],
      };
    }
    return acc;
  }, {});
  res.json({ data: Object.values(organized) }); //sending valuse to client
}

module.exports = { list: asyncErrorBoundary(list) };
