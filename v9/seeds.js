var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Reast", 
        image: "https://images.unsplash.com/photo-1531881503977-91282087e0c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet pulvinar nisi, nec fermentum nisl dapibus egestas. Pellentesque nec est id erat pretium condimentum. Mauris dignissim sem quis sem malesuada sollicitudin. Quisque auctor non purus suscipit pharetra. Maecenas consectetur justo at augue rhoncus, id blandit diam luctus. In rutrum ac tortor vitae dictum. Sed id orci nec lectus suscipit suscipit. Fusce vitae nunc elit. Fusce lectus neque, dictum eget nisl nec, condimentum aliquet purus. Nulla tristique dictum tortor quis vestibulum. Cras vestibulum auctor lectus vel dictum."
    },
    {
        name: "Prime Peak", 
        image: "https://images.unsplash.com/photo-1504808951974-0573d32c306b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet pulvinar nisi, nec fermentum nisl dapibus egestas. Pellentesque nec est id erat pretium condimentum. Mauris dignissim sem quis sem malesuada sollicitudin. Quisque auctor non purus suscipit pharetra. Maecenas consectetur justo at augue rhoncus, id blandit diam luctus. In rutrum ac tortor vitae dictum. Sed id orci nec lectus suscipit suscipit. Fusce vitae nunc elit. Fusce lectus neque, dictum eget nisl nec, condimentum aliquet purus. Nulla tristique dictum tortor quis vestibulum. Cras vestibulum auctor lectus vel dictum."
    },
    {
        name: "Cold Coast", 
        image: "https://images.unsplash.com/photo-1545252682-2d32e48111da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet pulvinar nisi, nec fermentum nisl dapibus egestas. Pellentesque nec est id erat pretium condimentum. Mauris dignissim sem quis sem malesuada sollicitudin. Quisque auctor non purus suscipit pharetra. Maecenas consectetur justo at augue rhoncus, id blandit diam luctus. In rutrum ac tortor vitae dictum. Sed id orci nec lectus suscipit suscipit. Fusce vitae nunc elit. Fusce lectus neque, dictum eget nisl nec, condimentum aliquet purus. Nulla tristique dictum tortor quis vestibulum. Cras vestibulum auctor lectus vel dictum."
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
