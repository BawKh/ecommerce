import React from 'react'

export default function Footer() {
  return (
    <>
    <div className='footer bg-body-tertiary text-dark  py-5 w-100'>
    <div className="container">

    <h3>Get The Fresh Cart App.</h3>
    <p className="text-secondary">We Will Send you A Link, Open It In Your Phone To Download The App.</p>
    <div className="row  align-items-center px-4">
      <div className="col-10">
      <input type="email" className='form-control  w-100' placeholder='Enter Your Email' />
      </div>
      <div className="col-2">
      <button className='btn bg-main text-light w-100'>Send</button>
      </div>
    </div>
    <div className=" row my-5 border-top border-bottom align-items-center border-secondary py-3">
    <div className="col-6 text-start">
        Payment Partners... 
        <span className='Payment-partners ms-2'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{height: '20px', marginRight: '5px'}} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" style={{height: '40px', marginRight: '5px'}} />
            
        </span>
      </div>
    <div className="col-6 text-end">Get Deliveries With Fresh Cart. <span className='Payment_methods  ms-2'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" style={{height: '30px', marginRight: '5px'}} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" style={{height: '30px', marginRight: '5px'}} />
          <img src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png" alt="Cash" style={{height: '30px', marginRight: '5px'}} />
        </span></div>
    </div>

    </div>
    </div>
    </>
  )
}
