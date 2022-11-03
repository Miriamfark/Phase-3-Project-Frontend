import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryCard = ({ categories }) => {

  let { id } = useParams()

  const filteredCategory = categories.filter((category) => category.id == id)

  const tasks = filteredCategory[0].tasks.map((task) => {
    return <li key={task.id}>{task.name} | {task.minutes} minutes</li>
  })
 

  return (
    <div>
      <h1>{filteredCategory[0].name}</h1>
      <ul>
        {tasks}
      </ul>
    </div>
  )
}

export default CategoryCard