var Campground = require("../models/campground")
var Comment = require("../models/comment")
// All middleware goeshere
var middlewareObj = {
    
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        // Does the user own the campground
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found.");
                res.redirect("/campgrounds");
            } else{
                // Check if foundCampground exists
                if(!foundCampground){
                    req.flash("error", "Item not found");
                    return res.redirect("back");
                }
                // Does user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();                
                } else{
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            };
        });
    } else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        // Does the user own the campground
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundCampground){
                req.flash("error", "Comment not found.");
                res.redirect("back");
            } else{
                // Did user write campground
                if(foundComment.author.id.equals(req.user._id)){
                    next();                
                } else{
                    req.flash("error", "You dont have permission to do that.");
                    res.redirect("back");
                }
            };
        });
    } else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;