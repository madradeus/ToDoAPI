import {Request, Response, Router} from "express";
require('express-async-errors');
import {TodoRecord} from "../records/todo.records";


export const todoRouter = Router();


todoRouter
    .get('/', async (req: Request, res: Response): Promise<void> => {
        const todoList = await TodoRecord.findAll();
        // console.log(todoList)
        res.json (todoList);
    })
    .get('/:id',  async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params;
        const toDoItem =  await TodoRecord.findOne(id);
        res.json(toDoItem);
    })
    .post('/', async (req, res) => {
        const {id, title} = req.body;

        const newTodo = new TodoRecord({id, title});
        const insertId = await newTodo.insert();
        res.json({
            insertId,
        });

    })
    .delete('/:id',async(req, res) => {
        const {id} = req.params;

        const foundTodoToDelete = await TodoRecord.findOne(id);
        const deletedId = await foundTodoToDelete.delete();
        res.json({
            deletedId,
        });

    })
    .put('/:id', async (req, res) => {
        const {id} = req.params;
        const {title} = req.body;

        const foundTodoToUpdate = await TodoRecord.findOne(id);

        const updatedId = await foundTodoToUpdate.update(title);
        res.json(updatedId);

    })

