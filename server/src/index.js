const app = require("./app");
const connectDB = require("./config/db");
const { port } = require("./secret");
const colors = require('colors')

app.listen(port, async () => {
    await connectDB()

    console.log(colors.cyan(`Server is Running at http://localhost:${port}`));
})