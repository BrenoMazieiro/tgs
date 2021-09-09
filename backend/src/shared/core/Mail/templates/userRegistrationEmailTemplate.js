const userRegistrationEmailTemplate = (to, approvalToken) => ({
  to,
  from: process.env.EMAIL_FROM,
  subject: 'Welcome to the GodStack!',
  text: `Your code is ${approvalToken}`,
  html: `<strong>Your code is ${approvalToken}</strong>`,
})

export { userRegistrationEmailTemplate }
