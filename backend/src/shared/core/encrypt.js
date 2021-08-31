import bcrypt from 'bcrypt'
import crypto from 'crypto'

const encrypt = {
  strong: {
    encrypt: (pass) => bcrypt.hashSync(pass, 10),
    compare: (plainPass, hashedPass) => bcrypt.compare(plainPass, hashedPass),
  },
  weak: {
    encrypt: (data) => crypto.createHmac('sha256', process.env.HASH_SECRET || 'theGodStack').update(data).digest('hex'),
  },
  randon: () => crypto.randomInt(99999999999999),
  randonDataForRefreshToken: (ctx, userId) => userId + ctx.core.encrypt.randon() + Date.now(),
}

export { encrypt }
