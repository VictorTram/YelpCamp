var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");


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
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};    
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
    // Get dtata from form and add to campgrounds array
    // Redirect back to campgrounds page
});

// NEW - Show form to create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    // Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // Render to show remplate with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    // Render show tamplate with that campground
});

// EDIT - Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
    });    
});

// UPDATE - Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campground");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // Redirect somewhere (show page)
})

// DESTROY - Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;