const getUserbyApprovalToken = (ctx, approvalToken) => {
  const sql = (
    ctx.db.knex('users as u')
      .select(
        'u.id as _id',
        'u.approval_token as _approvalToken',
        'p.code as _permissions__code',
      )
      .leftJoin('roles as r', 'r.id', '=', 'u.role_id')
      .leftJoin('role_permissions as rp', 'rp.role_id', '=', 'r.id')
      .leftJoin('permissions as p', 'p.id', '=', 'rp.permission_id')
      .leftJoin('tokens as t', 't.user_id', '=', 'u.id')
      .whereNull('u.deleted_at')
      .andWhere('u.approval_token', '=', approvalToken)
  )
  return (
    ctx.db.knexnest(sql)
      .then((data) => (data && data[0] ? data[0] : null))
      .catch((error) => {
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        ctx.core.errorHandling('getUserbyApprovalToken: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export default getUserbyApprovalToken
