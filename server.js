var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './restfulTasksAngular', '/dist')));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restfulTasks');

var taskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.model('Tasks', taskSchema);
var Task = mongoose.model('Tasks');

app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else {
            res.json({ message: "Success", data: tasks });
        }
    })
})

app.get('/tasks/:id', function(req, res) {
    Task.findOne({_id: req.params.id}, function(err, task) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", error: err });
        } else {
            res.json({ message: "Success", data: task });
        }
    })
})

app.put('/tasks/:id', function(req, res) {
    Task.findOne({_id: req.params.id}, function(err, task) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", error: err });
        } else {
            task.title = req.body.title;
            task.description = req.body.description;
            task.completed = req.body.completed;
            task.save(function(err) {
                if (err) {
                    res.json({ message: 'Error', error: err });
                }
                else {
                    res.send("You have successfully updated " + task.title);
                }
            })
        }
    })
})

app.post('/tasks', function (req, res) {
    let newTask = new Task({
        title: req.body.title,
        description: req.body.description,
    })
    newTask.save(function(err) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", error: err });
        } else {
            console.log('successfully saved in DB');
            res.send('You have successfully added a task!');
        }
    })
})

app.delete('/tasks/:id', function(req, res) {
    Task.findOneAndRemove({_id: req.params.id}, function(err) {
        if (err) {
            res.json({ message: 'Error', error: err });
        } else {
            res.send('You have successfully removed a task from the db')
        }
    })
})

app.listen('8000', function () {
    console.log('listening on port 8000');
})