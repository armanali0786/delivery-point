import './App.css';
import Navbar from './app/components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Login from './app/auth/Login';
import SignUp from './app/auth/SignUp';
import Home from './app/pages/Home';
import MenuList from './app/pages/MenuList';
import Footer from './app/pages/Footer';
import OtpVerify from './app/pages/OtpVerify';
import PageNotFound from './app/pages/PageNotFound';
import FoodDetails from './app/pages/FoodDetails';
import CartPage from './app/cart/cartPage';
import Search from './app/pages/Search';
import ProtectedRoute from './app/components/ProtectedRoute';
import Checkout from './app/pages/Checkout';
function App() {

  return (
    <>
      <div className="sticky w-full top-0 " style={{ zIndex: "999" }}>
        <Navbar />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/menu" element={<MenuList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/food-details/:pincode" element={<FoodDetails />} />
        <Route path="/food-details/:vendorId" element={<FoodDetails />} />
        <Route path="/cart" element={<CartPage />} />

        {/* <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} /> */}
        {/* <Route path="/cart" element={<ProtectedRoute Component={() => (<CartPage />)} />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <div className='bottom-0' >
        <Footer />
      </div>
    </>
  );
}

export default App;
