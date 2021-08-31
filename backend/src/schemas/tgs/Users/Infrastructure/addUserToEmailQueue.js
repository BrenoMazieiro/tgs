const addUserToEmailQueue = (ctx, userId, type) => (
  ctx.db.knex('queueemails')
    .insert({
      user_id: userId,
      type,
      created_by: userId,
      updated_by: userId,
    }, 'id')
    .then((data) => (data && data[0] ? data[0] : null))
    .catch((error) => {
      const errorObj = {
        msg: error.message,
        hint: error.hint,
      }
      ctx.core.errorHandling('addUserToEmailQueue: There was an error in the database', 'database_error', errorObj)
    })

)

export default addUserToEmailQueue
