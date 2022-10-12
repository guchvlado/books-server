const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const corsOptions = {
    origin: "http://localhost:8081"
}


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const db = require("./models")
db.sequelize.sync().then(r => {
    console.log("Есть коннект")
}).catch(err => {
    console.log(err.message)
})


app.get("/", (req, res) => {
    res.json({message: "Welcome to library"})
})


const PORT = process.env.PORT || 8080
require('./routes/book.routes')(app)
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT} port...`)
})