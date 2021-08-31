const validateUser = (ctx, user) => (
  ctx.db.knex('users as u')
    .update({
      approval_token: null,
      updated_by: user.id,
    }, 'id')
    .where('u.id', user.id)
    .then((data) => !!data[0])
    .catch((error) => {
      const errorObj = {
        msg: error.message,
        hint: error.hint,
      }
      ctx.core.errorHandling('validateUser: There was an error in the database', 'database_error', errorObj)
    })

)

export default validateUser
