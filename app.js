const express = require('express');
const app = express();
const morgan = require('morgan')
const compression = require("compression");
const UserRouter = require('./routes/userRoute')


// middlewares
app.use(compression())
app.use(express.json())
app.use(morgan("tiny"));


// routes 
app.use('/users', UserRouter)

// port
const port = 5000

app.listen(port, async() => {
    try {
        console.log(`App is listening at port ${port}...`)
    } catch (error) {
        console.error(error.message)
    }
})