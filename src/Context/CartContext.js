import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthStore";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const CartContext = React.createContext();

export default function CartContextProvider({ children }) {
  // Get the token from AuthContext
  const { token } = useContext(AuthContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState(null);
  const [cartID, setCartID] = useState(null);
  const [userID, setUserID] = useState(localStorage.getItem("userID") || null);

  // Function to add a product to the cart
  const addToCart = async (id) => {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        console.log("Product added to cart:", response.data);

        getUserItems(); // Refresh cart items after adding a product
      })
      .catch((error) => {
        console.error(
          "Error adding product to cart:",
          error.response?.data?.message || error.message
        );
      });
  };

  // Function to fetch cart items
  const getUserItems = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log("Cart items fetched successfully:", res.data);

        setCartID(res.data.data._id);
        console.log("Cart ID:", res.data.data._id);
        setUserID(res.data.data.cartOwner);
        console.log("User context ID:", res.data.data.cartOwner);
        localStorage.setItem("userID", res.data.data.carOwner);

        // Update state with fetched cart items
        setCartItems(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setCartTotalPrice(res.data.data.totalCartPrice);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  // Function to update the count of a cart item
  async function updateCount(id, count) {
    const booleanFlag = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        console.log("Cart item count updated:", response.data);
        // getUserItems();

        // Refresh cart items after updating count
        setCartItems(response.data.data.products);
        setNumOfCartItems(response.data.numOfCartItems);
        setCartTotalPrice(response.data.data.totalCartPrice);
        setCartID(response.data.data._id);
        return true; // Return true if update was successful
      })
      .catch((error) => {
        console.error(
          "Error updating cart item count:",
          error.response?.data?.message || error.message
        );
        return false; // Return false if there was an error
      });
    return booleanFlag;
  }

  async function removeItemFromCart(id) {
    const flag = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        console.log("Cart item removed successfully:", response.data);
        // getUserItems();
        // Refresh cart items after removing an item
        setCartItems(response.data.data.products);
        setNumOfCartItems(response.data.numOfCartItems);
        setCartTotalPrice(response.data.data.totalCartPrice);
        setCartID(response.data.data._id);
        return true; // Return true if removal was successful
      })
      .catch((error) => {
        console.error(
          "Error removing cart item:",
          error.response?.data?.message || error.message
        );
        return false; // Return false if there was an error
      });
    return flag;
  }

  async function clearCart() {
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        console.log("Cart cleared successfully:", response.data);
        setCartItems([]);
        setNumOfCartItems(0);
        setCartTotalPrice(0);
        setCartID(null);
        toast.success("Cart cleared successfully", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error(
          "Error clearing cart:",
          error.response?.data?.message || error.message
        );
        toast.error(
          `Error clearing cart:
          ${error.response?.data?.message || error.message}`,
          {
            position: "top-center",
          }
        );
      });
  }

  useEffect(() => {
    // Fetch cart items when the component mounts
    if (token) {
      const decoded = jwtDecode(token);
      setUserID(decoded.id); // Set userID from decoded token
      getUserItems();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        numOfCartItems,
        cartItems,
        cartTotalPrice,
        updateCount,
        removeItemFromCart,
        clearCart,
        getUserItems,
        cartID,
        userID,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
