const getSystemUserId = (ctx) => {
  const sql = (
    ctx.db
      .knex('users as u')
      .select('u.id as _id')
      .where('u.name', '=', 'system')
  )
  return (
    ctx.db
      .knexnest(sql)
      .then((result) => (result ? result[0] : false))
      .catch((error) => {
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        console.log('getSystemUserId: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export { getSystemUserId }
