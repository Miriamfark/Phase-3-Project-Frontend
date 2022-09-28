import React, { useState } from 'react'

const NewCategoryForm = ({ onNewCategory }) => {

    const [categoryName, setCategoryName] = useState("")

    function handleChange(e) {
        setCategoryName(e.target.value)
    }
    console.log(categoryName)

    function handleAddCategory(e) {
        e.preventDefault()
        const newCategoryName = {
            name: categoryName
        }

        console.log("this is newCategoryName:", newCategoryName)

        fetch("http://localhost:9292/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategoryName)
          })
            .then((r) =>{
                console.log("this is r:", r)
                return r.json()    
            })
            .then((data) => {
                console.log("this is data:", data)
                onNewCategory(data)
                setCategoryName("")
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