import React from 'react'
import Days from './Days.js'

const Home = ({ days }) => {
  return (
    <div>
      <Days days={days} />
    </div>
  )
}

export default Home