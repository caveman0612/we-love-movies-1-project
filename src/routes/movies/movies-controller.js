const movieService = require("./movies-services");
const asyncErrorBoundary = require("../../error/asyncErrorBoundary");
const knex = require("../../db/connection");

async function list(req, res, next) {
  //getting query from request
  const query = req.query;
  let data; //seting empty vairable to fill
  if (Object.keys(query).length === 0) {
    //checking if query is passed in
    data = await movieService.list(); // getting all movies
  } else {
    data = await movieService.filteredList(query.is_showing); // geting list filtered by query
  }
  res.json({ data }); //send data back to client
}

async function read(req, res, next) {
  const { movieId } = req.params; //geting id param from req
  const movie = await movieService.read(movieId); //geting movie object from service
  if (!movie) {
    //checking if object is empty
    return next({ status: 404, message: `${movieId} is not a valid movie id` }); //sending not found
  }
  res.json({ data: movie }); //sending data to client
}

async function theatersShowingMovie(req, res, next) {
  const { movieId } = req.params; //getting movie id
  const data = await movieService.theatersShowingMovie(movieId); // getting all theaters that show the specfic movie
  if (Object.keys(data).length === 0) {
    // checking if onbject is empty
    return next({ status: 404, message: `${movieId} is not a valid movie id` }); //return not found
  }
  res.json({ data }); //sending data
}

async function criticDataByMovie(req, res, next) {
  const { movieId } = req.params; // getting movie id
  const data = await movieService.criticDataByMovie(movieId); //geting critic data by movie id
  if (Object.keys(data).length === 0) {
    //checking if object is empty
    return next({ status: 404, message: `${movieId} is not a valid movie id` }); //sending not found
  }
  //remaping data to requested specs
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
  res.json({ data: cleanedData }); // sending data to client
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  theatersShowingMovie: asyncErrorBoundary(theatersShowingMovie),
  criticDataByMovie: asyncErrorBoundary(criticDataByMovie),
};
