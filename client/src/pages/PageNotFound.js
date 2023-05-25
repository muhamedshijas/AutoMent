import React from 'react'
import { Link } from 'react-router-dom'
import NotFound from '../assets/images/error.png'
import'./PageNotfound.css'

function PageNotFound() {
  return (
    <div className='full-page'>
    
    <div className="not-found">
   <h5>Error</h5>
  <h1> 404</h1>
      <p>  we can't find the page that you are looking for :( </p>
    <Link to='/'>
    <button> Go Back</button>
    </Link>
    </div>
    
    </div>
  )
}

export default PageNotFound