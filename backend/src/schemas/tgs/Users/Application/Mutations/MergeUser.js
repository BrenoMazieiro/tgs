import createUser from '../../Infrastructure/createUser.js'
import hardDeleteUser from '../../Infrastructure/hardDeleteUser.js'
import softDeleteUser from '../../Infrastructure/softDeleteUser.js'
import updateUser from '../../Infrastructure/updateUser.js'
import validator from '../_validators/index.js'

const MergeUser = (_, { id, deleteIt, userData }, ctx) => {
  if (!deleteIt) {
    if (id) {
      ctx.core.authorization(ctx, 'usr_u', id)
      validator(ctx, userData)
      return updateUser(ctx, id, userData)
    }

    const approvalToken = ctx.core.encrypt.weak.encrypt(userData.email)
    validator(ctx, userData)
    return createUser(ctx, { ...userData, approvalToken })
  }

  if (id) {
    ctx.core.authorization(ctx, 'usr_d', id)
    if (deleteIt === 'hard') {
      return hardDeleteUser(ctx, id)
    }
    return softDeleteUser(ctx, id)
  }
  ctx.core.errorHandling('MergeUser: You are trying to delete an user without Id', 'error_delete_user_without_id')
  return []
}

export default MergeUser
