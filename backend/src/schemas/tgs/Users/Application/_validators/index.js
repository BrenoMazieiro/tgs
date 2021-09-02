const UserRules = [
  { key: 'name', test: 'length:2:150' },
  { key: 'picture', test: 'length:2:150' },
  { key: 'email', test: 'email' },
  { key: 'username', test: 'length:2:150' },
  { key: 'password', test: 'length:2:150' },
]

const validators = (ctx, params) => {
  ctx.core.validation(params, UserRules)
  return true
}

export default validators
