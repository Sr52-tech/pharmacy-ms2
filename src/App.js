import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages routing
import Main from './pages/Main.js';
import SignUp from './pages/SignUp.js';
import React from 'react';
import { Login } from './components/LoginForm.jsx'
import { AddProducts } from './pages/AddProducts.js';
import { ProductsContext, ProductsContextProvider } from './global/ProductsContext';
import StaffDashboard from './pages/Staff_Dashboard.js';
import { MedicineProducts } from './pages/MedicineProducts.jsx';
import { CosmeticProducts } from './pages/CosmeticProducts.jsx';
import { HygieneProducts } from './pages/HygieneProducts.jsx';
import { auth, db } from './firebase-config';
import { collection, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
export class App extends React.Component {

  render() {
    return (
      <ProductsContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/medicine" element={<MedicineProducts />} />
            <Route path="/cosmetic" element={<CosmeticProducts />} />
            <Route path="/hygiene" element={<HygieneProducts />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/dashboard" element={<StaffDashboard />} />
          </Routes>
        </Router>
      </ProductsContextProvider>
    );
  }
}

export default App;