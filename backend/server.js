require("dotenv").config();
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const { connectRedis } = require('./src/config/redis');
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    connectDB().then(() => {
        connectRedis().then(() => {
            console.log(`Server is running: http://localhost:${port}`);
        }).catch(err => {
            console.error('Failed to connect to the Redis:', err);
        })
    }).catch(err => {
            console.error('Failed to connect to the database:', err);
        })
});