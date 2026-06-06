import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Storefront from './pages/Storefront.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-brandDark text-white">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
