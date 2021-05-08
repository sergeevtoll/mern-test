const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req === 'OPTIONS') {
    return next()
  }
  try {
    const userId = req.headers.autorization.split(' ')[1]

    if (!userId) {
      return res.status(401).json({ message: 'нет авторизации' })
    }

    req.user = userId
    next()

  } catch (e) {
    console.log(e.message)
    res.status(401).json({ message: 'нет авторизации' })
  }
};
