import { jwtDecode } from "jwt-decode";
import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthStoreProvider(props) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  // Check if the token is already in local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
      setUserData(jwtDecode(storedToken));
      console.log("userData from localStorage", jwtDecode(storedToken));
    }
  }, []);

  function getUserData(token) {
    const userData = jwtDecode(token);
    setUserData(userData);
    console.log("userData", userData);
  }

  return (
    <>
      <AuthContext.Provider value={{ token, setToken, userData, getUserData }}>
        {props.children}
      </AuthContext.Provider>
      ;
    </>
  );
}
