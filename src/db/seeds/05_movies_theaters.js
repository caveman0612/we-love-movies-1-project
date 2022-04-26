const generateMoviesTheatersJoins = (movieIds, theaterIds) => {
  const movies = movieIds
    .map(({ movie_id: movieId }) => {
      return theaterIds.map(({ theater_id: theaterId }, idx) => {
        // if (idx === 0) {
        //   return {
        //     is_showing: false,
        //     theater_id: theaterId,
        //     movie_id: movieId,
        //   };
        // }
        return {
          is_showing: true,
          theater_id: theaterId,
          movie_id: movieId,
        };
      });
    })
    .reduce((a, b) => a.concat(b), [])
    .filter((reviews) => reviews.theater_id);
  // movies[0].is_showing = false;
  // console.log(movies);
  return movies;
};

exports.seed = async function (knex) {
  const movieIds = await knex("movies").select("movie_id");
  const theaterIds = await knex("theaters").select("theater_id");

  const joins = generateMoviesTheatersJoins(movieIds, theaterIds);
  return knex("movies_theaters").insert(joins);
};
