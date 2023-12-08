import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages routing
import Main from './pages/Main.js';
import SignUp from './pages/SignUp.js';
import React from 'react';
import LogIn from './pages/Login.js'
import { AddProducts } from './pages/AddProducts.js';
import { ProductsContext, ProductsContextProvider } from './global/ProductsContext';
import StaffDashboard from './pages/Staff_Dashboard.js';
import { MedicineProducts } from './pages/MedicineProducts.jsx';
import { CosmeticProducts } from './pages/CosmeticProducts.jsx';
import { HygieneProducts } from './pages/HygieneProducts.jsx';
import { auth, db } from './firebase-config';

export class App extends React.Component {

  state = {
    user: null,
    role: 'user'
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).get().then(snapshot => {
          this.setState({
            user: snapshot.data().Name,
            role: snapshot.data().Role
          })
        })
      } else {
        this.setState({
          user: null,
          role: 'user'
        })
      }
    })
  }


  render() {
    return (
      <ProductsContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={() => <Main user={this.state.user} role={this.state.role} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
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