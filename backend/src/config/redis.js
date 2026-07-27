const { createClient } = require("redis");

const RedisClient = createClient({
    url: process.env.REDIS_URL
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