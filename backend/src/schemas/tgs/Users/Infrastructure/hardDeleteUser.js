const hardDeleteUser = (ctx, id) => (
  ctx.db
    .knex('users as u')
    .del()
    .where('u.id', id)
    .then(() => [])
    .catch((error) => {
      const errorObj = {
        msg: error.message,
        hint: error.hint,
      }
      ctx.core.errorHandling('hardDeleteUser: There was an error in the database', 'database_error', errorObj)
    })
)

export default hardDeleteUser
