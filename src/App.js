import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [todo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(false);
  const [todoId, settodoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setUpdate(true);
    setText(text);
    settodoId(_id);
  }
  const handleAddOrUpdate = () => {
    if (update) {
      updateToDo(todoId, text, setToDo, setText, setUpdate);
    } else {
      addToDo(text, setText, setToDo);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddOrUpdate();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos.. "
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div
            className="add"
            onClick={
              update? 
              () => updateToDo(todoId, text, setToDo, setText, setUpdate)
              : () => addToDo(text, setText, setToDo)
            }
          >
            {update ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {todo.map((item) => <ToDo 
          key={item._id} 
          text={item.text} 
          updateMode = {() => updateMode(item._id,item.text)}
          deleteMode={() => deleteToDo(item._id,setToDo)}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
