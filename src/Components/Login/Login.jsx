import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {ClipLoader} from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthStore';
export default function Login() {
 // states

 const [isSuccess, setIsSuccess] = useState(false)
 const [ErrorMsg, setErrorMsg] = useState(undefined)
 const [loading, setLoading] = useState(false)
 const navigate = useNavigate()
 const {setToken , getUserData} = useContext(AuthContext);

  
  // function handleRegister(e) {
  // Handle the registration logic here
  //   e.preventDefault();
  //   console.log("Register button clicked");
  // }

 
  async function onSubmit(values) {

    setLoading(true)
    // Call the setUserData function with the form values
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
  .then(({data}) => {
  try {
    const message = data?.message;
    const token = data?.token;
    if (message === "success" && token) {
      localStorage.setItem('userToken', token);
      setIsSuccess(true);
      setToken(token);
      getUserData(token);
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/products');
      }, 3000);
    } 
    setLoading(false);
  } catch (err) {
    console.error("Error in then block:", err);
    throw err; // This will go to the outer catch
  }
})
  .catch((error) => {
    console.log(error);
    setErrorMsg(
      error.response?.data?.message ||
      error.message 
    );
    setTimeout(() => {
      setErrorMsg(undefined);
    }, 3000);
    setLoading(false);
  });
 
  }


  const mySchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email must be in the format"),
    password: Yup.string()
            .required('New password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .matches(/\d/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character') })


  const userData = {
    email: "",
    password: "",
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

    {isSuccess && <div className="alert alert-success text-center">Welcome back.</div>}
    {ErrorMsg && <div className="alert alert-danger text-center"> {ErrorMsg}</div>}
      <h2 className='text-start'>Login Now:</h2>
      <form className='' onSubmit={myFormik.handleSubmit}> 


       

        <label htmlFor="email">email:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" className='form-control mb-3' id='email' placeholder='Enter your email' />
        {(myFormik.errors.email && myFormik.touched.email) ? <div className='alert alert-danger'>{myFormik.errors.email}</div> : ''}


        <label htmlFor="password">password:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" className='form-control mb-3' id='password' placeholder='Enter your password' />
        {(myFormik.errors.password && myFormik.touched.password) ? <div className='alert alert-danger'>{myFormik.errors.password}</div> : ''}


        <div className="d-flex align-items-center">
          <Link to={'/forgetPassword/forget'} className='text-danger me-auto'>Forget Password...</Link>
        <button type='submit' className={`${loading && 'no-touch'} btn bg-main text-light ms-auto`}>

          {loading ? <ClipLoader
        color={'#fff'}
        // loading={loading}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : 'Login'}
          </button>
        </div>
      </form>
    </div>
    </>
  )
}
