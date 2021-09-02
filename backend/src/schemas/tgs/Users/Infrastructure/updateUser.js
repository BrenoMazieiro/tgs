import readUsers from './readUsers.js'

const updateUser = async (ctx, userId, userData) => {
  const {
    name,
    picture,
    email,
    username,
    password,
  } = userData
  return (
    ctx.db
      .knex('users as u')
      .update({
        name,
        picture,
        email,
        username,
        password: ctx.core.encrypt.strong.encrypt(password),
        updated_by: userId,
      }, 'id')
      .where('u.id', '=', userId)
      .then((result) => {
        if (!result.length) {
          return []
        }
        return readUsers(ctx, { id: result[0] })
      })
      .catch((error) => {
        if (error.constraint === 'users_email_unique') {
          ctx.core.errorHandling('updateUser: There is already a user with this email!', 'users_email_unique')
        }
        if (error.constraint === 'users_username_unique') {
          ctx.core.errorHandling('updateUser: There is already a user with this username!', 'users_username_unique')
        }
        const errorObj = {
          msg: error.message,
          hint: error.hint,
        }
        ctx.core.errorHandling('updateUser: There was an error in the database', 'database_error', errorObj)
      })
  )
}

export default updateUser
