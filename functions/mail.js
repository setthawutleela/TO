const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox5687cb11ed3047719727627ff40829ad.mailgun.org'
const mg = mailgun({
    apiKey: '71f6b4b16573d32dd0d0800b16491703-e470a504-dfe9736d',
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