import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DayCard = ({ days, tasksM, updateTask }) => {
  const [day, setDay] = useState({})
  const [todaysTasks, setTodaysTasks] = useState([])


    let { id } = useParams()
    
useEffect(() => {
  if (days.length > 0) {
  const selectedDay = days.find((d) => d.id == id)
    setDay(selectedDay)
    setTodaysTasks(selectedDay.tasks)}
  }, [days])

//filter only select ones not in other group
//display remainder remainder == all tasks.filter condition keep it if not in other array
//update state
        
    const mappedTodaysTasks= todaysTasks.map((task)=>{
      return <li key={task.id}>{task.name} | {task.minutes} minutes</li>
    })
    
   const mappedTasks= tasksM.map((task)=>{
        return(
            <>
                <p key={task.id}>{task.name}</p>
                <p className="btn" onClick={()=>updateTask(task.id, id)}>+</p>
            </>
        )
      })

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
              const updatedTasks = [...todaysTasks, data]
              setTodaysTasks(updatedTasks)
              setDay({...day, tasks: updatedTasks})
            });    
    }
    
  
   

  return (
    <div className="btn">
        {day.name}
        <h4>To Do Today</h4>
        <div>
          {mappedTodaysTasks.length > 0 ? <ul>{mappedTodaysTasks}</ul> : <h1>You have nothing to do today! Click below to add a task to your list</h1>}
        </div>
       
        <h5>Add Tasks Below!</h5>
        <div>
            {mappedTasks}
        </div> 
    </div>
  )
}

export default DayCard