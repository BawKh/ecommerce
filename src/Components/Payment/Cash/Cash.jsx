import { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Cash() {
    const {cartID , getUserItems} =  useContext(CartContext);
    console.log(cartID);
    
    const navigate = useNavigate();

    function handlePayment(data) {
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, {
            shippingAddress: data
        }, {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }).then((res) => {
            toast.success("Payment successful:", res.data);
            // Here you can handle the success response, e.g., redirecting to a success page
            getUserItems(); // Refresh cart items after payment
            myFormik.resetForm(); // Reset the form after successful payment
            setTimeout(() => {
                navigate('/products'); // Redirect to products page after payment
            }, 2000);
        }).catch((error) => {
            toast.error("Error during payment:", error.response?.data?.message || error.message);
            console.error("Error during payment:", error);
            // Here you can handle the error response, e.g., showing an error message to the user
        });
    }

    const PayData = {
        city: '',
        phone: '',
        details: ''
    }


    // Formik setup
    const myFormik = useFormik({
        initialValues: PayData,
        onSubmit:handlePayment,
        validationSchema: Yup.object({
            city: Yup.string().required("City is required").min(3, "City must be at least 3 characters long"),
            phone: Yup.string().required("Phone is required").matches(/^(010|011|012|015)[0-9]{8}$/, "Phone must start with 010, 011, 012, or 015 and be followed by 8 digits").length(11, "Phone number must be 11 digits long"),
            details: Yup.string().required("Details are required").min(10, "Details must be at least 10 characters long")
        })
    });

  return (
    <>
    
               <form onSubmit={myFormik.handleSubmit} className='d-flex flex-column gap-3'>
            
            <div className="">
            <label htmlFor="city" className='fs-5 form-label' >City:</label>
            <input type="text" onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} id='city' className='form-control'  />
            {(myFormik.errors.city && myFormik.touched.city) ? <div className='alert alert-danger'>{myFormik.errors.city}</div>: ''}
            </div>

            <div>
            <label htmlFor="phone" className='fs-5 form-label' >Phone:</label>
            <input type="text"  onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} id='phone' className='form-control'  />
            {(myFormik.errors.phone && myFormik.touched.phone) ? <div className='alert alert-danger'>{myFormik.errors.phone}</div>: ''}
            </div>
                
            <div>
            <label htmlFor="details" className='fs-5 form-label' >Details:</label>
            <textarea type="text"  onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} style={{resize: 'none'}}   rows={4} id='details' className='form-control'></textarea>
            {(myFormik.errors.details && myFormik.touched.details) ? <div className='alert alert-danger'>{myFormik.errors.details}</div>: ''}
            </div>

            <button type='submit' className='btn bg-main text-light mt-3 w-100'>Confirm Payment</button>


            </form>
    
    </>
  )
}
