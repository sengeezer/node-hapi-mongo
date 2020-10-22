// Credit: https://medium.com/@piotrkarpaa/handling-joi-validation-errors-in-hapi-17-26fc07448576

module.exports = function (request, h, err) {
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
      const invalidItem = err.details[0];
      
      return h.response(`Data Validation Error. Schema violation. <${invalidItem.path}> \nDetails: ${JSON.stringify(err.details)}`)
          .code(400)
          .takeover();
  }

  return h.response(err).takeover();
};
