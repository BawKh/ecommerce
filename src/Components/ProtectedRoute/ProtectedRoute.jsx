import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {

    // Here you would typically check if the user is authenticated
 // Empty dependency array to run only once
    if (!localStorage.getItem("userToken")) {
        // If not authenticated, redirect to login or show an error
        return <Navigate to={'/login'} />; // Prevent rendering the protected component
    }
  return (
    <>
    {children}
    </>
  )
}
