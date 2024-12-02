const { MongoClient } = require('mongodb')

const uri = "mongodb://mongoadmin:mongoadmin@localhost:27017/testemongodb2";

const client = new MongoClient(uri)

async function  run() {
    try{
        await client.connect()
        console.log("conectando ao mongo db");
        
    } catch{
        console.log(err)
    }
}

run()

module.exports = client