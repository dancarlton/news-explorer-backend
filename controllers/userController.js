const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/Users')

const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

// POST /users/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new BadRequestError('Email and password required!')
    }
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid email or password')
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    })

    res.status(200).json(user, token)
  } catch (err) {
    console.error('Could not find user credentials:', err.message)
    next(err)
  }
}

// POST /users/register
exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body
    if (!userName || !email || !password) {
      throw new BadRequestError('All fields required')
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('User already exists!', email)
      throw new ConflictError('User already exists!')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ userName, email, password: hashedPassword })

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    })

    res.status(200).json(user, token)
  } catch (err) {
    console.error('Register error:', err.message)
    next(err)
  }
}

// GET /users/me
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    res.status(200).json(user)
  } catch (err) {
    console.error('Could not get user', err.message)
    next(err)
  }
}

// GET /users/saved-articles
exports.getArticles = async (req, res, next) => {
  try {
  } catch (err) {}
}

// PUT /users/saved-articles
exports.saveArticles = async (req, res, next) => {
  try {
  } catch (err) {}
}

// DELETE /users/saved-articles
