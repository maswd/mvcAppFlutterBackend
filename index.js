// import the express module
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const bannerRouter = require("./routes/banner");
const categoryRouter = require("./routes/category");
const subcategoryRouter = require("./routes/sub_category");
const productRouter = require("./routes/product");
const productReviewRouter = require("./routes/product_review");


//defind the port number the server will listen on
const PORT = 3000;

// create an instance of express application
// because it give us the starting point
const app = express();
//mongodb string
const DB = "mongodb+srv://maswd:Mg%40562314@cluster0.xowm6.mongodb.net/";

// middleware  - to register routes or to mount routes
app.use(express.json());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subcategoryRouter);
app.use(productRouter);
app.use(productReviewRouter);


mongoose.connect(DB).then(() => {
  console.log("mongoose connected");
});
//start the server and listen on port
app.listen(PORT, "0.0.0.0", function () {
  // log the NUMBER
  console.log(`Server is running on port ${PORT}`);
});
