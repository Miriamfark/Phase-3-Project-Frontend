import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DayCard = ({ tasks, updateTask }) => {

    const [day, setDay] = useState("")

    let { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/days/${id}`)
            .then(r => r.json())
            .then(data => setDay(data.name))
    }, [])

    let mappedTasks
    if(tasks){
      mappedTasks = tasks.map((task)=>{
        return(
            <>
                <p key={task.id}>{task.name}</p>
                <p className="btn" onClick={updateTask}>+</p>
            </>
        )
      })
    }

  return (
    <div className="btn">
        {day}
        <p>Click on a task to add to to your to do list</p>
        <div>
            {mappedTasks}
        </div> 
    </div>
  )
}

export default DayCard