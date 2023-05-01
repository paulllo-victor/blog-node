const express = require("express")
const bpdyParser = require("body-parser");
const bodyParser = require("body-parser");
const connection = require("./database/database")
const app = express();
app.set('view engine','ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

connection
.authenticate()
.then(() => {
    console.log("conectado");
}).catch(()=>{
    console.log("error ao conectar");
})
        
app.use("/",categoriesController)
app.use("/",articlesController)

app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(8080,()=>{
    console.log("servidor ON");
})