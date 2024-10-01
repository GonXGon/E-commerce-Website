import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductPage from './pages/Product/ProductPage/ProductPage';
import Signup from './pages/User/SignUp/Signup';
import Login from './pages/User/Login/Login';
import './index.css';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
