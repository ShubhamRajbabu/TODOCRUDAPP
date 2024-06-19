import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../axiosConfig";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState("");

  const getTodos = async () => {
    try {
      const response = await api.get(
        "/todo/get-todos"
      );
      if (response.data.success) {
        const data = response.data.allTodos;
        setTodos(data);
      } else {
        console.log("Todos not found");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const createTodo = async () => {
    try {
      const response = await api.post(
        "/todo/create-todo",
        { text: newTodo }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        const data = response.data.allTodos;
        setTodos(data);
        setNewTodo("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const editTodo = async (id) => {
    try {
      const response = await api.post(
        "/todo/edit-todo",
        { todoId: id, newTodoText: editedTodo }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        const data = response.data.allTodos;
        setTodos(data);
        setNewTodo("");
        setEditedTodo("");
        setEditingTodo("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const deleteTodo = async (todo) => {
    try {
      const response = await api.post(
        "/todo/delete-todo",
        {
          todoId: todo._id,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        const data = response.data.allTodos;
        setTodos(data);
        setNewTodo("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("catcherror", error?.message);
    }
  };
  const handleEdit = async (id) => {
    setEditingTodo(id);
  };
  const handleCancel = async (id) => {
    setEditingTodo("");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>

      <input
        type="text"
        placeholder="write your todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={createTodo}>Add Todo</button>
      {todos.length > 0 &&
        todos.map((todo, index) => (
          <ol key={todo._id}>
            {editingTodo === todo._id ? (
              <div key={todo._id}>
                <input
                  type="text"
                  placeholder="edit your todo"
                  autoFocus
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button onClick={() => editTodo(todo._id)}>Submit</button>
                <button onClick={() => handleCancel(todo._id)}>Cancel</button>
              </div>
            ) : (
              <div>
                  <p>
                    {index+1}.{' '}
                  {todo.text}
                  <button onClick={() => handleEdit(todo._id)}>Edit</button>
                  <button onClick={() => deleteTodo(todo)}>Delete</button>
                </p>
              </div>
            )}
          </ol>
        ))}
    </div>
  );
};

export default Home;
