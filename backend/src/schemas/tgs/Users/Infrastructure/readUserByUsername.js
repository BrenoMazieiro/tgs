const readUserByUsername = (ctx, username) => {
  const sql = (
    ctx.db.knex('users as u')
      .select(
        'u.id as _id',
        'u.name as _name',
        'u.email as _email',
        'u.picture as _picture',
        'u.username as _username',
        'u.role_id as _roleId',
        'u.deleted_at as _isDeleted',
      )
      .where('u.username', '=', username)
  )

  return (
    ctx.db.knexnest(sql)
      .then((result) => result[0] || [])
      .catch((error) => {
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        ctx.core.errorHandling('readUserByUsername: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export default readUserByUsername
