var cors = require('cors')
var express = require('express')
const fileUpload = require('express-fileupload')

var app = express();
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use('/upload',express.static('uploads'))

// user api call
var user = require("./api/User")
app.use("/user",user)

var product = require("./api/Product")
app.use("/product",product)


const portno = 8080
app.listen(portno,()=>{
    console.log('server is running on ',{portno})
})