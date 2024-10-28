import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import Home from './Pages/Home/Home';
import Signup from './Pages/User/SignUp/Signup';
import Login from './Pages/User/Login/Login';
import Admin from './Pages/User/Admin/Admin';
import ProductPage from './Pages/Product/ProductPage/ProductPage';
import ProjectDetail from './Pages/Product/ProductDetail/ProjectDetail';
import Cartpage from './Pages/Cart/Cartpage';

import Checkout from './Pages/Product/Checkout/Checkout';

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
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/project-detail" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
