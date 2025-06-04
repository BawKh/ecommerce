import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import * as Yup from 'yup'


export default function Forgot() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleData({ email }) {
    setIsLoading(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
      email
    }).then(({ data }) => {
      try {
        const message = data?.statusMsg;
        console.log("Response message:", data);
        if (message === "success") {
          toast.success("Reset code sent to email:", email);
          setIsLoading(false);
            navigate('/forgetPassword/verify');
        } else {
          toast.error(`Unexpected response: ${data.message}`);
        }
      } catch (err) {
        console.error("Error in then block:", err);
      }
    })
  }

  const myFormik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: handleData,
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required')
    })
  });

  return (
    <>

      {isLoading ?<div className='d-flex justify-content-center align-items-center' style={{height:'200px'}}><HashLoader color='#999' size={50} /></div>  : <div className="container text-center text-light py-5">
        <h2>Forget Password</h2>
        <p className='text-secondary'>Please enter your email address to reset your password.</p>
        <form onSubmit={myFormik.handleSubmit} className='d-flex flex-column align-items-center'>
          <input onChange={myFormik.handleChange} id='email' onBlur={myFormik.handleBlur} type="email" className='form-control w-75 mx-auto mb-3' placeholder='Enter Your Email' />
          {myFormik.touched.email && myFormik.errors.email && (
            <div className='alert alert-danger w-75'>{myFormik.errors.email}</div>
          )}
          <button type='submit' className='btn bg-main text-light w-75'>Send Reset code</button>
        </form>
      </div>}

    </>
  )
}
