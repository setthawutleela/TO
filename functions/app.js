const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const crypto = require('crypto')
const mail = require('./mail')
const Encrypt = require('./cipher-iv')
const encrypt = new Encrypt()
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 8000


app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')))
app.use('/project', express.static(path.join(__dirname, '/public')))

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'public/Login.html'))
});

app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname,'public/homepage.html'))
});

app.get('/project/add', (req, res) => {
    res.sendFile(path.join(__dirname,'public/addProject.html'))
});

app.get('/project/access', (req, res) => {
    res.sendFile(path.join(__dirname,'public/projectDashboard.html'))
});

app.get('/project/team-management', (req, res) => {
    res.sendFile(path.join(__dirname,'public/projectTeam.html'))
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname,'public/profile.html'))
});

app.get('/report', (req, res) => {
    res.sendFile(path.join(__dirname,'public/report.html'))
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname,'public/forgotPassword.html'))
});

app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname,'public/resetPassword.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'public/Register.html'))
});

app.get('/register-done', (req, res) => {
    res.sendFile(path.join(__dirname,'public/RegisterDone.html'))
});

app.get('/gocheckyouremail', (req, res) => {
    res.sendFile(path.join(__dirname,'public/gocheckyouremail.html'))
});

const HOST = 'http://localhost:8000'
app.post('/forgotPassword', (req, res) => {
    // console.log(req.body)
    const email = req.body
    console.log(email)
    //emailMd5 = email
    // let emailMd5 = crypto.createHash('md5').update(email).digest("hex")

    //console.log("This in fotgotpassword email")
    // console.log(sess)
    // console.log(email)
    const key = encrypt.encrypt({
        email
    })
    console.log("key is", key)
    const link = HOST + '/resetPassword?key=' + key
    const header = {
        to: email,
        from: 'info@to.co.th',
        text: link,
        subject: 'Reset Password on Team Organizing'
    }
    mail(header)
    res.redirect('/gocheckyouremail')
})



app.get('/resetPassword', (req, res) => {
    try{
        // console.log("If email print it is global now")
        // console.log(sess)
        const key = req.query.key
        console.log(key)
       // console.log(key)
        const decrypt = encrypt.decrypt(key)
        //console.log(decrypt)
        //console.log('user cookie', req.cookies)
        // req.cookies.email = decrypt.email
        res.cookie('email', decrypt.email)
       // res.send(JSON.stringify(sess))
        //res.render(__dirname + "/resetPassword.html", {sess:sess});
        res.redirect('/reset-password')
        //res.send({sess : , redirect_path: '/resetPassword.html'});
    } catch (err) {
        res.send('Key not valid, Please try again')
    }
})

app.listen(port, () => {
    console.log(`Server started on port ${port}!`)
})
