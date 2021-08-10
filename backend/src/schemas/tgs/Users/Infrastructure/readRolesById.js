const readRolesById = (ctx, id) => {
  const sql = (
    ctx.db.knex('roles as r')
      .select(
        'r.id as _id',
        'r.name as _name',
        'r.code as _code',
      )
      .where('r.id', '=', id)
  )

  return (
    ctx.db.knexnest(sql)
      .then((result) => result[0] || null)
      .catch((error) => {
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        ctx.core.errorHandling('readRolesById: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export { readRolesById }
