const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: 80,
    ed_mongo: {
        host: JSON.parse(process.env.MONGO_HOST),
        db: process.env.MONGO_DB,
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        options: {
            replicaSet: process.env.MONGO_REPLICA_SET,
            ssl: true,
            authSource: "admin",
            w: "majority"
        }
    }
}