const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/Users')

const UnauthorizedError = '../errors/UnauthorizedError.js'
const BadRequestError = '../errors/BadRequestError.js'
const ConflictError = '../errors/ConflictError.js'

// POST /users/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new BadRequestError('Email and password required!')
    }
    const user = await User.findOne({email})
    if (!user)

  } catch {}
}

// POST /users/register
exports.register = async (req, res, next) => {
    try {
        const {userName, email , password } = req.body
        if (!userName || !email || !password) {
            throw new BadRequestError('All fields required')
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log('User already exists!', email)
            throw new ConflictError('User already exists!')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({userName, email, hashedPassword})

        const token = jwt.sign(userName._id, {
            expiresIn: '7d'
        })

        res.status(200).json(user, token)
    } catch (err) {
        console.error('Register error:', err.message)
        next(err)
    }
}

// GET /users/me

// PATCH /users/me
// update

// GET /users/saved-articles

// PUT /users/saved-articles

// DELETE /users/saved-articles
