import './App.scss';
import Categories from './components/categories/Categories';
import Children from './components/productlist/children/Children';
import Men from './components/productlist/men/Men';
import Women from './components/productlist/women/Women';
import Slider from './components/slider/Slider';
import {Routes, Route} from "react-router-dom"
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import ForgotPassword from './components/auth/forgotpassword/ForgotPassword';
import ResetPassword from "./components/auth/resetpassword/ResetPassword"
import VerifySuccess from './components/auth/verifysuccess/VerifySuccess';
import Cart from './components/cart/Cart';
import AdminOnlyRoute from './components/adminonlyroute/AdminOnlyRoute';
import Admin from './components/admin/Admin';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './components/checkout/CheckOut';
import CheckOutSuccess from './components/checkout/CheckOutSuccess';
import CheckoutDetails from './components/checkout/CheckoutDetails';
import Orders from './components/orders/Orders';
import OrderDetails from './components/orderdetails/OrderDetails';
import SinglePage from './components/singlepage/SinglePage';
import Contact from './components/contact/Contact';


function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Slider /><Categories /></>} />
        <Route path="/women" element={(
          <div className="products-post">
            <div className="product-list">
              <Women/>
            </div>
          </div>
        )} />
        <Route path="/men" element={(
          <div className="products-post">
            <div className="product-list">
              <Men/>
            </div>
          </div>
        )} />
        <Route path="/children" element={(
          <div className="products-post">
            <div className="product-list">
              <Children/>
            </div>
          </div>
        )} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
        <Route path='/verify/:id/:verificationToken' element={<VerifySuccess/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/admin/*" element={
          <AdminOnlyRoute>
            <Admin/>
          </AdminOnlyRoute>}/>
        <Route path='/checkout' element={<CheckOut/>}/>
        <Route path='/checkout-success' element={<CheckOutSuccess/>}/>
        <Route path='/checkout-details' element={<CheckoutDetails/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/order-details/:id' element={<OrderDetails/>}/>
        <Route path='/product-details/:id' element={<SinglePage/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  );
}

export default App;
