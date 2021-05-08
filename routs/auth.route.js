const { Router } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const { validationResult, body } = require('express-validator');

const router = Router();
///api/auth/register
router.post('/register',
  [
    body('email', "введите корректный email").isEmail(),
    body('password', 'неверный пароль').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: 'некоректные данные при регистрации'
        })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: "такой пользователь уже существует" })
      }

      const hashPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashPassword })
      await user.save()

      res.status(200).json({ message: 'пользоваьтель создан' })

    } catch (e) {
      console.log('reg----', e.message)
      res.status(500).json('что то пошло не так')
    }
  })

router.post('/login',
  [
    body('email', "введите корректный email").normalizeEmail().isEmail(),
    body('password', 'неверный пароль').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: 'некоректные данные при входу в систему'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        res.status(400).json({ message: 'пользователь не найден' })
      }

      const isMath = await bcrypt.compare(password, user.password)

      if (!isMath) {
        return res.status(400).json({ message: 'неверный пароль' })
      }

      res.json({  userId: user.id })

    } catch (e) {
      console.log('login----', e.message)
      res.status(500).json('что то пошло не так!')
    }
  });

module.exports = router;
