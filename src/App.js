import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main.js';
import SignUp from './pages/SignUp.js';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;