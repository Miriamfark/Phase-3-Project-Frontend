import React, { useState, useEffect } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom"
import Categories from "./Categories";
import Tasks from "./Tasks";
import DayCard from "./DayCard"
import CategoryCard from "./CategoryCard";


function App() {
  
 const [days, setDays] = useState([])
 const [categories, setCategories] = useState([])
 const [tasks, setTasks] = useState([])

useEffect(() => {
    fetch("http://localhost:9292/days")
        .then(r => r.json())
        .then(data => setDays(data))
}, [])

useEffect(() => {
  fetch("http://localhost:9292/categories")
      .then(r => r.json())
      .then(data => setCategories(data))
      //[{name:, id:, tasks: [{id, minutes, name}]}]

    //user should be in global state - redux for phase 5 
}, [])

useEffect(() => {
    fetch("http://localhost:9292/tasks")
      .then(r => r.json())
      .then(data => setTasks(data))
}, [])

function handleNewTask(newTask) {
  setTasks([...tasks, newTask])
  //really need to update nested task within category
  //category = categories.find(cat => cat.id === newTask.category_id)
  //updatedCategory = {...category, tasks: [...category.tasks, newTask]}
  //updatedCategories = categories.map((c) => c.id === updatedCategory.id ? updatedCategory : c )
  //setCategories(updatedCategories)
  //categories should be links and when click on category/3 show tasks from specific category
}

function handleDeleteTask(id) {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  setTasks(updatedTasks);
}

function handleDeleteCategory(id) {
  const updateCategories = categories.filter((category)=> category.id !== id)
  setCategories(updateCategories)
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
                <Route exact path="/days" element={<Home days={days} />} />
                <Route path="/days/:id" element={<DayCard 
                tasks={tasks} 
                days={days} />} />
                <Route path="/categories/*" element={<Categories 
                categories={categories} 
                onNewCategory={onNewCategory}/>} />
                <Route path='/categories/:id' element={<CategoryCard categories={categories} />}  />
                <Route path="/categories/new" element={<h1>New Category Form</h1>} />
                <Route path="*" element={<h1>Sorry, this page does not exist</h1>} />
            </ Routes>
     </div>
  );
}

export default App;

