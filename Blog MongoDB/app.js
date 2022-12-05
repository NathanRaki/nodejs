const express = require('express');
const _ = require('lodash');
const app = express();

const db = require(__dirname + "/database");
const Article = require(__dirname + "/services/articleService");

const homeStartingContent = "We are dedicated to providing high-quality products and services to our customers. With years of experience, we are committed to offering the best possible solutions for all your needs. Our team is composed of experienced professionals who are passionate about delivering the best possible results. ";
const aboutContent = "Welcome to Raki Journal, your one-stop destination for all your online shopping needs! We specialize in providing the latest and greatest products at unbeatable prices. We strive to make shopping with us the most convenient and enjoyable experience possible, with our fast and easy checkout process and free shipping on all orders. Our curated selection of products includes everything from the latest fashion and home decor trends to electronics and accessories, so you can find exactly what you’re looking for. With our dedicated customer service team available to answer any questions you may have, you can rest assured that you’ll be taken care of when you shop with us. Thanks for visiting, and happy shopping!";
const contactContent = "Thank you for visiting our website. If you have any questions or comments, please don't hesitate to contact us. We look forward to hearing from you!";

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

db.connect();

app.get("/", async (req, res) => {
    const articles = await Article.getAllArticles();
    res.render('home', { content: homeStartingContent, articles: articles });
});

app.get("/posts/:uri", async (req, res) => {
    const formattedUri = formatToUri(req.params.uri);
    if (req.params.uri !== formattedUri) {
        res.redirect("/posts/" + formattedUri);
        return;
    }
    const article = await Article.getArticleByUri(formattedUri);
    if (article) {
        res.render('post', { article: article });
    } else {
        res.redirect("/");
    }
});

app.get("/about", (req, res) => {
    res.render('about', { content: aboutContent });
});

app.get("/contact", (req, res) => {
    res.render('contact', { content: contactContent });
});

app.get("/compose", (req, res) => {
    res.render('compose');
});

app.post("/compose", async (req, res) => {
    const article = {
        title: req.body.articleTitle,
        body: req.body.articleBody,
        uri: formatToUri(req.body.articleTitle)
    }
    await Article.addArticle(article);
    res.redirect("/");
});

app.get("/:blabla", (req, res) => {
    res.redirect("/");
});

function formatToUri(s) {
    return _.kebabCase(s);
}

app.listen(4000, () => {
    console.log("Server is running on port 4000.");
});