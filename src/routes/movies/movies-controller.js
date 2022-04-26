const movieService = require("./movies-services");
const asyncErrorBoundary = require("../../error/asyncErrorBoundary");
const knex = require("../../db/connection");

//main functions

async function list(req, res, next) {
  const query = req.query;
  let data;
  if (Object.keys(query).length === 0) {
    data = await movieService.list();
  } else {
    data = await movieService.filteredList(query);
  }
  res.json({ data });
}

async function read(req, res, next) {
  const { movieId } = req.params;
  const movie = await movieService.read(movieId);
  if (Object.keys(movie).length === 0) {
    return next({ status: 404, message: `${movieId} is not a valid movie id` });
  }
  res.json({ data: movie[0] });
}

async function theatersShowingMovie(req, res, next) {
  const { movieId } = req.params;
  const data = await movieService.theatersShowingMovie(movieId);
  if (Object.keys(data).length === 0) {
    return next({ status: 404, message: `${movieId} is not a valid movie id` });
  }
  res.json({ data });
}

async function criticDataByMovie(req, res, next) {
  const { movieId } = req.params;
  const data = await movieService.criticDataByMovie(movieId);
  if (Object.keys(data).length === 0) {
    return next({ status: 404, message: `${movieId} is not a valid movie id` });
  }
  const cleanedData = data.map((item) => ({
    review_id: item.review_id,
    content: item.content,
    score: item.score,
    created_at: item.r_created,
    updated_at: item.r_updated,
    critic_id: item.critic_id,
    movie_id: item.movie_id,
    critic: {
      critic_id: item.critic_id,
      preferred_name: item.preferred_name,
      surname: item.surname,
      organization_name: item.organization_name,
      created_at: item.c_created,
      updated_at: item.c_updated,
    },
  }));
  res.json({ data: cleanedData });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  theatersShowingMovie: asyncErrorBoundary(theatersShowingMovie),
  criticDataByMovie: asyncErrorBoundary(criticDataByMovie),
};
