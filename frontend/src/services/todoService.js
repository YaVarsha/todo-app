import axios from "axios";

const API = "http://localhost:5000/todos";

export const getTodos = () => axios.get(API);

export const createTodo = (data) => axios.post(API, data);

export const removeTodo = (id) => axios.delete(`${API}/${id}`);

export const updateTodoApi = (id, data) =>
  axios.put(`${API}/${id}`, data);