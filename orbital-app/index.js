const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

//register and login routes
app.use("/auth", require("./routes/auth"))
app.use("/users", require("./routes/users"))
app.use("/projects", require("./routes/projects"))
app.use("/staffs", require("./routes/staffs"))
app.use("/submissions", require("./routes/submissions"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});