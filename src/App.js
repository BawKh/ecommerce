import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import AuthStoreProvider from "./Context/AuthStore";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import Cash from "./Components/Payment/Cash/Cash";
import CheckOut from "./Components/Payment/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
import Profile from "./Components/Profile/Profile";
import { Online, Offline } from "react-detect-offline";
import Brands from "./Components/Brands/Brands";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Forgot from "./Components/ForgetPassword/Forgot/Forgot";
import Verify from "./Components/ForgetPassword/Verify/Verify";
import Reset from "./Components/ForgetPassword/Reset/Reset";
import UpdateData from "./Components/UpdateData/UpdateData";

import UserData from "./Components/UpdateData/UserData";
import Password from "./Components/UpdateData/Password";
import WishListContextProvider from "./Context/WishListContext";
import ProtectedAfterLogin from "./Components/ProtectedRoute/ProtectedAfterLogin";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      localStorage.getItem("userToken")
        ? {
            index: true,
            element: (
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            ),
          }
        : {
            index: true,
            element: (
              <>
                <ProtectedAfterLogin>
                  <Register />
                </ProtectedAfterLogin>
              </>
            ),
          },
      {
        path: "register",
        element: (
          <>
            <ProtectedAfterLogin>
              <Register />
            </ProtectedAfterLogin>
          </>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "updateData",
        element: (
          <ProtectedRoute>
            <UpdateData />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "password",
            element: (
              <ProtectedRoute>
                <Password />
              </ProtectedRoute>
            ),
          },
          {
            path: "userData",
            element: (
              <ProtectedRoute>
                <UserData />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetPassword",
        element: (
          <ProtectedAfterLogin>
            <ForgetPassword />
          </ProtectedAfterLogin>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedAfterLogin>
                <Forgot />
              </ProtectedAfterLogin>
            ),
          },
          {
            path: "forget",
            element: (
              <ProtectedAfterLogin>
                <Forgot />
              </ProtectedAfterLogin>
            ),
          },
          {
            path: "verify",
            element: (
              <ProtectedAfterLogin>
                <Verify />
              </ProtectedAfterLogin>
            ),
          },
          {
            path: "reset",
            element: (
              <ProtectedAfterLogin>
                <Reset />
              </ProtectedAfterLogin>
            ),
          },
        ],
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
        children: [
          // {
          //   index: true,
          //   element: (
          //     <ProtectedRoute>
          //       <Cash />
          //     </ProtectedRoute>
          //   ),
          // },
          {
            path: "cash",
            element: (
              <ProtectedRoute>
                <Cash />
              </ProtectedRoute>
            ),
          },
          {
            path: "online",
            element: (
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "login",
        element: (
          <ProtectedAfterLogin>
            <Login />
          </ProtectedAfterLogin>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <AuthStoreProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={Routes} />
            </WishListContextProvider>
          </CartContextProvider>
        </AuthStoreProvider>
      </QueryClientProvider>
      <Toaster />
      <Offline>
        <p className="text-center text-light bg-dark fixed-bottom">
          You are offline
        </p>
      </Offline>
    </>
  );
}
