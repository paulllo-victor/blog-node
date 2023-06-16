const express = require("express")
const bodyParser = require("body-parser");
const connection = require("./database/database")
const app = express();
app.set('view engine','ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

const Article = require("./articles/Article")
const Category = require("./categories/Category")


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
    Article.findAll({
        order: [
            ["id","DESC"]
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index",{articles,categories})
        })
    })
    
});

app.get("/:slug", (req,res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article",{article,categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    })
})

app.get("/category/:slug",(req,res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles,categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    })
})

app.listen(8080,()=>{
    console.log("servidor ON");
})