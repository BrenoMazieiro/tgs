import jwt from 'jsonwebtoken'

const createToken = (userData) => (
  jwt
    .sign(
      userData,
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN || '15m' },
    )
)

export { createToken }
