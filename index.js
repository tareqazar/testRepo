var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var task = ["buy milk", "learn javascript", "learn express"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.get('/', function (req, res) {
  res.render(`index`, { task: task, complete: complete});
});
app.listen(8080, function () {
  console.log('Running on port 8080!');
});

app.post('/addtask', function (req,res) {
  // res.render('index.ejs'); Doesn't work because displaying the index.ejs page means there's no task variable defined so this line gives an error
  var newTask = req.body.newTask;
  task.push(newTask);
  res.redirect("/");
});

app.post('/add_task', function(req , res){
  var newTask = req.body.newTask;
  task.push(newTask);
  res.send(newTask + " Successfully added!");
});

app.get("/", function(req, res) {
  console.log({ task: task, complete: complete})
    res.render(`index.js`, { task: task, complete: complete});
});

var complete = ["finish learning nodejs"];
app.post("/removetask", function(req, res) {
     var completeTask = req.body.check;
if (typeof completeTask === "string") {
     complete.push(completeTask);
  task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {     complete.push(completeTask[i]);
    task.splice(task.indexOf(completeTask[i]), 1);
}
}
   res.redirect("/");
});     

app.post("/remove_task", function (req,res){
    var removedTasks = req.body;
    //console.log(removedTasks);
});
