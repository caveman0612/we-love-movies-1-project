const asyncErrorBoundary = require("../../error/asyncErrorBoundary");
const dbServies = require("./reviews-services");

async function list(req, res, next) {
  const data = await dbServies.list();
  res.json({ data });
}

async function destroy(req, res, next) {
  const { reviewId } = req.params;
  const data = await dbServies.destroy(reviewId);
  if (data == 0) {
    return next({ status: 404, message: "Review cannot be found." });
  }
  res.sendStatus(204);
}

async function update(req, res, next) {
  const { reviewId } = req.params;
  const { data = {} } = req.body;
  if (!data.content) {
    next({ status: 404, message: "cannot be found" });
  }

  await dbServies.update(reviewId, data);

  const critics = await dbServies.listUpdatedReview(reviewId);
  if (!critics) {
    return next({ status: 404, message: "Review cannot be found" });
  }

  const criticInfo = await dbServies.readCriticInfo(critics.critic_id);
  const newData = { ...critics };
  newData["critic"] = criticInfo;
  res.json({ data: newData });
}

module.exports = {
  destroy: asyncErrorBoundary(destroy),
  update: asyncErrorBoundary(update),
  list,
};
