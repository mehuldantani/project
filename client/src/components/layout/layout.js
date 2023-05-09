import React from 'react'
import Header from './header.js'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const layout = ({children}) => {
  return (
    <div>
      <Header/>
      <main style={{minHeight:'80vh'}}>
        <ToastContainer/>
      {children}
      </main>
      </div>
  )
}

export default layout