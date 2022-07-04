var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var complete = [];
var task=[];
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const Todo = mongoose.model('Todo', { task: String, completed: Boolean }); //Todo is collection name, {} is fields
//const Finished = mongoose.model('Finished', {finTask : String});

Todo.find({completed: false}, function(err,result){
  if (err) {throw err;};
  task=result;
});

Todo.find({completed: true}, function(err,result){
  if (err) {throw err;};
  complete=result;
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine','ejs');
// app.get('/', function(req,res){
//   jf= Todo.find({}, (error, result =>{ console.log({result}); res.render('index',{task:result})}))
// }
// );

 app.get('/',async function (req, res) {
//  console.log(task);
   res.render(`index` , {task: task , complete: complete});  
    //console.log(result);
  }
  );

app.listen(8080, function () {
  console.log('Running on port 8080!');
});

// app.post('/addtask', function (req,res) {
//   // res.render('index.ejs'); Doesn't work because displaying the index.ejs page means there's no task variable defined so this line gives an error
//   var newTask = req.body.newTask;
//   task.push(newTask);
//   res.redirect("/");
// });

app.post('/add_task', function(req , res){
  var newTask = req.body.newTask;
  const task = new Todo({ task: newTask , completed: 0 });
  task.save().then(() => console.log());
  //task.push(newTask);
  res.send(newTask + " Successfully added!");
});

// app.get("/", function(req, res) {
//   res.render(`index.js`);
// });

//var complete = ["finish learning nodejs"];
// app.post("/removetask", function(req, res) {
//      var completeTask = req.body.check;
//      var fin = new Finished({finTask:completeTask});
// if (typeof completeTask === "string") {
//      //complete.push(completeTask);
//   task.splice(task.indexOf(completeTask), 1);
//   } else if (typeof completeTask === "object") {
//     for (var i = 0; i < completeTask.length; i++) {     complete.push(completeTask[i]);
//     task.splice(task.indexOf(completeTask[i]), 1);
// }
// }
//    res.redirect("/");
// });     

app.delete("/remove_task", async function (req,res){
    var removedTasks = req.body; 
    //console.log(removedTasks);
    
    // const y = await Todo.find({_id: removedTasks[0]})
    // console.log(y)
    // console.log(typeof(removedTasks[0]))
    // console.log("************")
    // const x = await Todo.deleteOne({_id: removedTasks[0] });
    // console.log(x)
    removedTasks.forEach(async function(remElem) {
      //await Todo.deleteOne({_id: remElem});

      await Todo.findOneAndUpdate({_id: remElem},{completed: true});



      //complete.push(remElem);
      //addRemToDB = new Finished({finTask:remElem});
      //addRemToDB.save().then(() => console.log());
      //task.forEach(function(delElem,index){
        //if(delElem == remElem) { task.splice(index,1)}

      //});
    });
    res.send("Congratulations!");


});

app.post('/upload_file',function(req,res){
  console.log(req);
    const pic = req;
    
});