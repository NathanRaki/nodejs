const User = require(__dirname + '/../models/User');

exports.getAllUsers = async () => {
    try {
        return await User.find();
    } catch(err) {
        console.log(err);
    }
}

exports.createUser = async (user) => {
    try {
        return await User.create(user);
    } catch(err) {
        console.log(err);
    }
}

exports.getUserByEmail = async (email) => {
    try {
        return await User.findOne({email: email});
    } catch(err) {
        console.log(err);
    }
}

exports.getUserByFilter = async (filter) => {
    try {
        return await User.findOne(filter);
    } catch(err) {
        console.log(err);
    }
}

exports.getUsersByFilter = async (filter, projection = null) => {
    try {
        return await User.find(filter, projection);
    } catch(err) {
        console.log(err);
    }
}

exports.getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch(err) {
        console.log(err);
    }
}

exports.updateUser = async (id, update) => {
    try {
        return await User.findByIdAndUpdate(id, update);
    } catch(err) {
        console.log(err);
    }
}