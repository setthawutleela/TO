const crypto = require('crypto')

const algorithm = 'aes-192-cbc'
const privateKey = 'softendsofunna'
const salt = 'saltsoftensalt'

const key = crypto.scryptSync(privateKey, salt, 24)
const iv = Buffer.alloc(16,0)

class Encrypt{
    encrypt(msg = {}){
        msg = JSON.stringify(msg)
        const key = crypto.scryptSync(privateKey, salt, 24)
        const iv = Buffer.alloc(16,0)
        const cipher = crypto.createCipheriv(algorithm, key, iv)
        let encrypted = cipher.update(msg, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        return encrypted
    }

    decrypt(encrypted = ''){
        const decipher = crypto.createDecipheriv(algorithm, key, iv)
        let decrypted = decipher.update(encrypted, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        const parse = JSON.parse(decrypted)
        return parse
    }
}

module.exports = Encrypt