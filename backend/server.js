require("dotenv").config();
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    connectDB().then(() => {
        console.log(`Server is running: http://localhost:${port}`);
    }).catch(err => {
        console.error(' to connect to the database:', err);
    });
})