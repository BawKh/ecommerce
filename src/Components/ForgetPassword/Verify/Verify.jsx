import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import * as Yup from 'yup'


export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleData({ code }) {
    setIsLoading(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
      resetCode: code,
    }).then(({ data }) => {
      try {
        const message = data?.status;
        console.log("Response message:", data);
        if (message === "Success") {
          toast.success('Reset code verified successfully');
          setIsLoading(false);
            navigate('/forgetPassword/reset');
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
      code: ''
    },
    onSubmit: handleData,
    validationSchema: Yup.object({
      code: Yup.string().required('Code is required').length(6, 'Code must be exactly 6 characters').matches(/^\d+$/, 'Code must be a number')
    })
  });

  return (
    <>

      {isLoading ?<div className='d-flex justify-content-center align-items-center' style={{height:'200px'}}><HashLoader color='#999' size={50} /></div>  : <div className="container text-center text-light py-5">
        <h2>Rest Code</h2>
        <p className='text-secondary'>Please enter the rest code that sent to your email.</p>
        <form onSubmit={myFormik.handleSubmit} className='d-flex flex-column align-items-center'>
          <input onChange={myFormik.handleChange} id='code' onBlur={myFormik.handleBlur} type="text" className='form-control w-75 mx-auto mb-3' placeholder='Enter The Code' />
          {myFormik.touched.code && myFormik.errors.code && (
            <div className='alert alert-danger w-75'>{myFormik.errors.code}</div>
          )}
          <button type='submit' className='btn bg-main text-light w-75'>Send</button>
        </form>
      </div>}

    </>
  )
}
