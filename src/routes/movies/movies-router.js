const router = require("express").Router();
const movieController = require("./movies-controller");
const methodNotAllowed = require("../../error/methodNotAllowed");

router.route("/").get(movieController.list).all(methodNotAllowed);

router.route("/:movieId").get(movieController.read).all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(movieController.theatersShowingMovie)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(movieController.criticDataByMovie)
  .all(methodNotAllowed);

module.exports = router;
