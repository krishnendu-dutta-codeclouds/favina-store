import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Products from './pages/Product';
import ProductDetail from './pages/Product/ProductDetail';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/404';
import Wishlist from './pages/Wishlist/index.jsx';
import Contact from './pages/Contact/index.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    const from = window.location.pathname;
    return <Navigate to={`/login?from=${encodeURIComponent(from)}`} replace />;
  }
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="contact" element={<Contact />} />
      <Route path="checkout" element={
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      } />
      <Route path="account/*" element={
        <PrivateRoute>
          <Account />
        </PrivateRoute>
      } />
      <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;