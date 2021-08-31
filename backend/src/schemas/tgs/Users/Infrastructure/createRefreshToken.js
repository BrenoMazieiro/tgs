const createRefreshToken = (ctx, user) => (
  ctx.db
    .knex('tokens as t')
    .insert({
      user_id: user.id,
      refresh_token: user.refreshToken,
      valid_until: (
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + process.env.REFRESHTOKEN_EXPIRE_IN_DAYS || 7,
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds(),
        )
      ),
      created_by: user.id,
      updated_by: user.id,
    }, 'id')
    .then((data) => data[0] || null)
    .catch((error) => {
      const errorObj = {
        msg: error.message,
        hint: error.hint,
      }
      ctx.core.errorHandling('createRefreshToken: There was an error in the database', 'database_error', errorObj)
    })

)

export default createRefreshToken
