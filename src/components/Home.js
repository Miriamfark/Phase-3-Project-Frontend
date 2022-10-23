import React from 'react'
import Days from './Days.js'

const Home = ({ days, fetchTodaysTasks }) => {


  return (
    <div>
      <Days days={days} fetchTodaysTasks={fetchTodaysTasks} />
    </div>
  )
}

export default Home