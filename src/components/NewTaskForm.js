import React, { useState } from 'react'


const NewTaskForm = ({ categories, handleNewTask }) => {

    const [name, setName] = useState("")
    const [minutes, setMinutes] = useState("")
    const [categoryId, setCategoryId] = useState()

    let mappedCategories
    if(categories) {
        mappedCategories = categories.map((category)=>{
            return (
                <form>
                    <label className="btn category_button">
                        {category.name}
                        <input key={category.id} type="radio" id={category.id} name="category" value={categoryId} onChange={handleCategoryChange} />
                    </label>
                </form>
            )
        })  
    }

    function handleSubmit(e) {
        e.preventDefault()
        const newTaskData = {
            name: name,
            minutes: minutes,
            category_id: categoryId,
          }

          fetch("http://localhost:9292/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTaskData)
          })
            .then((r) => r.json())
            .then((newTask) => {
                handleNewTask(newTask)
                setName("")
                setMinutes("")
            })
    }

    function handleNameChange(event) {
        setName(event.target.value)
    }
    console.log(name)

    function handleMinutesChange(event) {
        setMinutes(event.target.value)
    }
    console.log(minutes)

    function handleCategoryChange(event) {
        setCategoryId(event.target.id)
    }
    console.log("categoryID", categoryId)

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
             New Task
                <input type="text" name="name" value={name} onChange={handleNameChange} />
            </label>
            <label>
            Amount of Minutes
                <input type="number" min="1" max="60" name="minutes" value={minutes} onChange={handleMinutesChange} />
            </label>
  
            <p>Please select a category:</p>
            {mappedCategories}
         <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default NewTaskForm