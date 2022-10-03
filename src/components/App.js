
import React, { useState, useEffect } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom"
import Days from "./Days";
import Categories from "./Categories";
import Tasks from "./Tasks";
import DayCard from "./DayCard"


function App() {
  
 const [days, setDays] = useState([])
 const [categories, setCategories] = useState([])
 const [tasks, setTasks] = useState([])
 const [toDoToday, setToDoToday] = useState([])
 const [todaysTasksDisplayed, setTodaysTasksDisplayed] = useState([])



  useEffect(() => {
    fetch("http://localhost:9292/days")
        .then(r => r.json())
        .then(data => setDays(data))
}, [])

useEffect(() => {
  fetch("http://localhost:9292/categories")
      .then(r => r.json())
      .then(data => setCategories(data))
}, [])

useEffect(() => {
    fetch("http://localhost:9292/tasks")
      .then(r => r.json())
      .then(data => setTasks(data))
}, [])

function handleNewTask(newTask) {
  setTasks([...tasks, newTask])
}

function handleDeleteTask(id) {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  setTasks(updatedTasks);
}

function handleDeleteCategory(id) {
  const updateCategories = categories.filter((category)=> category.id !== id)
  setCategories(updateCategories)
}

function fetchTodaysTasks(id) {
  fetch(`http://localhost:9292/days/today/${id}`)
    .then(r => r.json())
    .then(data => setTodaysTasksDisplayed(data))
}


function updateTask(id, dayId) {
  
  fetch(`http://localhost:9292/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          day_id: dayId
      })
    })
    
      .then((r) => r.json())
      .then((data) => {
        setToDoToday([...toDoToday, data])
        fetchTodaysTasks(dayId)
      });    
}

function onNewCategory(newCategory) {
  setCategories([...categories, newCategory])
}

  return (
      <div className="App">
       <NavBar />
            <Routes>
                <Route 
                path="/tasks/*" 
                element={
                <Tasks 
                tasks={tasks} 
                categories={categories} 
                handleNewTask={handleNewTask} 
                handleDeleteTask={handleDeleteTask} 
                />
                } />
                <Route path="/tasks/new" element={<h1>New Task Form</h1>} />
                <Route exact path="/" element={<Home days={days} />} />
                {/* <Route path="/days/*" element={<Days days={days} />} /> */}
                <Route path="/days/:id" element={<DayCard 
                tasks={tasks} 
                updateTask={updateTask}
                todaysTasksDisplayed={todaysTasksDisplayed}
                fetchTodaysTasks={fetchTodaysTasks} />} />
                <Route path="/categories/*" element={<Categories 
                categories={categories} 
                onNewCategory={onNewCategory}
                handleDeleteCategory={handleDeleteCategory} />} />
                <Route path="/categories/new" element={<h1>New Category Form</h1>} />
                <Route path="*" element={<h1>Sorry, this page does not exist</h1>} />
            </ Routes>
     </div>
  );
}

export default App;

