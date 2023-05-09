import React from 'react'
import Layout from '../components/layout/layout.js';
import {Link} from 'react-router-dom'

const pagenotfound = () => {
  return (
        <Layout>
            <div className='pnf'>
            <h1 className='pnf-title'>404</h1>
            <h2 className='pnf-detail'>Oops ! The page you were looking for could not be found.</h2>
            <Link to='/' className='pnf-btn'>Go Back</Link>
            </div>
        </Layout>
  )
}

export default pagenotfound;
