import createRefreshToken from '../../Infrastructure/createRefreshToken.js'
import deleteRefreshToken from '../../Infrastructure/deleteRefreshToken.js'
import getUserbyRefreshToken from '../../Infrastructure/getUserbyRefreshToken.js'

const RefreshUserToken = async (_, { refreshToken }, ctx) => {
  const user = await getUserbyRefreshToken(ctx, refreshToken)
  if (!user) {
    ctx.core.errorHandling('Invalid refresh token', 'invalid_refresh_token')
  }
  const newRefreshToken = ctx.core.encrypt.weak.encrypt(
    ctx.core.encrypt.weak.encrypt(
      ctx.core.encrypt.randonDataForRefreshToken(ctx, user.id),
    ),
  )

  await deleteRefreshToken(ctx, user.id)
  await createRefreshToken(ctx, { ...user, refreshToken: newRefreshToken })
  return {
    refreshToken: newRefreshToken,
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

export default RefreshUserToken
