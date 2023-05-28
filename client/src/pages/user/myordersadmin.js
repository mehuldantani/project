import React from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/adminmenu'

const Myadminorders = () => {
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
                <Adminmenu />
            </div>
            <div className='col-md-9'><h3>Your Orders</h3></div>
          </div>
        </div>
    </Layout>
    
  )
}

export default Myadminorders