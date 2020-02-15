const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');



//adding middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { userNewUrlParser: true })
const connection = mongoose.connection;
                //event once the connection is open    
connection.once('open', function() {
    console.log("MongoDB database connection established successfully")

})
                                   //request and response         
todoRoutes.route('/').get(function(req,res) {
    //function body  //call back function
    Todo.find(function(err, todos) {
        if(err) {
            console.log(err);
        }else{
            //attaching what we get from database //todo is the one used to get back the data
            res.json(todos);
        }


    });

});

//retrieve one specific todo using one id  //use get for an incoming http which is handled by callback function
todoRoutes.route('/:id').get(function(req, res) {
    //logic to retrieve single todo item
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);

    });
});
                    //to accept http post request
todoRoutes.route('/add').post(function(req, res) {
    //logic
    let todo = new Todo(req.body);
    //to save into database
    todo.save()
        .then(todo => {
            //200 for successful
            res.status(200).json({'todo': 'todo added succesfully'});
        })
        //call back to return a status code //400 for failed
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            
            })
            .catch(err => {
                res.status(400).send("Update not possible");

            });
    });

}); 


app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);

});
