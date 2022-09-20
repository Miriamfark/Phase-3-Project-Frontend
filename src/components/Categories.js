import React, { useState } from 'react'
import NewCategoryForm from './NewCategoryForm'

const Categories = ({ categories, onNewCategory }) => {

  const [formIsDisplayed, setFormIsDisplayed] = useState(false)

    let mappedCategories
    if(categories) {
        mappedCategories = categories.map((category)=>{
            return <div key={category.id} className="btn">{category.name}</div>
        })
    }

    function handleToggleForm() {
      setFormIsDisplayed(!formIsDisplayed)
    }

  return (
    <>
            {mappedCategories}
            <div className="btn" onClick={handleToggleForm}>Add a New Category Here!</div>
            {formIsDisplayed ? <NewCategoryForm onNewCategory={onNewCategory}/> : null}
    </>
  )
}

export default Categories