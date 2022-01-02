const db = require('../models')

const getTodoList = async (req, res) => {
    const todoList = await db.TodoList.findAll({ where : { UserId : req.user.id }})
    res.status(200).send(todoList);
};

const addTodoList = async (req, res) => {
    const newTodoList = await db.TodoList.create({
        task : req.body.task,
        UserId : req.user.id
    })
    res.status(201).send(newTodoList);
};

const deleteTodoList = async (req, res) => {
    const targetId = Number(req.params.id);
    const targetTodo = await db.TodoList.findOne({ 
        where : { 
            id : targetId,
            UserId : req.user.id
        }})
    if (targetTodo) {
        await targetTodo.destroy()
        res.status(204).send();
    } else {
        res.status(404).send({ message : 'Todo list not found.'})
    }
    
};

const updateTodoList = async (req, res) => {
    const targetId = Number(req.params.id);
    const newTask = req.body.task;
    const targetTodo = await db.TodoList.findOne({ 
        where : { 
            id : targetId,
            UserId : req.user.id
        }})
    if (targetTodo) {
        await targetTodo.update({
            task : newTask
        })
        res.status(200).send({ message: "updating is success" });
    } else {
        res.status(404).send( { message : 'Todo list not found'})
    }
};

module.exports = {
    getTodoList,
    addTodoList,
    deleteTodoList,
    updateTodoList
};

