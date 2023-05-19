import React from 'react'
import Layout from '../../components/layout/layout'
import Usermenu from '../../components/layout/usermenu'

const Myorders = () => {
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
                <Usermenu />
            </div>
            <div className='col-md-9'><h3>Your Orders</h3></div>
          </div>
        </div>
    </Layout>
    
  )
}

export default Myorders