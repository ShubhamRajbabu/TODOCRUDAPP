import { Router } from "express";
import { createTodo, deleteTodo, editTodo, getTodos } from "../controllers/todoControllers.js";

const todoRoutes = Router();

todoRoutes.get('/get-todos', getTodos);
todoRoutes.post('/create-todo', createTodo);
todoRoutes.post('/edit-todo', editTodo);
todoRoutes.post('/delete-todo', deleteTodo);


export default todoRoutes;