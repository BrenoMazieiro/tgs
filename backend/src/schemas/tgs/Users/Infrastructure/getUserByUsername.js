const getUserByUsername = (ctx, username) => {
  const sql = (
    ctx.db
      .knex('users as u')
      .select(
        'u.id as _id',
        'u.password as _password',
        'u.approval_token as _approvalToken',
        'p.code as _permissions__code',
      )
      .leftJoin('roles as r', 'r.id', '=', 'u.role_id')
      .leftJoin('role_permissions as rp', 'r.id', '=', 'rp.role_id')
      .leftJoin('permissions as p', 'p.id', '=', 'rp.permission_id')
      .whereNull('u.deleted_at')
      .andWhere('u.username', '=', username)
  )

  return (
    ctx.db
      .knexnest(sql)
      .then((data) => (data && data[0] ? data[0] : null))
      .catch((error) => {
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        ctx.core.errorHandling('getUserByUsername: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export default getUserByUsername
