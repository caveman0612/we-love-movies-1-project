const asyncErrorBoundary = require("../../error/asyncErrorBoundary");
const dbServies = require("./reviews-services");

async function destroy(req, res, next) {
  const { reviewId } = req.params; //gets review id
  const data = await dbServies.destroy(reviewId); //deletes review
  if (data == 0) {
    //gets if review id is valid
    return next({ status: 404, message: "Review cannot be found." }); //sends 404 error
  }
  res.sendStatus(204); //send success error
}

async function update(req, res, next) {
  const { reviewId } = req.params; //gets review id
  const { data = {} } = req.body; //get body from req
  if (!data.content) {
    //checks if content is empty
    next({ status: 404, message: "body cannot be found" }); //send error if no body is passed
  }

  await dbServies.update(reviewId, data); //updates body to id

  const updatedReview = await dbServies.readByTable("reviews", {
    review_id: reviewId,
  }); // gets updated review
  if (!updatedReview) {
    //checks if updated review is valid
    return next({ status: 404, message: "Review cannot be found" }); //sends not found error
  }

  const criticInfo = await dbServies.readByTable("critics", {
    critic_id: updatedReview.critic_id,
  }); //gets critic info for review
  updatedReview["critic"] = criticInfo; //combines critic info with review
  res.json({ data: updatedReview }); //sends data to client
}

module.exports = {
  destroy: asyncErrorBoundary(destroy),
  update: asyncErrorBoundary(update),
};
