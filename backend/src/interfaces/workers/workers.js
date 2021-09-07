/* eslint-disable no-console */
import { sendEmailToNewUser } from './executors/sendEmailToNewUser.js'
import { shared } from '../../shared/index.js'
import { getSystemUserId } from './infrastructure/getSystemUserId.js'

export const workers = {}

let interval = null

workers.sendEmailToNewUser = async (ctx) => {
  sendEmailToNewUser(ctx)
}

workers.whenAgain = (minutes, type) => {
  console.log('\x1b[33m%s\x1b[0m', `[${new Date()}] INFO: Waiting ${minutes} minute(s) to do ${type} again...`)
}

workers.init = async () => {
  const user = await getSystemUserId(shared)
  if (!user) {
    console.log('\x1b[31m%s\x1b[0m', `[${new Date()}] 🤖 Error: Could not found system user!`)
    return false
  }
  const ctx = {
    ...shared,
    user,
  }
  console.log('\x1b[36m%s\x1b[0m', `[${new Date()}] 🤖 INFO: Workers initialized!`)

  interval = setInterval(() => {
    workers.sendEmailToNewUser(ctx)
    workers.whenAgain(0.25, 'send emails')
  }, 15000)
  return true
}

workers.stop = async () => {
  clearInterval(interval)
  console.log('\x1b[33m%s\x1b[0m', `[${new Date()}] 🤖 INFO: Workers stopped!`)
}
