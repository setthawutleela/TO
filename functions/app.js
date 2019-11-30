const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const crypto = require('crypto')

const mail = require('./mail')
const Encrypt = require('./cipher-iv')
const encrypt = new Encrypt()

// const session = require('express-session')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser())
app.use(cookieParser())

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname,'../test.html'))
});


const HOST = 'http://localhost:3000'
app.post('/forgotPassword', (req, res) => {
    //console.log(req.body)
    const { email } = req.body
    //emailMd5 = email
    let emailMd5 = crypto.createHash('md5').update(email).digest("hex")
    sess = email
    //console.log("This in fotgotpassword email")
    // console.log(sess)
    // console.log(email)
    const key = encrypt.encrypt({
        email
    })
    const link = HOST + '/resetPassword?key=' + key
    const header = {
        to: email,
        from: 'info@to.co.th',
        text: link,
        subject: 'Reset Password on Team Organizing'
    }
    mail(header)
    res.redirect('/gocheckyouremail.html')
})



app.get('/resetPassword', (req, res) => {
    try{
        // console.log("If email print it is global now")
        // console.log(sess)
        const key = req.query.key
       // console.log(key)
        const decrypt = encrypt.decrypt(key)
        //console.log(decrypt)
        //console.log('user cookie', req.cookies)
        // req.cookies.email = decrypt.email
        res.cookie('email', decrypt.email)
       // res.send(JSON.stringify(sess))
        //res.render(__dirname + "/resetPassword.html", {sess:sess});
        res.redirect('/resetPassword.html')
        //res.send({sess : , redirect_path: '/resetPassword.html'});
    } catch (err) {
        res.send('Key not valid, Please try again')
    }
})

app.get('/userReport', (req, res) => {
    res.redirect('userReport.html')
})

app.listen(port, () => {
    console.log(`Server started on port ${port}!`)
})