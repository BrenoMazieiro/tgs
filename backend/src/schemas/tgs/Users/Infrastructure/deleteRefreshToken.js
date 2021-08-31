const deleteRefreshToken = (ctx, userId) => (
  ctx.db
    .knex('tokens as t')
    .where('t.user_id', '=', userId)
    .del()
    .then(() => null)
    .catch((error) => {
      const errorObj = {
        msg: error.message,
        hint: error.hint,
      }
      ctx.core.errorHandling('deleteRefreshToken: There was an error in the database', 'database_error', errorObj)
    })
)

export default deleteRefreshToken
