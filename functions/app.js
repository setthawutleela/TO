const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000


app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname,'../test.html'))
});