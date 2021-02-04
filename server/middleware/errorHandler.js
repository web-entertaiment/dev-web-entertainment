const errorHandler = (err, req, res, next) => {

  let statusCode = 500
  let message = 'Internal Server Error'
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      statusCode = 400
      message = `${err.errors[0].value} already exist`
      break;
    case 'JsonWebTokenError':
      statusCode = 401
      message = err.msg
      break;
    case 'NotFoundError':
      statusCode = 404
      message = err.msg
      break;
    case 'SequelizeValidationError':
      let error = err.errors.map(el => { return el.message })
      statusCode = 400
      message = error
      break;
  }
  res.status(statusCode).json({ message })
}

module.exports = errorHandler