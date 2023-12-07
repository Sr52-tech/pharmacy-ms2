import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages routing
import Main from './pages/Main.js';
import SignUp from './pages/SignUp.js';
import LogIn from './pages/Login.js'
import Products from './pages/Products.js';
import StaffDashboard from './pages/Staff_Dashboard.js';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<StaffDashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;