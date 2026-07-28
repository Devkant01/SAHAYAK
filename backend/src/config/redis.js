const { createClient } = require("redis");

const RedisClient = createClient({
    username: 'default',
    password: process.env.REDIS_HOST_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 12132
    }
});
async function connectRedis() {
    try {
        await RedisClient.connect();
        console.log("Redis connected successfully");
    } catch (err) {
        console.error("Redis connection error:", err);
        process.exit(1); // Exit process with failure
    }
}


module.exports = { connectRedis, RedisClient };