const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");
//const upload = multer({ dest: './public/data/uploads/' })

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", true);
//User Schema
let fileanalyseSchema = new mongoose.Schema({
  upload: { type: String, required: true, unique: false },
});
let FileAnalyse = mongoose.model("FileAnalyse", fileanalyseSchema);

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (req, res, next) {
    console.log(req.file);
    console.log(`req.file.filename is ${req.file.filename}`);
    console.log(`req.file.type is ${req.file.type}`);
    console.log(`req.file.size is ${req.file.size}`);
    console.log(`req.file.mimetype is ${req.file.mimetype}`);
    const file = req.file;
    const data = req.body;
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    return res.status(200).json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
    //.send("File Uploaded successfully");
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        // A Multer error occurred when uploading.
      } else if (err) {
        console.log(err);
        // An unknown error occurred when uploading.
      }

      // Everything went fine.
    });
  }
);

/*app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  });
});

app.post("/stats", upload.single("uploaded_file"), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
});
*/
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
