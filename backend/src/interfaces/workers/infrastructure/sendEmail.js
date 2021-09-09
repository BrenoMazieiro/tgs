import { removeEmailFromQueue } from './removeEmailFromQueue.js'

const sendEmail = async (ctx, user, queueId) => {
  const msg = ctx.core.email.templates.userRegistrationEmailTemplate(user.email, user.approvalToken)
  const sent = await ctx.core.email.emailSender(msg)
  if (sent) {
    await removeEmailFromQueue(ctx, queueId)
    return true
  }
  return false
}

export { sendEmail }
