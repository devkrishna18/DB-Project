const express=require("express");
const app= express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const engine = require("ejs-mate");
app.engine("ejs", engine); 
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")));
app.listen(3030,(req,res)=>{
    console.log("port is listinening");
})
main().then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
// app.get("/listing",async (req,res)=>{
//     let sample=await Listing.create({
//         title:"Apana Villa",
//         image:" ",
//         description:"By Beach Side",
//         price:2000,
//         location:"Panji,Goa",
//         country:"India",
//     })
//     await sample.save();
//     res.send("successfull testing");
// })
//index route
app.get("/listing",async (req,res)=>{
    const allist= await Listing.find({});
    res.render("list/index.ejs",{allist})
})
//new route
app.get("/listing/new",(req,res)=>{
    res.render("list/new.ejs")
})
//create route
app.post("/listing",async (req,res)=>{
    // const newlist=new Listing(req.body.listing);
    // await newlist.save();
    await Listing.create(req.body);
    res.redirect("/listing");
})
// show route
app.get("/listing/:id",async (req,res)=>{
    let{id}=req.params;
    const lis=await Listing.findById(id);
    res.render("list/show.ejs",{lis});
})
//edit route
app.get("/listing/:id/edit",async (req,res)=>{
     let{id}=req.params;
     const list= await Listing.findById(id);
     res.render("list/edit.ejs",{list});
})
//update route
app.put("/listing/:id",async(req,res)=>{
    let{id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body})
   res.redirect(`/listing/${id}`); //id pr redirect krne ka syntax
})
//delete
app.delete("/listing/:id",async (req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})
app.get("/",(req,res)=>{
    res.redirect("/listing")
})