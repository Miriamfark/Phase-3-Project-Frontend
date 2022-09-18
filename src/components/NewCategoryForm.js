import React, { useState } from 'react'

const NewCategoryForm = () => {

    const [categoryName, setCategoryName] = useState("")

    function handleChange(e) {
        setCategoryName(e.target.value)
    }
    console.log(categoryName)

    function handleAddCategory(e) {
        e.preventDefault()

        fetch("http://localhost:9292/categories/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryName)
          })
            .then((r) => r.json())
            .then((newCategory) => {
                console.log(newCategory)
                // handleNewTask(newTask)
                // setName("")
                // setMinutes("")
            })
    }

  return (
    <form onSubmit={handleAddCategory}>
        <label>
            Category Name
            <input type="text" value={categoryName} onChange={handleChange} />
        </label>
        <label>
            <input type="submit" />
        </label>
    </form>
  )
}

export default NewCategoryForm