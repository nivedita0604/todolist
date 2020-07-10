var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

var task = ["buy milk", "practise Tennis"];

var complete = ["watch song of glory C-drama"];


app.post("/addtask", function (req, res) {
  var newTask = req.body.newtask;

  task.push(newTask);
  res.redirect("/");
});

app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;

  if (typeof completeTask === "string") {
    complete.push(completeTask);
    //delete functionility
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});

app.listen(3000, ()=>{
    console.log("listenning at http://localhost:3000/");
});