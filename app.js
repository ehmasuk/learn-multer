const express = require("express");
const multer = require("multer");
const uploadOnCludinary = require("./cloudinary");

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/views/index.html");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./temp");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/upload", upload.single("profile"), (req, res, next) => {
    console.log(req.file.path);
    uploadOnCludinary(req.file.path);

    res.send("Done");
});

app.use((req, res, next) => {
    res.send("Route not found");
});

module.exports = app;
