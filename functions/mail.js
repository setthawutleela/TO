const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxd46b069afe604da28803fca0368fec63.mailgun.org'
const mg = mailgun({
    apiKey: '8c94baae13f88555fd164fe592b9f283-09001d55-71e2ecf1',
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