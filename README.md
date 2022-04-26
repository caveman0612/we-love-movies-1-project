# We Love Movies

## GET /movies || GET /movies?is_showing=true

This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.

## GET /movies/:movieId

This route will return a single movie by ID.

## GET /movies/:movieId/theaters

This route should return all the `theaters` where the movie is playing. This means you will need to check

## GET /movies/:movieId/reviews

This route should return all the `reviews` for the movie, including all the `critic` details added to a `critic` key of the review.
