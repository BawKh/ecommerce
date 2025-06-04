import React, { createContext, useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const ValidationContext = createContext();

    

export default function ValidationContextProvider({children}) {
    const {setToken , token} = useContext(AuthContext);
    const navigate = useNavigate();

    async function handelValidation() {
        await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
            headers:{
                token :  localStorage.getItem('userToken')
            }
        }).then((res) => {
            if (res.data.message == 'verified'){

                console.log('valid Token');
            }else{
                  toast.error('UN Valid Token LogOut Automatically....', {duration: 2000})
                    setTimeout(() => {
                        handleLogout();
                    },2000)
            }
          
        }).catch((err) => {
            console.log(err)
            toast.error('UN Valid Token LogOut Automatically....', {duration: 2000})
            setTimeout(() => {
                handleLogout();
            },2000)
        })
    }

    useEffect(() => {
  // Run on mount and when token changes
  if (localStorage.getItem('userToken')) {

      handelValidation();
      
      // Listen for localStorage changes (from other tabs)
      function handleStorageChange(e) {
          if (e.key === "userToken") {
              handelValidation();
            }
        }
        window.addEventListener("storage", handleStorageChange);
        
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }
}, [token]);

    function handleLogout() {
    // remove the token from the context
    setToken(null);
    // Clear the token from local storage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userID");
    // Redirect to the login page
    navigate("/login");
    }
  return (
    <ValidationContext.Provider value={{handleLogout , handelValidation}} >{children}</ValidationContext.Provider>
  )
}
