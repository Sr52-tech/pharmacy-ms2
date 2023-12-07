import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages routing
import Main from './pages/Main.js';
import SignUp from './pages/SignUp.js';
import LogIn from './pages/Login.js'
import { AddProducts } from './pages/AddProducts.js';
import { ProductsContext, ProductsContextProvider } from './global/ProductsContext';

function App() {
  return (
    <ProductsContextProvider>
      <Router>
        <div className="App">

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/addproducts" element={<AddProducts />} />
          </Routes>

        </div>
      </Router>
    </ProductsContextProvider>
  );
}

export default App;