import createRefreshToken from '../../Infrastructure/createRefreshToken.js'
import deleteRefreshToken from '../../Infrastructure/deleteRefreshToken.js'
import getUserByUsername from '../../Infrastructure/getUserByUsername.js'

const UserSignin = async (_, { username, password }, ctx) => {
  const user = await getUserByUsername(ctx, username)
  if (!user || !user.id) {
    ctx.core.errorHandling('Invalid username or password!', 'invalid_username_or_password')
  }
  const passCompare = await ctx.core.encrypt.strong.compare(password, user.password)
  if (!passCompare) {
    ctx.core.errorHandling('Invalid username or password!', 'invalid_username_or_password')
  }
  const refreshToken = ctx.core.encrypt.weak.encrypt(
    ctx.core.encrypt.weak.encrypt(
      ctx.core.encrypt.randonDataForRefreshToken(ctx, user.id),
    ),
  )

  await deleteRefreshToken(ctx, user.id)
  await createRefreshToken(ctx, { ...user, refreshToken })
  return {
    refreshToken,
    token: (
      ctx.core.createToken(
        {
          userData: {
            id: user.id,
            isValid: !user.approvalToken,
            permission: (
              user.permissions
                ? user.permissions.flat().map((permission) => permission.code)
                : []
            ),
            sub: user.id,
            iss: process.env.JWT_ISS || 'nodejsAPI',
            aud: process.env.JWT_AUD || 'theGodStack',
          },
        },
      )
    ),
  }
}

export default UserSignin