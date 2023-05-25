import React from 'react'

const CategoryForm = ({HandleSubmit,value,setValue}) => {
  return (
    <>
        <form onSubmit={HandleSubmit}>
        <div className="form-group">
            <input
            type="text"
            className="form-control"
            placeholder="Enter Category"
            value={value}
            onChange={(e) =>{
                setValue(e.target.value)
            }}
            />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
            Submit
        </button>
        </form>
    </>
  )
}

export default CategoryForm