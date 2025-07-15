const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const listingSchema= new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
       image: {
            type: String,
            default: "https://unsplash.com/photos/white-and-brown-concrete-building-under-blue-sky-during-daytime-_TPTXZd9mOo",
            set: (v) => v===""?"https://unsplash.com/photos/white-and-brown-concrete-building-under-blue-sky-during-daytime-_TPTXZd9mOo":v,
        },

        price:{
            type:Number,
        },
        location:{
            type:String,
        },
        country:{
            type:String,
        }

    });
    const Listing=new mongoose.model("Listing",listingSchema);
    module.exports=Listing;
