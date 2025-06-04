import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import ValidationContextProvider from '../UpdateData/ValidationContext'
import GoUpArrow from '../GoUpArrow/GoUpArrow'



export default function Layout() {

 
  return (
    <>
    <ValidationContextProvider>
      <Navbar />

      <Outlet  />
      <GoUpArrow />
      <Footer />
    </ValidationContextProvider>
    
    </>
  )
}
