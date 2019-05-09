var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - Shows all campgrounds
router.get("/", function(req,res){
    
    // Get all campgrounds frmo DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campground: allCampgrounds, currentUser: req.user});
        }
    })
});

// CREATE - Adds a new campground to DB
router.post("/", function(req, res){
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

// NEW - Show form to create a new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    // Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            // Render to show remplate with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    // Render show tamplate with that campground
});

module.exports = router;