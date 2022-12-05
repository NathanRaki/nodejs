const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://raki:4079871724@cluster0.v1izjbg.mongodb.net/wiki",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (err) {
                console.log("Could not connect to database: " + err);
            } else {
                console.log("Successfully connected to database.");
            }
        }
    );
};

exports.close = async () => {
    await mongoose.connection.close()
        .then(res => console.log("Successfully closed database connection."))
        .catch(err => console.log("Could not close database connection: " + err));
}