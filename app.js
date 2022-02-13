//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
// mongoose.connect("mongodb+srv://hariom-kumar:Hariom@17@cluster0.beqyn.mongodb.net/todolistDB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://Hariom_Kumar:Hariom_17@cluster0.beqyn.mongodb.net/todolistDB", {useNewUrlParser: true});
const itemsSchema = {
  name: String
};
//creating model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Work"
});
const item2 = new Item({
  name: "Read a book"
});
const item3 = new Item({
  name: "Movie"
});

const defaultItems = [item1, item2, item3];


app.get("/", function(req, res) {
// const day = date.getDate();

  Item.find({}, function(err, foundItem) {
    if(foundItem.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err)
        console.log(err);
        else
        console.log("Successfully saved items DB");

      });
      res.redirect("/");
    }
    else{
    res.render("list", {listTitle: "Today", newListItems: foundItem});}
  })
});

app.post("/", function(req, res){

  const newItemName = req.body.newItem;

  const item = new Item({
    name: newItemName
  });

  item.save();
  res.redirect("/");

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.post("/delete", function(req,res) {
  const checkedItemId= req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId,function(err) {
    if(!err){
    console.log("item deleted successfully");
    res.redirect("/");
  }
  })
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully.");
});
