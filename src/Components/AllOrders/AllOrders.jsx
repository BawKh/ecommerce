import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import { AuthContext } from '../../Context/AuthStore';
import { jwtDecode } from 'jwt-decode';


export default function AllOrders() {
  const { token } = useContext(AuthContext);

    // Only decode if token is a valid string
  let [userID, setUserID] = useState(localStorage.getItem('userID') || null);
  useEffect(() => {
    if (token && typeof token === "string" && token.trim() !== "") {
      try {
        const obj = jwtDecode(token);
        setUserID(obj.id);
        localStorage.setItem('userID', obj.id); // persist userID
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [token]);


  function getUserOrders() {
    if (!userID) return Promise.reject("No userID");
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`, );
  }

  const { data, isLoading } = useQuery({
    queryKey: ['userOrders'],
    queryFn: getUserOrders,
    enabled: !!userID, // Only run the query if userID is available
    refetchOnWindowFocus: false,
    refetchInterval: 3000, // 3 seconds
    refetchOnMount: true,
    refetchOnReconnect: false,
  });


  if (isLoading) {
    return (
      <div className="d-flex bg-light text-white justify-content-center align-items-center vh-100">
        <HashLoader color="#888" size={60} />
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center my-5">All Orders</h2>
      <div className="row justify-content-center">
        {data?.data.map((order, orderIdx) => (
          <div className="col-md-6" key={order._id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Order #{order.id}</h5>
                <p><strong>Payment Method:</strong> {order.paymentMethodType}</p>
                <p><strong>Status:</strong> {order.isDelivered ? "Delivered" : "Not Delivered"}</p>
                <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
                <p><strong>Total:</strong> ${order.totalOrderPrice}</p>
                <hr />
                <h6>Shipping Address</h6>
                <p>
                  <strong>City:</strong> {order.shippingAddress.city}<br />
                  <strong>Details:</strong> {order.shippingAddress.details}<br />
                  <strong>Phone:</strong> {order.shippingAddress.phone}
                </p>
                <hr />
                <h6>User</h6>
                <p>
                  <strong>Name:</strong> {order.user.name}<br />
                  <strong>Email:</strong> {order.user.email}
                </p>
                <hr />
                <h6>Products</h6>
                {/* Show only the first product */}
                {order.cartItems.length > 0 && (
                  <div className="d-flex align-items-center mb-3 border-bottom pb-2">
                    <img src={order.cartItems[0].product.imageCover} alt={order.cartItems[0].product.title} style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 16 }} />
                    <div>
                      <div><strong>{order.cartItems[0].product.title}</strong></div>
                      <div>Brand: {order.cartItems[0].product.brand.name}</div>
                      <div>Price: ${order.cartItems[0].price}</div>
                      <div>Quantity: {order.cartItems[0].count}</div>
                    </div>
                  </div>
                )}

                {/* Accordion for the rest of the products */}
                {order.cartItems.length > 1 && (
                  <div className="accordion" id={`accordionProducts${orderIdx}`}>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id={`heading${orderIdx}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${orderIdx}`}
                          aria-expanded="false"
                          aria-controls={`collapse${orderIdx}`}
                        >
                          Show {order.cartItems.length - 1} more product(s)
                        </button>
                      </h2>
                      <div
                        id={`collapse${orderIdx}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${orderIdx}`}
                        data-bs-parent={`#accordionProducts${orderIdx}`}
                      >
                        <div className="accordion-body">
                          {order.cartItems.slice(1).map(item => (
                            <div key={item._id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                              <img src={item.product.imageCover} alt={item.product.title} style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 16 }} />
                              <div>
                                <div><strong>{item.product.title}</strong></div>
                                <div>Brand: {item.product.brand.name}</div>
                                <div>Price: ${item.price}</div>
                                <div>Quantity: {item.count}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <small className="text-muted">Order created at: {new Date(order.createdAt).toLocaleString()}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}