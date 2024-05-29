import './App.css';
import "@stripe/stripe-js";
import Navbar from './app/components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Checkout from './app/pages/Checkout';
import Profile from './app/pages/Profile/Profile';
import Orders from './app/pages/Profile/Orders';
import Favourites from './app/pages/Profile/Favourites';
import Address from './app/pages/Profile/Address';
import SuccessPayment from './app/pages/SuccessPayment';
import CancelPayment from './app/pages/CancelPayment';
import DeliveryOne from './app/pages/Profile/DeliveryOne';
import PaymentSections from './app/pages/PaymentSections';
import Payments from './app/pages/Profile/Payments';
import { LoadingFoods } from './app/components/LoadingFoods';
import ProtectedRoute from './app/components/ProtectedRoute';
import OrderDetails from './app/pages/Profile/OrderDetails';
import Chatbot from './app/pages/Chatbot';
import PrivacyPolicy from './app/pages/PrivacyPolicy';
import WhoWeAre from './app/pages/WhoWeAre';
import ContactUs from './app/pages/ContactUs';
import TermCondition from './app/pages/TermCondition';
import Support from './app/pages/Support';
function App() {
  const location = useLocation();

  const shouldDisplayFooter = () => {
    const { pathname } = location;
    return !(
      pathname.includes('/profile')
      || pathname.includes('/food-details')
      || pathname.includes('/checkout')
      || pathname.includes('/payment')
      || pathname.includes('/order-details')
      || pathname.includes('/privacy-policy')
      || pathname.includes('/who-we-are')
      || pathname.includes('/support')
      || pathname.includes('/terms-and-conditions')
      || pathname.includes('/contact-us')

    );
  };

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
        <Route path="/payment-success" element={<SuccessPayment />} />
        <Route path="/payment-cancel" element={<CancelPayment />} />
        <Route path="/payment" element={<PaymentSections />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms-and-conditions" element={<TermCondition />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />}>
          <Route path="orders" element={<Orders />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="payments" element={<Payments />} />
          <Route path="manage_addresses" element={<Address />} />
          <Route path="super" element={<DeliveryOne />} />
          <Route path="order-details/:orderId" element={<OrderDetails />} />
        </Route>
        <Route path="/chat-bot" element={<Chatbot />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {shouldDisplayFooter() && (
        <div className='bottom-0'>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
