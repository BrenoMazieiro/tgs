import createRefreshToken from '../../Infrastructure/createRefreshToken.js'
import deleteRefreshToken from '../../Infrastructure/deleteRefreshToken.js'
import getUserbyApprovalToken from '../../Infrastructure/getUserbyApprovalToken.js'
import validateUser from '../../Infrastructure/validateUser.js'

const ValidateUser = async (_, { approvalToken }, ctx) => {
  const user = await getUserbyApprovalToken(ctx, approvalToken)
  if (!user) {
    ctx.core.errorHandling('Invalid approval token', 'invalid_approval_token')
  }
  const newRefreshToken = ctx.core.encrypt.weak.encrypt(
    ctx.core.encrypt.weak.encrypt(
      ctx.core.encrypt.randonDataForRefreshToken(ctx, user.id),
    ),
  )

  const isValid = await validateUser(ctx, user)
  if (!isValid) {
    ctx.core.errorHandling('Invalid user', 'invalid_user')
  }

  await deleteRefreshToken(ctx, user.id)
  await createRefreshToken(ctx, { ...user, refreshToken: newRefreshToken })
  return {
    refreshToken: newRefreshToken,
    token: (
      ctx.core.createToken(
        {
          userData: {
            id: user.id,
            isValid: true,
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

export default ValidateUser
