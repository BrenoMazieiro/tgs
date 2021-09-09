import { userRegistrationEmailTemplate } from './templates/index.js'
import { emailSender } from './sendgrid.js'

const email = {
  templates: {
    userRegistrationEmailTemplate,
  },
  emailSender,
}

export { email }
