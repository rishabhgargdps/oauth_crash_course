const express = require("express")
const authRoutes = require("./routes/auth-routes")

const app = express()

//set up view engine
app.set("view engine", "ejs")

//setup routes
app.use("/auth", authRoutes)

//create routes
app.get("/", (req, res) => {
    res.render("home");
})

app.listen(3000, () => {
    console.log("App running on port 3000")
});