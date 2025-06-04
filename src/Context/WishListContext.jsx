import axios from 'axios';
import React, { Children } from 'react'
import toast from 'react-hot-toast';


export const WishListContext = React.createContext();

export default function WishListContextProvider({children}) {
  async function addToWishList(id) {
    // Function to add a product to the wishlist
    await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    ).then((response) => {
      console.log("Product added to wishlist:", response.data);
      toast.success("Product added to wishlist successfully", {
        duration: 1000,
      });
      // Optionally, you can refresh the wishlist items here
    }).catch((error) => {
      console.error("Error adding product to wishlist:", error.response?.data?.message || error.message);
      toast.error("Failed to add product to wishlist", {
        duration: 1000,
      });
    });
    // Implement the API call to add the product to the wishlist
  }
  async function deleteFromWishList(id , token) {
    await axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id, {
      headers: {
        token: token,
      },
    }).then((response) => {
      console.log("Product removed from wishlist:", response.data);
      toast.success("Product removed from wishlist successfully", {
        duration: 1000,
      });
    }).catch((error) => {
      console.error("Error removing product from wishlist:", error.response?.data?.message || error.message);
      toast.error("Failed to remove product from wishlist", {
        duration: 1000,
      });
    });
  }
  return (
    <WishListContext.Provider value={{addToWishList, deleteFromWishList}}>{children}</WishListContext.Provider>
  )
}
