const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}!`)
})

// app.use(express.static('publics'))
// app.use(express.static(path.join(__dirname, 'public')));

// const fakeDB = {
//     'willy': {
//         project: ['p001',
//                   'p002']
//     },
//     'pleum': {
//         project: ['p001']
//     }
// }

// app.get('/users', (req, res) => {
//     const allUsername = Object.keys(fakeDB)
//     console.log(allUsername)
//     res.send(allUsername)
// })

// app.get('/users/:userid', (req, res) => {
//     const nameToLookUp = req.params.userid
//     const val = fakeDB[nameToLookUp]
//     console.log(nameToLookUp, '->', val)
//     if (val){
//         res.send(val)
//     }
//     else {
//         res.send(false);
//     }
// })

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname,'../test.html'))
});