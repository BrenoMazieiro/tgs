const readRoleByCode = (ctx, code) => {
  const sql = (
    ctx.db
      .knex('roles as r')
      .select(
        'r.id as _id',
        'r.name as _name',
        'r.code as _code',
      )
      .where('r.code', '=', code)
  )
  return (
    ctx.db
      .knexnest(sql)
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

export default readRoleByCode
