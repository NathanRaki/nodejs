const Article = require(__dirname + "/../models/Article");

exports.getAllArticles = async () => {
    try {
        return await Article.find();
    } catch(err) {
        console.log(err);
    }
}

exports.getArticleById = async (id) => {
    try {
        return await Article.findOne({_id:id});
    } catch(err) {
        console.log(err);
    }
}

exports.getArticleByUri = async (uri) => {
    try {
        return await Article.findOne({uri:uri});
    } catch(err) {
        console.log(err);
    }
}

exports.addArticle = async (article) => {
    try {
        return await Article.create(article);
    } catch(err) {
        console.log(err);
    }
}
