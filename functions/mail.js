const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxfca6dfc209884c219341193f69ec0f89.mailgun.org'
const mg = mailgun({
    apiKey: 'b79bc3eb849c9e969bc960bd3eef707b-e470a504-80f5829b',
    domain: DOMAIN
})

module.exports = (header = {
    from: '',
    to: '',
    subject: '',
    text: ''
}) => {
    mg.messages().send(header, (err, body) => {
        if(err) throw new Error(err)
        console.log('Sending email to', header.to)
        return body
    })
}