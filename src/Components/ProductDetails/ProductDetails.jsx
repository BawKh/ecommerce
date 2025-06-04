import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    const {addToCart} = useContext(CartContext);
    const [mainImage, setMainImage] = useState(null);
    const {id} = useParams();
    console.log("Product ID:", id);
    async function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

 async function addProductToCart(productId) {
    // Function to add a product to the cart
    await addToCart(productId)
      .then(() => {
        console.log("Product added to cart successfully");
        toast.success("Product added to cart successfully", {
          icon: '✅',
          style: {
            background: '#333',
            color: '#fff',
          },
            duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Failed to add product to cart", error);
        toast.error("Failed to add product to cart", {
          icon: '❌',
          style: {
            background: '#333',
            color: '#fff',
          },
            duration: 3000,
        });
      });
    
  }



    const {data, isLoading , isError} = useQuery({
        queryKey: [`getProductDetails-${id}`],
        queryFn: getProductDetails,
        refetchOnMount: false,
        refetchInterval: 10000,
        cacheTime: 1000 * 60 * 60, // Cache for 1 hour
        enabled: true,
    });

  useEffect(() => {
        if (data?.data?.data?.imageCover) {
            setMainImage(data.data.data.imageCover);
        }
    }, [data]);



    if (isLoading) {
        return (
            <div className="d-flex bg-secondary text-white justify-content-center align-items-center vh-100">
                <FadeLoader color='#fff' size={60} />
            </div>
        );
    }

    if (isError) {
        return <Navigate to="/products" replace={true} />      
    }


    console.log("Product Details:", data.data.data);
    console.log( data.data.data);
    const product = data.data.data;
    
  return (
    <>
    <Helmet>
      <title>{product.title}</title>
      <meta name="description" content={product.description} />
    </Helmet>
<div className="container">
  <div className="row justify-content-center align-items-center my-5">
    {/* Image Gallery */}
    <div className="col-md-4">
                    <figure>
                        <img className="w-100 mb-3 rounded" src={mainImage} alt={product.title} />
                        <div className="d-flex flex-wrap gap-2">
                            {/* Cover image as first thumbnail */}
                            {product.images && product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={product.title + " " + (idx + 1)}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        objectFit: "cover",
                                        border: mainImage === img ? "2px solid #58A0E2" : "1px solid #eee",
                                        borderRadius: 8,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </figure>
                </div>
    {/* Product Details */}
    <div className="col-md-8">
      <article>
        <h1 className="mb-2">{product.title}</h1>
        <p className="text-muted">{product.description}</p>
        <p className="text-secondary mb-1">
          <strong>Category:</strong> {product.category?.name}
        </p>
        <p className="text-secondary mb-1">
          <strong>Brand:</strong> {product.brand?.name}
        </p>
        <p className="text-secondary mb-1">
          <strong>Sold:</strong> {product.sold}
        </p>
        <div className="mb-2">
          <span className="badge bg-info text-dark me-2">
            {product.subcategory?.map(sub => sub.name).join(", ")}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="price fs-4 fw-bold mb-0">{product.price} EGP</p>
          <p className="mb-0">
            <span className="fw-bold">{product.ratingsAverage}</span>
            <span>
              <i className="fa-solid fa-star mx-1" style={{ color: "gold" }}></i>
            </span>
            <span className="text-muted">({product.ratingsQuantity} reviews)</span>
          </p>
        </div>
        <button
          className="btn bg-main text-light w-100"
          onClick={() => addProductToCart(product._id)}
        >
          Add to Cart +
        </button>
      </article>
    </div>
  </div>
</div>
    </>
  )
}
