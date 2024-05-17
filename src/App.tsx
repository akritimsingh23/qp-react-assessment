import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // hook is used with TypeScript to provide type safety
  const [task, setTask] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleAddTask = () => {
    //checks if the input is non-empty
    if (input.trim() !== '') {
      //new Task object is created with complete status as false
      const newTodo: Task = {
        id: task.length + 1,
        text: input,
        completed: false,
      };
      // set task state variable to new array containing all the existing task (...task) along with the new todo
      setTask([...task, newTodo]);
      setInput('');
    }
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = task.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    //clearing Input Field
    setTask(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={handleAddTask}>Add Todo</button>
      <ul>
        {task.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
