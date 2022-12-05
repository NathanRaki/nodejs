const Article = require(__dirname + '/../models/Article');

exports.getAllArticles = async () => {
    try {
        return await Article.find();
    } catch(err) {
        console.log(err);
    }
}

exports.createArticle = async (article) => {
    try {
        return await Article.create(article);
    } catch(err) {
        console.log(err);
    }
}

exports.deleteAllArticles = async () => {
    try {
        return await Article.deleteMany();
    } catch(err) {
        console.log(err);
    }
}

exports.getArticleById = async (id) => {
    try {
        return await Article.findOne({_id: id});
    } catch(err) {
        console.log(err);
    }
}

exports.overwriteArticleById = async (id, updates) => {
    try {
        return await Article.findByIdAndUpdate(id, updates, { overwrite: true });
    } catch(err) {
        console.log(err);
    }
}

exports.updateArticleById = async (id, updates) => {
    try {
        return await Article.findByIdAndUpdate(id, updates);
    } catch(err) {
        console.log(err);
    }
}

exports.deleteArticleById = async (id) => {
    try {
        return await Article.deleteOne({_id:id});
    } catch(err) {
        console.log(err);
    }
}