import React from 'react'
import Header from './header.js';
import { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
  return (
    <div>
      <Header/>
      <main style={{minHeight:'80vh'}}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      {children}
      </main>
      </div>
  )
}

export default layout