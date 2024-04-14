import axios from "axios";

const baseURL = "https://todo-app-backend-9tui.onrender.com/";

const getAllToDo = (setToDo) => {
  axios.get(baseURL).then(({ data }) => {
    console.log("Data-> ", data);
    setToDo(data);
  })
  .catch((err) => console.log(err));
};

const addToDo = (text, setText, setToDo) => {
  axios.post(`${baseURL}/save`, { text }).then(() => {
    setText("");
    getAllToDo(setToDo);
  })
  .catch((err) => console.log(err))
};

const updateToDo = (todoId, text, setToDo,setText, setUpdate) => {
  axios
    .post(`${baseURL}/update`, {_id: todoId, text })
    .then(() => {
    setText("");
    setUpdate(false);
    getAllToDo(setToDo);
  })
  .catch((err) => console.log(err));
};

const deleteToDo = (todoId, setToDo) => {
    axios
    .post(`${baseURL}/delete`, {_id: todoId})
    .then(({data}) => {
        getAllToDo(setToDo)})
    .catch((err) => console.log(err));
}
 
export { getAllToDo, addToDo, updateToDo, deleteToDo };
