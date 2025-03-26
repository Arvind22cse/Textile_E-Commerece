const handleMalformedJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ 
      status: "error", 
      message: err.message,
    });
  }
  next();
};

module.exports = {
  handleMalformedJson,
};
