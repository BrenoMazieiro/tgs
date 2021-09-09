import { getEmailsInQueue } from '../infrastructure/getEmailsInQueue.js'
import { getUserById } from '../infrastructure/getUserById.js'
import { sendEmail } from '../infrastructure/sendEmail.js'

const sendEmailToNewUser = async (ctx) => {
  const emailsInQueue = await getEmailsInQueue(ctx)
  if (!emailsInQueue) {
    console.log('\x1b[33m%s\x1b[0m', `[${new Date()}] INFO: There is no email to send, maybe next time!`)
    return false
  }
  emailsInQueue.map(async (emailInQueue) => {
    const user = await getUserById(ctx, emailInQueue.userId)
    if (!user) {
      console.log('\x1b[31m%s\x1b[0m', `[${new Date()}] 🤖 Error: Could not found user with id ${emailInQueue.userId}!`)
      return false
    }
    await sendEmail(ctx, user, emailInQueue.id)
    return true
  })

  return true
}

export { sendEmailToNewUser }
