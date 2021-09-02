import addUserToEmailQueue from './addUserToEmailQueue.js'
import readRoleByCode from './readRoleByCode.js'
import readUserByUsername from './readUserByUsername.js'
import readUsers from './readUsers.js'

const createUser = async (ctx, userData) => {
  const user = await readUserByUsername(ctx, 'system')
  const role = await readRoleByCode(ctx, 'REGULAR')
  const {
    name,
    picture,
    email,
    username,
    password,
    approvalToken,
  } = userData
  return (
    ctx.db
      .knex('users as u')
      .insert({
        name,
        picture,
        email,
        username,
        password: ctx.core.encrypt.strong.encrypt(password),
        approval_token: approvalToken,
        role_id: role.id,
        created_by: user.id,
        updated_by: user.id,
      }, 'id')
      .then((result) => {
        if (!result.length) {
          return []
        }
        addUserToEmailQueue(ctx, result[0], 'approval_token')
        return readUsers(ctx, { id: result[0] })
      })
      .catch((error) => {
        if (error.constraint === 'users_email_unique') {
          ctx.core.errorHandling('createUser: There is already a user with this email!', 'users_email_unique')
        }
        if (error.constraint === 'users_username_unique') {
          ctx.core.errorHandling('createUser: There is already a user with this username!', 'users_username_unique')
        }
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        ctx.core.errorHandling('createUser: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export default createUser
