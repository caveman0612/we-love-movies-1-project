const knex = require("../../db/connection");

function destroy(reviewId) {
  //deletes review by id
  return knex("reviews").where({ review_id: reviewId }).del();
}

function update(reviewId, body) {
  return knex("reviews") //from reviews
    .where({ review_id: reviewId }) // filter by id
    .update(body) //update the body
    .then((item) => item[0]); //return first item
}

function readByTable(table, idObj) {
  return knex(table) //get from table
    .select("*") //get all col
    .where(idObj) //filter id object
    .then((item) => item[0]); //return first item
}

module.exports = {
  destroy,
  update,
  readByTable,
};
