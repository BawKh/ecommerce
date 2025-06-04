import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import * as Yup from 'yup'



export default function Password() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  async function handleData({ currentPassword, rePassword , password }) {
    setIsLoading(true);
    await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
      currentPassword,
      password,
      rePassword,
    }, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }).then(({ data }) => {
      try {
        console.log("data", data);
        setIsLoading(false);
        toast.success('Password updated successfully');
        navigate('/profile');
        
      } catch (err) {
        console.error("Error in then block:", err);
        
      }
    }).catch((error) => {
      console.error("Error in catch block:", error);
      toast.error( error.response?.data?.message || error.message);
      setIsLoading(false);
    })
  }

  const myFormik = useFormik({
    initialValues: {
      rePassword: '',
      currentPassword: '',
      password: ''
    },
    onSubmit: handleData,
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
      password: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
      rePassword: Yup.string()
       .oneOf([Yup.ref('password'), null], "Passwords do not match").required('Re-entering password is required')
    })
  });

  return (
    <>

      {isLoading ?<div className='d-flex justify-content-center align-items-center' style={{height:'200px'}}><HashLoader color='#999' size={50} /></div>  : <div className="container text-center text-light py-5">
        <h2>Rest Password</h2>
        <p className='text-secondary'>Please enter your current Password and the new Password</p>
        <form onSubmit={myFormik.handleSubmit} className='d-flex flex-column align-items-center'>
          <input onChange={myFormik.handleChange} id='currentPassword' onBlur={myFormik.handleBlur} type="password" className='form-control w-75 mx-auto mb-3' placeholder='Enter Your Current Password' />
          {myFormik.touched.currentPassword && myFormik.errors.currentPassword && (
            <div className='alert alert-danger w-75'>{myFormik.errors.currentPassword}</div>
          )}
          <input onChange={myFormik.handleChange} id='password' onBlur={myFormik.handleBlur} type="password" className='form-control w-75 mx-auto mb-3' placeholder='Enter your new Password' />
          {myFormik.touched.password && myFormik.errors.password && (
            <div className='alert alert-danger w-75'>{myFormik.errors.password}</div>
          )}
          <input onChange={myFormik.handleChange} id='rePassword' onBlur={myFormik.handleBlur} type="password" className='form-control w-75 mx-auto mb-3' placeholder='ReEnter your new Password' />
          {myFormik.touched.rePassword && myFormik.errors.rePassword && (
            <div className='alert alert-danger w-75'>{myFormik.errors.rePassword}</div>
          )}
          <button type='submit' className='btn bg-main text-light w-75'>Send</button>
        </form>
      </div>}

    </>
  )
}


// Not123456?