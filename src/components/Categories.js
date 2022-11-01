import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NewCategoryForm from './NewCategoryForm'

const Categories = ({ categories, onNewCategory, handleDeleteCategory }) => {

  const [formIsDisplayed, setFormIsDisplayed] = useState(false)

  // function deleteCategory(category){
  //   console.log(category.id)
  //   fetch(`http://localhost:9292/categories/${category.id}`, {
  //     method: "DELETE",
  //   })
  //   handleDeleteCategory(category.id)
  // }
  
  let mappedCategories
    if(categories) {
        mappedCategories = categories.map((category)=>{
            return(
              <>
               <Link to={`/categories/${category.id}`} className= "btn" key={category.id}>{category.name}</Link>
               {/* <i className="material-icons btn" onClick={()=>deleteCategory(category)}>X</i> */}
              </>
               )
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