const getEmailsInQueue = (ctx) => {
  const sql = (
    ctx.db
      .knex('queueemails as q')
      .select(
        'q.id as _id',
        'q.user_id as _userId',
      )
      .where('q.type', '=', 'approval_token')
      .whereNull('q.deleted_at')
      .limit(10)
  )
  return (
    ctx.db
      .knexnest(sql)
      .then((emailsInQueue) => emailsInQueue || false)
      .catch((error) => {
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        console.log('getEmailsInQueue: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export { getEmailsInQueue }
