const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://0.0.0.0:27017/shop";
const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('shop');
        const products = database.collection('products');

/* ===== FIND OPERATIONS ===== */
        // Query for a product that has the name 'Pen'
        /*const query = { name: 'Ruler' };
        const product = await products.findOne(query);
        console.log(product);*/

        const cursor = products.find({});
        await cursor.forEach(console.dir);

/* ===== INSERT OPERATIONS ===== */
        // Create a document to insert
        const doc = {
            _id: 4,
            name: 'Ruler',
            price: 1.10,
            stock: 24,
            reviews: [
                {
                    authorName: 'Brian',
                    rating: 4,
                    review: "Regular ruler, nothing to say."
                }
            ]
        }
        /*const result = await products.insertOne(doc);
        console.log(`Document was inserted with the _id: ${result.insertedId}`);*/

/* ===== UPDATE OPERATIONS ===== */
        // Create a filter for a product to update
        const filter = { _id: 4 };

        // This option instructs the method to create a document if no documents match the filter
        const options = { upsert: true };

        // Create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                price: 2.10
            },
        };

        /*const result = await products.updateOne(filter, updateDoc, options);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);*/

/* ===== DELETE OPERATIONS ===== */
        // Query for a product that has the name 'Ruler'
        const ruler = { name: 'Ruler' };
        /*const result = await products.deleteOne(ruler);
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }*/

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);