const mongoose = require('mongoose');

run().catch(console.dir);
async function run() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/fruitsDB')
            .then(response => {
                console.log("Connection started");
            })
            .catch(error => {
                console.log(error);
            })

        const fruitSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                min: [1, "Why being so mean ?"],
                max: 10
            },
            review: String
        })

        const Fruit = new mongoose.model('Fruit', fruitSchema);

        const apple = new Fruit({
            name: 'Apple',
            rating: 7,
            review: 'Great!'
        });

        const kiwi = new Fruit({
            name: 'Kiwi',
            rating: 10,
            review: 'Best fruit ever!'
        });

        const orange = new Fruit({
            name: 'Orange',
            rating: 4,
            review: 'Overrated...'
        });

        const banana = new Fruit({
            name: 'Banana',
            rating: 5,
            review: 'Depends on maturity :/'
        });

        const pineapple = new Fruit({
            name: "Pineapple",
            rating: 8,
            review: "Great fruit"
        });

        const mango = new Fruit({
            name: "Mango",
            rating: 10,
            review: "Never seen better"
        });

        // Bulk Insert
        await Fruit.insertMany([apple, kiwi, orange, banana, pineapple, mango])
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                throw error;
            })

        await Fruit.find({}).then(response => {
            response.forEach(fruit => console.log(fruit.name));
        });

        /*await Fruit.updateOne({_id: "638b6af05da5c82776c54a7b"}, {rating: 1}, { runValidators: true })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })*/

        /*await Fruit.deleteOne({_id: "638b6af05da5c82776c54a7c"})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });*/

        const personSchema = new mongoose.Schema({
            name: String,
            age: Number,
            favoriteFruit: fruitSchema
        });

        const Person = new mongoose.model('Persons', personSchema);

        const amy = new Person({
            name: 'Amy',
            age: 12,
            favoriteFruit: pineapple
        });
        await amy.save();

        const john = new Person({
            name: 'John',
            age: 37,
            favoriteFruit: mango
        });
        await john.save();

    } catch {
        console.log("Error");
    } finally {
        await mongoose.connection.close()
            .then(response => {
                console.log("Connection closed");
            });
    }
}