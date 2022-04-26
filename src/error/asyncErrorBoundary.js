function asyncErrorBoundary(delegate, defaultStatus) {
  return (req, res, next) => {
    //make new middleware funtion
    Promise.resolve() //makes promise
      .then(() => delegate(req, res, next)) //calls passed in function
      .catch((error) => {
        //handle errors
        const {
          status = defaultStatus, //set default status
          message = `this is the error code ${error.message}`, //set default message
        } = error;
        next({
          status,
          message,
        }); //send data to error handler
      });
  };
}

module.exports = asyncErrorBoundary;
