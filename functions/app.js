const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser())

app.listen(port, () => {
    console.log(`Server started on port ${port}!`)
})

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname,'../test.html'))
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'../signup.html'))
});

app.get('/personalinfopage', (req, res) => {
    res.sendFile(path.join(__dirname,'../personalinfopage.html'))
});

app.get('/editinfo', (req, res) => {
    res.sendFile(path.join(__dirname,'../editinfo.html'))
});


app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname,'../signin.html'))
});

app.get('/transit', (req, res) => {
    res.sendFile(path.join(__dirname,'../transit.html'))
});