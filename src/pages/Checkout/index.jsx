import styled from 'styled-components';
import Radio from '../../components/ui/CustomRadio';
import { borderRadius, colors ,fontSizes, gapSizes, pxToRem } from '../../assets/styles/theme.js';
import CheckoutForm from './CheckoutForm';
import { useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../../redux/hooks';
import productData from '../../data/product.json';
import { useState, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import bgHeader from '../../assets/images/detail-main-bg2.png';
import OrderSummary from './OrderSummary';
import PaymentSection from './PaymentSection';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch();

  // Always use redux store for cart items
  const reduxItems = useSelector(state => state.cart.items);

  // Use reduxItems for order summary and form
  const [orderItems, setOrderItems] = useState(reduxItems);

  useEffect(() => {
    setOrderItems(reduxItems);
  }, [reduxItems]);

  const [shownUpsellIds, setShownUpsellIds] = useState([]);

  const upsellProducts = (productData.products || [])
    .filter(
      p =>
        !orderItems.some(item => item.id === p.id) &&
        !shownUpsellIds.includes(p.id)
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const handleAddUpsell = (product) => {
    let updated;
    const exists = orderItems.find(item => item.id === product.id);
    if (exists) {
      updated = orderItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...orderItems, { ...product, quantity: 1 }];
    }
    setOrderItems(updated);

    setShownUpsellIds(prev => [...prev, product.id]);

    if (isAuthenticated && user?.id) {
      const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
      allCarts[user.id] = updated;
      localStorage.setItem('carts', JSON.stringify(allCarts));
    }
  };

  const handleRemoveOrderItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const couponCodes = {
    "SAVE10": 0.10,
    "SAVE20": 0.20,
    "SAVE30": 0.30,
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountRate = couponApplied && couponCodes[coupon.toUpperCase()] ? couponCodes[coupon.toUpperCase()] : 0.10;
  const discount = subtotal > 0 ? Math.round(subtotal * discountRate * 100) / 100 : 0;
  const platformCharge = subtotal > 0 ? 5.00 : 0;
  const total = subtotal - discount + platformCharge;

  // Remove this useEffect:
  // useEffect(() => {
  //   if (orderItems.length === 0) {
  //     navigate('/');
  //   }
  // }, [orderItems, navigate]);

  // Add a handler for placing order and redirecting with order details
  const handlePlaceOrder = (orderData) => {
    // Generate a random orderId for demonstration
    const orderId = Date.now().toString();

    // Prepare order details to pass to confirmation page
    const orderDetails = {
      ...orderData,
      id: orderId,
      items: orderItems,
      total,
      status: 'pending',
      date: new Date().toISOString(),
    };

    // Save order details to sessionStorage for retrieval in OrderConfirmation
    sessionStorage.setItem(`order_${orderId}`, JSON.stringify(orderDetails));

    dispatch(clearCart());
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <>
    <CheckoutHeader>
       <h1>Checkout</h1>
    </CheckoutHeader>
    <CheckoutLayout>
      <FormSection>
        <CheckoutForm
          discountedTotal={total}
          orderItems={orderItems}
          onPlaceOrder={handlePlaceOrder}
        />
        <PaymentSection />
      </FormSection>
      <OrderSummary
        orderItems={orderItems}
        handleRemoveOrderItem={handleRemoveOrderItem}
        setOrderItems={setOrderItems}
        discountRate={discountRate}
        discount={discount}
        platformCharge={platformCharge}
        total={total}
        coupon={coupon}
        setCoupon={setCoupon}
        couponApplied={couponApplied}
        setCouponApplied={setCouponApplied}
        couponError={couponError}
        setCouponError={setCouponError}
        couponCodes={couponCodes}
      />
    </CheckoutLayout>
    </>
  );
};

const CheckoutHeader = styled.div` 
  max-width: 1320px;
  margin: ${pxToRem(30)} auto;
  padding: 0 ${pxToRem(20)};
  h1{
    background: ${colors.primary} url(${bgHeader}) no-repeat center center;
    background-size: cover;
    width: 100%;
    border-radius: ${pxToRem(12)};
    text-align: center;
    color: ${colors.text};
    min-height: ${pxToRem(120)};
    display: flex;
    align-items: center;
    justify-content: center;  
  }
`;

const CheckoutLayout = styled.div`
  display: flex;
  gap: 24px;
  max-width: 1320px;
  width: 100%;
  margin: 40px auto;
  padding: 0 20px;
  align-items: flex-start;
  @media (max-width: 900px) {
    flex-direction: column-reverse;
    gap: 24px;
    margin: 18px auto;
    padding: 0 20px;
  }
  @media (max-width: 600px) {
    gap: 10px;
    padding: 0 20px;
    margin: 20px auto;
  }
`;

const FormSection = styled.div`
  flex: 0 0 60%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  padding: 30px 20px;
  min-width: 0;
  @media (max-width: 900px) {
    padding: 20px 10px;
    flex:none;
    width: 100%;
  }
  @media (max-width: 600px) {
    padding:12px 12px;
  }
`;

const CheckoutFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderSummaryTitle = styled.h2`
  font-size: 20px;
  color: ${colors.primary};
  margin-bottom: 18px;
  text-align: left;
  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const EmptyMsg = styled.div`
  color: #888;
  font-size: 15px;
  text-align: center;
  padding: 20px 0;
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 10px 0;
  }
`;

export default CheckoutPage;
