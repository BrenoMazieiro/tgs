import readUsers from "../../Infrastructure/readUsers.js"

const Users = (_, params, ctx) => {
  // authorize
  // validate
  // business logic
  return readUsers(ctx, params)
}

export default Users