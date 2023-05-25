import React from 'react'

const Couponform = ({HandleSubmit,value,setValue,discount,setDiscount}) => {
  return (
    <>
        <form onSubmit={HandleSubmit}>
        <div className="form-group w-50">
            <input
            type="text"
            className="form-control"
            placeholder="Enter Coupon Code"
            value={value}
            onChange={(e) =>{
                setValue(e.target.value)
            }}
            />
            <input
            type="number"
            className="form-control mt-2"
            placeholder="Discount percentage"
            value={discount}
            onChange={(e) =>{
              setDiscount(Math.max(0, Math.min(e.target.value, 100)));
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

export default Couponform