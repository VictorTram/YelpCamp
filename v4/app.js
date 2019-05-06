var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    Campground = require('./models/campground'),
    seedDB = require("./seeds");
    

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true }));
app.set("view engine", "ejs");
seedDB();

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//         description: "This is a huge granite hill park. Ground is almost all granite"
//     }, function(err, campground){
//         if(err){
//             console.log("Error in Campground Creation");
//             console.log(err);
//         } else{
//             console.log("Newly Created Campground: ");
//             console.log(campground);
//         }
//     }
// );

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    // Get all campgrounds frmo DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campground: allCampgrounds});
        }
    })
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
    // Get dtata from form and add to campgrounds array
    // Redirect back to campgrounds page
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            // Render to show remplate with that campground
            res.render("show", {campground: foundCampground});
        }
    });
    // Render show tamplate with that campground
})

// Comments Route

app.get("/campgrounds/:id/comments/new", function(req, res){
    res.send("THis will be the comment form!");
});

app.listen(3000, function(){
    console.log("The YelpCamp Server has Started")
});