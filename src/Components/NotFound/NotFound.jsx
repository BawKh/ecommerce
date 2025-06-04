import React from 'react'
import notFoundImage from '../../images/error.svg'
export default function NotFound() {
  return (
    <>
    
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <img className='w-100' src={notFoundImage} alt='notFound' />
        </div> 
        </div>
    
    </>
  )
}
