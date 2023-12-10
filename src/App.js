import { BrowserRouter as Router, Route, Routes, Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
// pages routing
import Main from './pages/Main.js';
import { Signup } from './pages/Signup.jsx';
import React from 'react';
import { Login } from './pages/Login.jsx'
import { AddProducts } from './pages/AddProducts.js';
import { ProductsContextProvider } from './global/ProductsContext';
import StaffDashboard from './pages/Staff_Dashboard.js';
import { MedicineProducts } from './pages/MedicineProducts.jsx';
import { CosmeticProducts } from './pages/CosmeticProducts.jsx';
import { HygieneProducts } from './pages/HygieneProducts.jsx';
import Nav from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Cart from './pages/Cart.js';
import Product from './components/Product.js';
export class App extends React.Component {



  Layout() {
    return (
      <div>
        <Nav />
        <ScrollRestoration />
        <Outlet />
        <Footer />
      </div>
    )
  }

  router = createBrowserRouter([
    {
      path: '/',
      element: <this.Layout />,
      children: [
        {
          path: '/',
          element: <Main />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/medicine',
          element: <MedicineProducts />
        },
        {
          path: '/cosmetic',
          element: <CosmeticProducts />
        },
        {
          path: '/hygiene',
          element: <HygieneProducts />
        },
        {
          path: '/addproducts',
          element: <AddProducts />
        },
        {
          path: '/dashboard',
          element: <StaffDashboard />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/product/:id',
          element: <Product />
        }
      ]
    }
  ])



  render() {
    return (
      <RouterProvider router={this.router} />
    );
  }
}

export default App;