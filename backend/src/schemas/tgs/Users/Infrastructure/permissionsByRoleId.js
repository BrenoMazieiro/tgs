const permissionsByRoleId = (ctx, id) => {
  const sql = (
    ctx.db.knex('role_permissions as rp')
      .select(
        'p.id as _id',
        'p.code as _code',
        'p.description as _description',
        'p.deleted_at as _isDeleted',
      )
      .join('permissions as p', 'p.id', '=', 'rp.permission_id')
      .where('rp.role_id', id)
  )

  return (
    ctx.db.knexnest(sql)
      .then((result) => result)
      .catch((error) => {
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        ctx.core.errorHandling('permissionsByRoleId: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export { permissionsByRoleId }
