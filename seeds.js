var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require('./models/comment');


var data = [
    {
        name: 'White Ridge', 
        image: "https://source.unsplash.com/tRGwX1HcTd4",
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In omnis non, fuga nulla rem recusandae eaque harum voluptas optio reprehenderit minus, eligendi, illo, deserunt iste maxime perferendis totam distinctio veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit eaque dolore laboriosam dolores tempora ab, animi beatae aperiam quidem incidunt minima libero sint distinctio, temporibus exercitationem a commodi reprehenderit natus?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur, impedit sapiente sit officiis nisi. Pariatur tempora inventore, dolorem. Facere officia, deserunt quaerat id ad. Nesciunt maiores veniam porro laudantium.'
    },
    {
        name: 'Campy Ground', 
        image: "https://source.unsplash.com/y8Ngwq34_Ak",
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In omnis non, fuga nulla rem recusandae eaque harum voluptas optio reprehenderit minus, eligendi, illo, deserunt iste maxime perferendis totam distinctio veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit eaque dolore laboriosam dolores tempora ab, animi beatae aperiam quidem incidunt minima libero sint distinctio, temporibus exercitationem a commodi reprehenderit natus?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur, impedit sapiente sit officiis nisi. Pariatur tempora inventore, dolorem. Facere officia, deserunt quaerat id ad. Nesciunt maiores veniam porro laudantium.'
    }
];


function seedDB(){
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log('removed campgrounds');
    //     data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log('added a campground!');
    //             // CREATE COMMENTS
    //             Comment.create(
    //                 {
    //                     text: 'this is a great place!',
    //                     author: 'Homer'
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log(err);
    //                     } else {
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log('created new comment');
    //                     }
    //                 });
    //         }
    //     });
    // });
    });
    // ADD NEW CAMPGROUNDS
    
    
    // ADD NEW COMMENTS
}

module.exports = seedDB;