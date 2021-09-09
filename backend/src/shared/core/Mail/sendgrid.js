import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const emailSender = async (msg) => {
  try {
    await sgMail.send(msg)
    return true
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', `[${new Date()}] 🤖 Error: Could not send Emails! ${error.response.body.errors[0].message}`)
    return false
  }
}

export { emailSender }
