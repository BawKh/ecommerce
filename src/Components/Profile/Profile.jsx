import  { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthStore'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { WishListContext } from '../../Context/WishListContext';


export default function Profile() {
    const {userData , token} =  useContext(AuthContext);
    const {deleteFromWishList} = useContext(WishListContext);
    const [data, setData] = useState(null);
    const [wishlist, setWishList] = useState(null);
    console.log(data);
    const navigate = useNavigate();

    async function fetchUserData(userID) {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${userID}`);
            console.log("User data fetched successfully:", response.data);
            setData( response.data.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            
        }
    }
    async function fetchUserWishlist() {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers: {token}});
            console.log("Wishlist fetched successfully:", response.data);
            setWishList(response.data.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }


    function handleDeleteFromWishlist(productId) {
        try {
            deleteFromWishList(productId , token)
                .then(() => {
                    fetchUserWishlist(); // Refresh wishlist after deletion
                })
                .catch((error) => {
                
                });
        } catch (error) {
            console.error("Error in handleDeleteFromWishlist:", error);
        }
        
    }
   

    useEffect(() => {
        if (!userData || !userData.id) {
            console.error("User data is not available or user ID is missing.");
            return;
        }else if (userData.id === "undefined") {
            console.error("User ID is undefined.");
            return;
        }else{
            console.log("Fetching user data...",userData?.id);
            fetchUserData(userData?.id)
            fetchUserWishlist();
        }
    }, [userData]);


    if (!data && !wishlist) {
        return  <div className="d-flex bg-secondary text-white justify-content-center align-items-center vh-100">
                <FadeLoader color='#fff' size={60} />
            </div>;
    }
  return (
    <>
    <Helmet>
        <title>Profile</title>
        <meta name="description" content="User profile page" />
    </Helmet>
    <h1 className='text-center'>Hello ya {data.role}</h1>
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <h4 className='fw-bold' >user Info</h4>
            <div className="row">
                <div className="">
                    <div className="card shadow-sm mt-2">
                        <div className="card-body">
                            <h5 className="card-title">Profile Information</h5>
                            <p className="card-text"><strong>Name:</strong> {data.name}</p>
                            <p className="card-text"><strong>Email:</strong> {data.email}</p>
                            <p className="card-text"><strong>Phone:</strong> {data.phone}</p>
                            <p className="card-text"><strong>Created At:</strong> {new Date(data.createdAt).toLocaleDateString()}</p>


                            <div className="d-flex justify-content-around align-items-center">

                                <button className='btn btn-primary ' onClick={() => navigate('/updateData/password') }>Change password</button>
                                <button className='btn btn-secondary' onClick={() => navigate('/updateData/userData') }>Update Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-8">
            <div className="row wishlist">
              <h4 className="mb-3 fw-bold">Wishlist</h4>
              {wishlist && wishlist.length > 0 ? (
                wishlist.map(product => (
                  <div className="col-md-6 col-lg-4 mb-4" key={product._id}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={product.imageCover}
                        className="card-img-top"
                        alt={product.title}
                        style={{ height: 180, objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-column align-self-center">
                              <h6 className="card-title">{product.title.split(' ').slice(0,2).join(' ')}</h6>
                              <p className="card-text text-muted small">{product.category?.name}</p>
                          </div>
                          <div className="">
                                <button
                                className="fs-4 text-danger rounded-circle p-3 border-0 shadow-none"
                                style={{ outline: "none", boxShadow: "none", backgroundColor: "transparent" }}
                                title="Remove from wishlist"
                                onClick={() => handleDeleteFromWishlist(product._id, token)}
                                tabIndex={-1}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">{product.price} EGP</span>
                          <span className="badge bg-info text-dark">
                            {product.brand?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted py-5">No items in wishlist.</div>
              )}
            </div>
        </div>
      </div>
    </div>

    
    </>
  )
}
