const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const db = require(__dirname + '/database');
const Article = require(__dirname + '/services/articleService');

db.connect();

app.get("/", (req, res) => {
    res.send("/articles : Wiki API")
});

app.route("/articles")
    .get(async (req, res) => {
        const articles = await Article.getAllArticles();
        res.send(articles);
    })
    .post(async (req, res) => {
        const article = {
            title: req.body.title,
            content: req.body.content
        };
        await Article.createArticle(article);
        res.sendStatus(200);
    })
    .delete(async (req, res) => {
        await Article.deleteAllArticles();
        res.sendStatus(200);
    });

app.route("/articles/:articleId")
    .get(async (req, res) => {
        const article = await Article.getArticleById(req.params.articleId);
        if (article)
            res.send(article);
        else
            res.send("Could not find article matching id " + req.params.articleId);
    })
    .put(async (req, res) => {
        await Article.overwriteArticleById(req.params.articleId, {
            title: req.body.title,
            content: req.body.content
        });
        res.sendStatus(200);
    })
    .patch(async (req, res) => {
        await Article.updateArticleById(req.params.articleId, req.body);
        res.sendStatus(200);
    })
    .delete(async (req, res) => {
        await Article.deleteArticleById(req.params.articleId);
        res.sendStatus(200);
    });

app.listen(4000, () => {
    console.log('Server listening on port 4000.');
});

process.on('SIGINT', () => db.close());