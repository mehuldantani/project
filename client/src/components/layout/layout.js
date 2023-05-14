import React from 'react'
import Header from './header.js';
import { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
  return (
    <div>
      <Header/>
      <main style={{minHeight:'80vh'}}>
      <Toaster
        toastOptions={{
          duration: 3000
        }}
      />
      {children}
      </main>
      </div>
  )
}

export default layout