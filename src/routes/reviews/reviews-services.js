const knex = require("../../db/connection");

function list() {
  return knex("reviews").select("*");
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function update(reviewId, body) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .update(body)
    .then((item) => item[0]);
}

function listUpdatedReview(reviewId) {
  return (
    knex("reviews")
      .select("*")
      // .join("critics", "critics.critic_id", "reviews.critic_id")
      .where({ review_id: reviewId })
      .then((item) => item[0])
  );
}

function readCriticInfo(criticId) {
  return knex("critics")
    .select("*")
    .where({ critic_id: criticId })
    .then((item) => item[0]);
}

module.exports = { destroy, list, update, readCriticInfo, listUpdatedReview };
