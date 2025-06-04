import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import * as Yup from 'yup'
import { AuthContext } from '../../../Context/AuthStore';


export default function Reset() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setToken} = useContext(AuthContext);

  async function handleData({ email, newPassword }) {
    setIsLoading(true);
    await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
      email,
      newPassword,
    }).then(({ data }) => {
      try {

        setIsLoading(false);
        toast.success('Password reset successfully');
        navigate('/login');
        
      } catch (err) {
        console.error("Error in then block:", err);
      }
    }).catch((error) => {
      console.error("Error in catch block:", error);
      setIsLoading(false);
    })
  }

  const myFormik = useFormik({
    initialValues: {
      newPassword: '',
      email: ''
    },
    onSubmit: handleData,
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    })
  });

  return (
    <>

      {isLoading ?<div className='d-flex justify-content-center align-items-center' style={{height:'200px'}}><HashLoader color='#999' size={50} /></div>  : <div className="container text-center text-light py-5">
        <h2>Rest Password</h2>
        <p className='text-secondary'>Please enter your email and the new Password</p>
        <form onSubmit={myFormik.handleSubmit} className='d-flex flex-column align-items-center'>
          <input onChange={myFormik.handleChange} id='email' onBlur={myFormik.handleBlur} type="email" className='form-control w-75 mx-auto mb-3' placeholder='Enter Your Email' />
          {myFormik.touched.email && myFormik.errors.email && (
            <div className='alert alert-danger w-75'>{myFormik.errors.email}</div>
          )}
          <input onChange={myFormik.handleChange} id='newPassword' onBlur={myFormik.handleBlur} type="password" className='form-control w-75 mx-auto mb-3' placeholder='Enter Your New Password' />
          {myFormik.touched.newPassword && myFormik.errors.newPassword && (
            <div className='alert alert-danger w-75'>{myFormik.errors.newPassword}</div>
          )}
          <button type='submit' className='btn bg-main text-light w-75'>Send</button>
        </form>
      </div>}

    </>
  )
}


// Not123456?