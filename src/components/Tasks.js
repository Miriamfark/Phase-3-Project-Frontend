import React, { useState } from 'react'
import NewTaskForm from './NewTaskForm.js'

const Tasks = ({ categories, tasksM, handleNewTask, handleDeleteTask }) => {

  const [formIsDisplayed, setFormIsDisplayed] = useState(false)

    function deleteTask(task){
        console.log(task.id)
        fetch(`http://localhost:9292/tasks/${task.id}`, {
      method: "DELETE",
    })
    handleDeleteTask(task.id)
    }

    

   
       const mappedTasks = tasksM.map((task)=>{
            return (
            <div>
                <p>{task.name} | {task.minutes} minutes </p>
                <i className="material-icons btn" onClick={()=>deleteTask(task)}>X</i>
            </div>
            )
        })
    

    function handleToggleForm() {
      setFormIsDisplayed(!formIsDisplayed)
    }

  return (
    <div>
        {mappedTasks}
        <div className="btn" onClick={handleToggleForm}>Add a New Task Here!</div>
        {formIsDisplayed ? <NewTaskForm categories={categories} handleNewTask={handleNewTask} /> : null}
         
    </div>
  )
}

export default Tasks