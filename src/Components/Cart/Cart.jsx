import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';
import { HashLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

export default function Cart() {
  // This component will display the cart items
  // You can use the CartContext to get the cart items and display them
  const {numOfCartItems,cartTotalPrice,cartItems , updateCount ,  removeItemFromCart , clearCart} =  useContext(CartContext);

  // Function to update the count of a product in the cart
  async function updateProductCount(id, count) {
    const res = await updateCount(id, count)
    if (res) {
      toast.success("Product count updated successfully",{position: 'top-right'});
    } else {
      toast.error("Failed to update product count",{position: 'top-right'});
    }
      
    }

  // Function to remove an item from the cart
    async function removeItemFromCartHandler(id) {
      const res = await removeItemFromCart(id);
      if (res) {
        toast.success("Product removed from cart successfully",{position: 'bottom-right'});
      } else {
        toast.error("Failed to remove product from cart",{position: 'bottom-right'});
      }
    }

  if (!cartItems){
    return <div className="d-flex bg-light text-white justify-content-center align-items-center vh-100">
        <HashLoader color='#888' size={60} />
      </div>
  }
  return (
    <>

    <Helmet>
      <title>Cart</title>
      <meta name="description" content="View and manage your shopping cart items." />
    </Helmet>


    <div className="container py-3" style={{  backgroundColor: "#eee" , height: `${numOfCartItems == 0 ? '50vh' : 'auto'}` }}>
      <h2>Shop Cart:</h2>
      <div className="d-flex justify-content-between align-items-center mb-1">
      <h4 className=' '>Number of Cart Items : {numOfCartItems}</h4>
      <h4 className=''>Total Cart Price : {cartTotalPrice} EGP</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button disabled={numOfCartItems == 0} className='btn btn-outline-danger mb-3' onClick={clearCart}>
          Clear Cart
        </button>
        <Link to='/payment' className={`text-decoration-none    ${numOfCartItems == 0 ? 'no-touch' : ''}`}>
        <button  className='btn btn-outline-primary mb-3'>
          Conform Payment 
        </button>
        </Link>
      </div>

      {cartItems?.map( (ele) => <div  className="row align-items-center bg-light pt-3  mb-3 rounded-4 border-bottom border-secondary" key={ele._id}>
        <div className="col-1">
          <figure>
            <img src={ele.product.imageCover} alt={ele.product.title} className='w-100' />
            {/* <figcaption className='text-center'></figcaption> */}
          </figure>
        </div>
        <div className="col-9">
          <article>
            <h3>{ele.product.title}</h3>
            <h5>Price: {ele.price}</h5>
            <button className='btn btn-outline-danger' onClick={() => removeItemFromCartHandler(ele.product._id)}>
              <i className='fa-solid fa-trash'></i> remove
            </button>
          </article>
        </div>
        <div className="col-2 d-flex justify-content-center align-items-center">
          <button onClick={() => updateProductCount(ele.product._id, ele.count + 1)} className='btn btn-outline-primary '>+</button>
          <span className='mx-2'>{ele.count}</span>
          <button disabled={ele.count == 1} onClick={() => updateProductCount(ele.product._id, ele.count - 1)} className='btn btn-outline-danger '>-</button>
        </div>
      </div>)}

    </div>
    </>
  )
}
