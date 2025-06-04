import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {ClipLoader} from 'react-spinners';
import { useNavigate } from 'react-router-dom';
export default function Register() {
 // states

 const [isSuccess, setIsSuccess] = useState(false)
 const [ErrorMsg, setErrorMsg] = useState(undefined)
 const [loading, setLoading] = useState(false)
 const navigate = useNavigate()


  // function handleRegister(e) {
  // Handle the registration logic here
  //   e.preventDefault();
  //   console.log("Register button clicked");
  // }

  async function setUserData(Data) {
    // Set user data in local storage
    const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',Data)

  }

  function onSubmit(values) {
    console.log(values);
    setLoading(true)
    // Call the setUserData function with the form values
    setUserData(values).then(() => {
      console.log("User data set successfully");
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/login')
      }, 3000);
      setLoading(false)

    }).catch((error) => {
      console.log(error.message);
      
      setErrorMsg(error.response.data.message);
      setTimeout(() => {
        setErrorMsg(undefined);
      }, 3000);
      setLoading(false)

    });
 
  }


  const mySchema = Yup.object({
    name: Yup.string().required("Name is required").matches(/^[A-Z][a-z]{3,7}$/, "Name must start with a capital letter and be between 4 to 8 characters long"),
    email: Yup.string().required("Email is required").email("Email must be in the format"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters long and contain at least one letter and one number"),
    rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref('password'), null], "Passwords do not match"),
    phoneNumber: Yup.string().required("Phone number is required").matches(/^(010|011|012|015)[0-9]{8}$/, "Phone number must start with 010, 011, 012, or 015 and be followed by 8 digits").length(11, "Phone number must be 11 digits long")
  })


  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phoneNumber: ""
  }
  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: onSubmit,
    // validate: (values) => {
    //   // Validate the form values
    //   const errors = {};
    //   const nameRegex = /^[A-Z][a-z]{3,7}$/;
    //   if (nameRegex.test(values.name) === false) {
    //     errors.name = "Name must start with a capital letter and be between 4 to 8 characters long";
    //   }
    //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //   if (emailRegex.test(values.email) === false) {
    //     errors.email = "Email must be in the format"
    //   }
    //   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    //   if (passwordRegex.test(values.password) === false) {
    //     errors.password = "Password must be at least 8 characters long and contain at least one letter and one number";
    //   }
    //   if (values.password !== values.rePassword) {
    //     errors.rePassword = "Passwords do not match";
    //   }
    //   const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    //   if (phoneRegex.test(values.phoneNumber) === false) {
    //     errors.phoneNumber = "Phone number must start with 010, 011, 012, or 015 and be followed by 8 digits";
    //   }
    //   if (values.phoneNumber.length !== 11) {
    //     errors.phoneNumber = "Phone number must be 11 digits long";
    //   }

    //   return errors;
    // },
    validationSchema:mySchema,
  });

  
  return (
    <>
    <div className="w-75 mx-auto p-5">

    {isSuccess && <div className="alert alert-success text-center">Congratulation your account has been created successfully.</div>}
    {ErrorMsg && <div className="alert alert-danger text-center"> {ErrorMsg}</div>}
      <h2 className='text-start'>Register Now:</h2>
      <form className='' onSubmit={myFormik.handleSubmit}> 


        <label htmlFor="name">name:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} type="text" className='form-control mb-3' id='name' placeholder='Enter your name' />
        {(myFormik.errors.name && myFormik.touched.name) ? <div className='alert alert-danger'>{myFormik.errors.name}</div>: ''}


        <label htmlFor="email">email:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" className='form-control mb-3' id='email' placeholder='Enter your email' />
        {(myFormik.errors.email && myFormik.touched.email) ? <div className='alert alert-danger'>{myFormik.errors.email}</div> : ''}


        <label htmlFor="password">password:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" className='form-control mb-3' id='password' placeholder='Enter your password' />
        {(myFormik.errors.password && myFormik.touched.password) ? <div className='alert alert-danger'>{myFormik.errors.password}</div> : ''}


        <label htmlFor="rePassword">RePassword:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} type="password" className='form-control mb-3' id='rePassword' placeholder='ReEnter your password' />
        {(myFormik.errors.rePassword && myFormik.touched.rePassword) ? <div className='alert alert-danger'>{myFormik.errors.rePassword}</div> : ''}


        <label htmlFor="phoneNumber">phone:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phoneNumber} type="text" className='form-control mb-3' id='phoneNumber' placeholder='Enter your phone number' />
        {(myFormik.errors.phoneNumber && myFormik.touched.phoneNumber) ? <div className='alert alert-danger'>{myFormik.errors.phoneNumber}</div> : ''}


        <div className="d-flex">
        <button type='submit' className={`${loading && 'no-touch'} btn bg-main text-light ms-auto`}>

          {loading ? <ClipLoader
        color={'#fff'}
        // loading={loading}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : 'Register'}
          </button>
        </div>
      </form>
    </div>
    </>
  )
}
