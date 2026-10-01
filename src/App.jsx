import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Todo from '../components/todo'
import './styles/app.css'
import './styles/responsive.css'

function App() {

  const [todo, setTodo] = useState({ text: "", status: "" });
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("all");

  //Load todos from localStorage when app starts
  useEffect(() => {
    let localtodos = localStorage.getItem("todos");
    if (localtodos) {
      setTodoList(JSON.parse(localtodos));
    }
  }, [])

  //Adding todo
  const handleTodo = (e) => {
    if (todo.text.trim().length !== 0) {
      const newTodo = {
        id: crypto.randomUUID(),
        text: todo.text,
        status: "active"
      };
      setTodoList([...todoList, newTodo]);
      setTodo({
        text: "",
        status: "",
      });

      localStorage.setItem("todos", JSON.stringify([...todoList, newTodo]));
    }
  }


  //functionality for filter buttons
  const filteredTodos = todoList.filter((item) => {
    if (filter === "all") {
      return true;
    }
    return item.status === filter;
  });

  //logic for toggle of todo
  const toggleTodo = (id) => {
    const updatedTodos = todoList.map(item => {

      if (item.id === id) {
        return {
          ...item,
          status: item.status === "active" ? "completed" : "active"
        }
      }
      return item;
    })
    setTodoList(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  //delete todos
  const deleteTodo = (id) => {
    const updatedTodos = todoList.filter(item => item.id !== id);
    setTodoList(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }


  //remaining todo logic
  const remainingTodos = todoList.filter(item => item.status === "active").length;

  //clear completed logic
  const clearCompleted = () => {
    const updatedTodos = todoList.filter(item =>
      item.status === "active"
    )
    setTodoList(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  //editing todos
  const editTodo = (id, newText) => {
    const updatedTodos = todoList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          text: newText
        };
      }
      return item;
    });
    setTodoList(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <>
      <Navbar />

      <main className="todo-container">

        {/* Add Todo */}
        <section className="todo-input">
          <input
            type="text"
            value={todo.text}
            onChange={(e) => setTodo({ ...todo, text: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTodo();
              }
            }}
            placeholder="What do you need to do?"
          />
          <button type='submit' onClick={handleTodo}>Add Task</button>
        </section>

        {/* Todo Header */}
        <section className="todo-header">
          <h2>My Tasks</h2>

          <div className="filters">
            <button className={`default ${filter === "all" ? "activate" : ""}`} onClick={() => setFilter("all")}>All</button>
            <button className={`default ${filter === "active" ? "activate" : ""}`} onClick={() => setFilter("active")}>Active</button>
            <button className={`default ${filter === "completed" ? "activate" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
          </div>
        </section>

        {/* Todo List */}
        <section className="todo-list">
          {filteredTodos.length === 0 ?
            (<div className='no-task'>No Tasks Here</div>) :
            (filteredTodos.map((todoItem) => {
              return (
                <Todo key={todoItem.id} task={todoItem} deleteTodo={deleteTodo} toggleTodo={toggleTodo} editTodo={editTodo} />
              )
            }))
          }

        </section>

        {/* Footer */}
        <section className="todo-footer">
          <span>{remainingTodos} tasks remaining</span>
          <button onClick={clearCompleted}>Clear Completed</button>
        </section>

      </main>
    </>
  )
}

export default App;
