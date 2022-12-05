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

exports.findUserByEmail = async (email) => {
    try {
        return await User.findOne({email: email});
    } catch(err) {
        console.log(err);
    }
}