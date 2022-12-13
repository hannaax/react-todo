// https://youtu.be/EbnmosN64JQ

import {React,useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat,faPlus,faTrash,faPen,faCheck } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);  // todoEditing의 역할을 모르겠다
  const [editingText, setEditingText] = useState("");

  // local-storage 시작
  // 따라 쳤는데 작동 안됨
  // edit 기능과 useEffect를 통한 local-storage 기능에 대해 더 알아보기
  useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if(loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])
  // local-storage 끝


  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo, 
    }

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  const deleteTodo = (id) => {
    const updatedTodo = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodo);
  }

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {  // 고차함수 앞에 array를 왜굳이 구조분해할당해서 받아오는지 이해못하겠다
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(updatedTodos)

  }

  const submitEdits = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText("")
  }

  return (
    <div id="todo-list">
      <h1>cat's to do <FontAwesomeIcon icon={faCat} /> </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit"> <FontAwesomeIcon icon={faPlus} /> </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div class="todo-item">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}><FontAwesomeIcon icon={faCheck} /></button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}><FontAwesomeIcon icon={faPen} /></button>
            )}

            <div className="todo-actions-margin"/>
            <button onClick={() => deleteTodo(todo.id)}><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        </div>
        </div>
      ))}
    </div>
  );




}

export default App;