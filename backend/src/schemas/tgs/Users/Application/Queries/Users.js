import readUsers from '../../Infrastructure/readUsers.js'

const Users = (_, params, ctx) => readUsers(ctx, params)

export default Users
