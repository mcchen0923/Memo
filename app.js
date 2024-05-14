const express = require('express')
const app = express()
const memos = require('./routes/memos')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/memos',memos)

app.use(notFound)
app.use(errorHandlerMiddleware )
// app.get('/api/v1/memo')
// app.post('/api/v1/memo')
// app.get('/api/v1/memo/:id')
// app.patch('/api/v1/memo/:id')
// app.delete('/api/v1/memo/:id')

const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }catch (error){
        console.log(error)
    }
}

start()
