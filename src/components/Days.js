import React from 'react'
import { Link } from 'react-router-dom'

const Days = ({ days }) => {

    let mappedDays
    if (days){
    mappedDays = days.map((day)=>{
        return <Link to={`/days/${day.id}`} className= "btn" key={day.id}>{day.name}</Link>
    })
}
console.log(days)

  return (

    <>
      <ol>
        {mappedDays}
      </ol>
    </>
  )
}

export default Days