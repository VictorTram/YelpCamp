var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Reast", 
        image: "https://images.unsplash.com/photo-1531881503977-91282087e0c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        descrption: "blah blah"
    },
    {
        name: "Prime Peak", 
        image: "https://images.unsplash.com/photo-1504808951974-0573d32c306b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        descrption: "blah blah"
    },
    {
        name: "Cold Coast", 
        image: "https://images.unsplash.com/photo-1545252682-2d32e48111da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        descrption: "blah blah"
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed campgrounds!");
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("added a campground");
                        // Create a Comment
                        Comment.create(
                            {
                                text: "This place is great, but i wish it had better internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created a new comment!")
                                }
                            }
                        )
                    }
                });
            });
        }
    });
    
    
    // add a few comments


};

module.exports = seedDB;
