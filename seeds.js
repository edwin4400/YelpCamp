var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum, tellus vel elementum vulputate, diam est convallis tortor, at dignissim lectus diam a tellus. Proin ut dolor tristique justo posuere pharetra ac sed orci. Pellentesque fermentum feugiat aliquet. Ut vulputate magna vel magna commodo, nec tempus nunc efficitur. Donec ac dictum neque, vitae mollis velit. Vivamus sagittis ligula enim. Sed finibus ultrices turpis, eget hendrerit sem maximus sit amet. Maecenas nec magna nunc. Mauris mattis, sem nec lobortis molestie, mi velit pharetra lacus, a blandit lacus tellus id elit. Phasellus sapien quam, ornare vitae cursus at, convallis non nisi. Cras lectus nunc, consectetur sed hendrerit sit amet, auctor et lorem. Morbi vitae tincidunt dolor. Aenean in urna vestibulum, lacinia enim ac, pretium turpis."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum, tellus vel elementum vulputate, diam est convallis tortor, at dignissim lectus diam a tellus. Proin ut dolor tristique justo posuere pharetra ac sed orci. Pellentesque fermentum feugiat aliquet. Ut vulputate magna vel magna commodo, nec tempus nunc efficitur. Donec ac dictum neque, vitae mollis velit. Vivamus sagittis ligula enim. Sed finibus ultrices turpis, eget hendrerit sem maximus sit amet. Maecenas nec magna nunc. Mauris mattis, sem nec lobortis molestie, mi velit pharetra lacus, a blandit lacus tellus id elit. Phasellus sapien quam, ornare vitae cursus at, convallis non nisi. Cras lectus nunc, consectetur sed hendrerit sit amet, auctor et lorem. Morbi vitae tincidunt dolor. Aenean in urna vestibulum, lacinia enim ac, pretium turpis."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum, tellus vel elementum vulputate, diam est convallis tortor, at dignissim lectus diam a tellus. Proin ut dolor tristique justo posuere pharetra ac sed orci. Pellentesque fermentum feugiat aliquet. Ut vulputate magna vel magna commodo, nec tempus nunc efficitur. Donec ac dictum neque, vitae mollis velit. Vivamus sagittis ligula enim. Sed finibus ultrices turpis, eget hendrerit sem maximus sit amet. Maecenas nec magna nunc. Mauris mattis, sem nec lobortis molestie, mi velit pharetra lacus, a blandit lacus tellus id elit. Phasellus sapien quam, ornare vitae cursus at, convallis non nisi. Cras lectus nunc, consectetur sed hendrerit sit amet, auctor et lorem. Morbi vitae tincidunt dolor. Aenean in urna vestibulum, lacinia enim ac, pretium turpis."
    }
];
    
function seedDB(){
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log("Campground removed!");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if (err) {
                            console.log(err);
                        } else {
                            console.log("Campground added!");
                            Comment.create(
                                {
                                    text: "This place is great, but I wish there was internet",
                                    author: {
                                        id: new mongoose.mongo.ObjectId(),
                                        username: "Homer"
                                    }
                                }
                                , function(err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.author = {
                                                            id: new mongoose.mongo.ObjectId(),
                                                            username: "CampAuthor"
                                                        };
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Comment added!");
                                    
                                }
                            });
                        }
                });
            });
        }
    });
}    


module.exports = seedDB;