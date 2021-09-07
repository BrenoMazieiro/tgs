const sendEmail = (ctx, user) => {
  console.log(`Sending email to ${user.name} by ${ctx.user.id}`)
}

export { sendEmail }
