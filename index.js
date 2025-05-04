const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const connection = require("./db/connection")
const productRouter = require("./routes/product.route")
const app = express()

app.use(bodyParser.json())
app.get("/",(req,res)=>[
    res.end("application is running")
])

app.get("/product",productRouter)

app.use((req,res)=>{
    `<html>
    <head><title>404</title>
    <body>
    <h1>Page not found</h1>
    </body>
    </html>`
})


app.listen(7858,()=>console.log("server is running on 7858"))