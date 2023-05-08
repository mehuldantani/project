import React from 'react'
import Header from './header.js'

const layout = ({children}) => {
  return (
    <div>
      <Header/>
      <main style={{minHeight:'80vh'}}>
      {children}
      </main>
      </div>
  )
}

export default layout