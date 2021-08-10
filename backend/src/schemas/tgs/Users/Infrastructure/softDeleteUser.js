import readUsers from './readUsers.js'

const softDeleteUser = async (ctx, userId) => (
  ctx.db
    .knex('users as u')
    .update({
      deleted_at: ctx.db.knex.fn.now(),
      deleted_by: userId,
    }, 'id')
    .where('u.id', '=', userId)
    .then((result) => {
      if (!result.length) {
        return []
      }
      return readUsers(ctx, { id: result[0] })
    })
    .catch((error) => {
      const errorObj = {
        msg: error.message,
        hint: error.hint,
      }
      ctx.core.errorHandling('softDeleteUser: There was an error in the database', 'database_error', errorObj)
    })
)

export default softDeleteUser
