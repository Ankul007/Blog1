var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();
//appconfig
mongoose.connect("mongodb://localhost/restful_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
//mongoose/model
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

//routes

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.pexels.com/photos/459688/pexels-photo-459688.jpeg?auto=compress&cs=tinysrgb&h=350",
//     body: "Hello"
// });

app.get("/", function (req, res) {
    res.redirect("/blogs");

});
app.get("/blogs", function (req, res) {

    res.render("index.ejs");
    Blog.find({}, function(err, blogs)
    {


        if(err){
            console.log(err);
        }
        else{
            res.render("index.ejs");
        }

    });

});
app.listen(3000, function () {
    console.log("server started");
});

