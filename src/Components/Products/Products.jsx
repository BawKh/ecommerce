import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
// import  {  useEffect , useState} from 'react'
import { HashLoader } from 'react-spinners';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../../Context/WishListContext';

export default function Products() {
  const {addToCart} = useContext(CartContext);
  const {addToWishList} = useContext(WishListContext);

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
  function addProductToWishList(productId) {
    addToWishList(productId);

  }

  // const [allProducts, setAllProducts] = useState(null)

  // This component will display a list of products

  function fetchProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    // axios.get('https://ecommerce.routemisr.com/api/v1/products')
    // .then( (res) => {
    //   console.log("Products fetched successfully", res.data);
    //   setAllProducts(res.data.data);
      
    // })
    // .catch( (error) => {
    //   console.log("Error fetching products", error.message);
      
    // });
  }

  //   useEffect(() => {
  //   Fetch products when the component mounts
  //   fetchProducts();
  // }, []);
  // console.log("All Products:", allProducts);
  
  const { data, isLoading , /*refetch*/} = useQuery({
  queryKey: ['getAllProducts'],
  queryFn: fetchProducts,
  refetchOnMount: false,
  refetchInterval: 3000, 
  cacheTime: 1000 * 60 * 60, // Cache for 1 hour
  enabled: true, // Disable automatic fetching
});
  // console.log(data?.data.data, "Products Data");
  if (isLoading) {
    return (
      <div className="d-flex bg-secondary text-white justify-content-center align-items-center vh-100">
        <HashLoader color='#fff' size={60} />
      </div>
    );
  }

  return (
    <>

    <Helmet>
      <title>Products</title>
      <meta name="description" content="Browse our wide range of products." />
    </Helmet>
    {/* <button className='btn btn-info w-100' onClick={refetch}>Click</button> */}
    <div className="container">

          <div className='mb-5' style={{ height: "500px" }}>
          <div className="row h-100 m-0">
            <div className="col-9 pe-0 py-0 m-0 " >
              <HomeSlider />
            </div>
            <div className="col-3 ps-0 py-0 m-0 h-100" >
                  <div className="h-100 d-flex flex-column">
                  <img
                    className="img-fluid h-50 w-100"
                    style={{  height: '230px'}}
                    src={require('../../images/grocery-banner.png')}
                    alt="Slider 2"
                  />       
                  <img
                    className="img-fluid h-50 w-100"
                    style={{height: '230px' }}
                    src={require('../../images/grocery-banner-2.jpeg')}
                    alt="Slider 3"
                  />
                
              
            </div>
            </div>

        </div>
      </div>

        <CategorySlider />


      <div className="row gy-4 my-5 justify-content-center">
        {data?.data.data.map((product , idx) => (
          <div className="col-md-2 product" key={product._id}> 
            <Link to={`/productDetails/${product._id}/${product.category.name}`} className='text-decoration-none text-dark'>
            <div className="">
              {/* Image cover*/ }
              <img src={product.imageCover} alt="Product" className="img-fluid" />
              <h3 className='h6 text-main fw-bold'>{product.category.name}</h3>
              <h2 className='h6 text-start'>{product.title.split(' ').splice(0,2).join(' ')}</h2>
              <div className="d-flex justify-content-between">
             { product.priceAfterDiscount ? <p className="price"> <del>{product.price}</del> - {product.priceAfterDiscount}EGP</p> : <p className="price">{product.price}EGP</p>}
              <p className='fs-6'>{product.ratingsAverage} <span><i className='fa-solid fa-star' style={{color:'gold'}}></i></span></p>
              </div>
            </div>
          </Link>
            <button className='btn bg-main text-light w-100 mb-1' style={{cursor:'pointer'}} onClick={() => addProductToCart(product._id)}>Add to Cart +</button>
            <button className='btn bg-secondary text-light w-100 mb-2' style={{cursor:'pointer'}} onClick={() => addProductToWishList(product._id)}>Add to WishList <i className='fa-solid fa-heart'></i></button>
          </div>
        ))}
        
        {/* Example product for layout */ }
      </div>
    </div>


   {/* { allProducts ? <div className="container">
      <div className="row gy-4">
        {allProducts.map((product) => (
          <div className="col-md-2" key={product._id}>
            <div className="product">
              
              <img src={product.imageCover} alt="Product" className="img-fluid" />
              <h3 className='h6 text-main fw-bold'>{product.category.name}</h3>
              <h2 className='h6 text-start'>{product.title.split(' ').splice(0,2).join(' ')}</h2>
              <div className="d-flex justify-content-between">
             { product.priceAfterDiscount ? <p className="price"> <del>{product.price}</del> - {product.priceAfterDiscount}EGP</p> : <p className="price">{product.price}EGP</p>}
              <p className='fs-6'>{product.ratingsAverage} <span><i className='fa-solid fa-star' style={{color:'gold'}}></i></span></p>
              </div>
            </div>
          </div>
        ))}
        
        
      </div>
    </div> :<div className="d-flex bg-secondary text-white justify-content-center align-items-center vh-100">
      <HashLoader color='#fff' size={60}  />
    </div>} */}
    
    </>
  )
}
