var Campground = require("../models/campground")
var Comment = require("../models/comment")
// All middleware goeshere
var middlewareObj = {
    
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        // Does the user own the campground
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("/campgrounds");
            } else{
                // Does user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();                
                } else{
                    res.redirect("back");
                }
            };
        });
    } else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        // Does the user own the campground
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                // Did user write campground
                if(foundComment.author.id.equals(req.user._id)){
                    next();                
                } else{
                    res.redirect("back");
                }
            };
        });
    } else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;