
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import * as Yup from 'yup'



export default function UserData() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  async function handleData({ email, name , phone }) {
    setIsLoading(true);
    await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
      name,
      email,
      phone,
    }, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }).then(({ data }) => {
      try {
        console.log("data", data);
        setIsLoading(false);
        toast.success('Data updated successfully');
        navigate('/profile');
        
      } catch (err) {
        console.error("Error in then block:", err);
        
      }
    }).catch((error) => {
      console.error("Error in catch block:", error);
      toast.error( error.response?.data?.errors.msg || error.message);
      setIsLoading(false);
    })
  }

  const myFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },
    onSubmit: handleData,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").matches(/^[A-Z][a-z]{3,7}$/, "Name must start with a capital letter and be between 4 to 8 characters long"),
      email: Yup.string().required("Email is required").email("Email must be in the format"),
      phone: Yup.string().required("Phone number is required").matches(/^(010|011|012|015)[0-9]{8}$/, "Phone number must start with 010, 011, 012, or 015 and be followed by 8 digits").length(11, "Phone number must be 11 digits long")
      })
  });

  return (
    <>

      {isLoading ?<div className='d-flex justify-content-center align-items-center' style={{height:'200px'}}><HashLoader color='#999' size={50} /></div>  : <div className="container text-center text-light py-5">
        <h2>Change Data</h2>
        <p className='text-secondary'>Please enter your email , name and phone Number.</p>
        <form onSubmit={myFormik.handleSubmit} className='d-flex flex-column align-items-center'>
          <input onChange={myFormik.handleChange} id='name' onBlur={myFormik.handleBlur} type="text" className='form-control w-75 mx-auto mb-3' placeholder='Enter Your new Name' />
          {myFormik.touched.name && myFormik.errors.name && (
            <div className='alert alert-danger w-75'>{myFormik.errors.name}</div>
          )}
          <input onChange={myFormik.handleChange} id='email' onBlur={myFormik.handleBlur} type="email" className='form-control w-75 mx-auto mb-3' placeholder='Enter your new Email' />
          {myFormik.touched.email && myFormik.errors.email && (
            <div className='alert alert-danger w-75'>{myFormik.errors.email}</div>
          )}
          <input onChange={myFormik.handleChange} id='phone' onBlur={myFormik.handleBlur} type="phone" className='form-control w-75 mx-auto mb-3' placeholder='Enter your new phone number.' />
          {myFormik.touched.phone && myFormik.errors.phone && (
            <div className='alert alert-danger w-75'>{myFormik.errors.phone}</div>
          )}
          <button type='submit' className='btn bg-main text-light w-75'>Send</button>
        </form>
      </div>}

    </>
  )
}


// Not123456?