const removeEmailFromQueue = (ctx, queueId) => (
  ctx.db
    .knex('queueemails as q')
    .update({
      deleted_at: ctx.db.knex.fn.now(),
      deleted_by: ctx.user.id,
    })
    .where('q.id', '=', queueId)
    .then((result) => (!!result))
    .catch((error) => {
      const errorObj = {
        msg: error.message,
        hint: error.hint,
      }
      console.log('getUserById: There was an error in the database', 'database_error', errorObj)
      return false
    })
)

export { removeEmailFromQueue }
