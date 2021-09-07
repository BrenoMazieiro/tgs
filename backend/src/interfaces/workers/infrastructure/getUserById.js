const getUserById = (ctx, userId) => {
  const sql = (
    ctx.db.knex('users as u')
      .select(
        'u.id as _id',
        'u.name as _name',
        'u.email as _email',
        'u.approval_token as _approvalToken',
        'u.deleted_at as _isDeleted',
      )
      .where('u.id', '=', userId)
      .whereNull('u.deleted_at')
  )

  return (
    ctx.db.knexnest(sql)
      .then((result) => (result ? result[0] : false))
      .catch((error) => {
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        ctx.core.errorHandling('getUserById: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export { getUserById }
