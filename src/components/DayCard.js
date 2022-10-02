import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DayCard = ({ tasks, updateTask, todaysTasksDisplayed, fetchTodaysTasks }) => {

    const [day, setDay] = useState("")

    let { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/days/${id}`)
            .then(r => r.json())
            .then(data => setDay(data.name))
    }, [])

   useEffect(() => {
    fetchTodaysTasks(id)
   }, [])
  

    let mappedTodaysTasks
    if(todaysTasksDisplayed){
    mappedTodaysTasks = todaysTasksDisplayed.map((task)=>{
      return <li key={task.id}>{task.name} | {task.minutes} minutes</li>
    })
  }

    let mappedTasks
    if(tasks){
      mappedTasks = tasks.filter((task)=> task.day_id != id).map((task)=>{
        return(
            <>
                <p key={task.id}>{task.name}</p>
                <p className="btn" onClick={()=>updateTask(task.id, id)}>+</p>
            </>
        )
      })
    }

   

  return (
    <div className="btn">
        {day}
        <h4>To Do Today</h4>
        <div>
          {mappedTodaysTasks.length > 0 ? <ul>{mappedTodaysTasks}</ul> : <h1>You have nothing to do today! Click below to add a task to your list</h1>}
        </div>
       
        <h5>Click on a task to add to to your to do list</h5>
        <div>
            {mappedTasks}
        </div> 
    </div>
  )
}

export default DayCard