import { createGlobalStyle, styled } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useCart, useAuth } from '../../redux/hooks';
import { toggleCart, removeFromCart, updateQuantity, clearCart, addToCart } from '../../redux/slices/cartSlice';
import Button from '../common/Button';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import productData from '../../data/product.json';

import { colors, fontSizes, pxToRem, fonts, borderRadius, gapSizes } from '../../assets/styles/theme.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css';

const CartSidebar = () => {
  const dispatch = useAppDispatch();
  const { items, isCartOpen } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef();
  const [cartCount, setCartCount] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        dispatch(toggleCart());
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isCartOpen, dispatch]);

  const getUserCart = () => {
    if (!user?.id) return items;
    const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
    const arr = Array.isArray(allCarts[user.id]) ? allCarts[user.id] : [];
    return arr;
  };
  const setUserCart = (cartItems) => {
    if (!user?.id) return;
    const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
    allCarts[user.id] = cartItems;
    localStorage.setItem('carts', JSON.stringify(allCarts));
    window.dispatchEvent(new Event('cartChanged'));
  };

  const cartItems = isAuthenticated ? getUserCart() : items;

  const quickBuyProducts = useMemo(() => {
    return productData.products
      .filter(p => !cartItems.some(item => item.id === p.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [JSON.stringify(cartItems.map(i => i.id).sort())]);

  const quickBuySwiperRef = useRef(null);

  useEffect(() => {
    const updateCartCount = () => {
      if (isAuthenticated && user?.id) {
        const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
        const arr = Array.isArray(allCarts[user.id]) ? allCarts[user.id] : [];
        setCartCount(arr.length);
      } else {
        setCartCount(items.length);
      }
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartChanged', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartChanged', updateCartCount);
    };
    // eslint-disable-next-line
  }, [isAuthenticated, user?.id, items.length]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = (product) => {
    let updatedCart;
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      updatedCart = cartItems;
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
      if (isAuthenticated) {
        setUserCart(updatedCart);
      }
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
    window.dispatchEvent(new Event('cartChanged'));
  };

  const handleQuantityChange = (id, quantity) => {
    let updatedCart;
    if (quantity <= 0) {
      updatedCart = cartItems.filter(item => item.id !== id);
    } else {
      updatedCart = cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    }
    if (isAuthenticated) {
      setUserCart(updatedCart);
    }
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
    window.dispatchEvent(new Event('cartChanged'));
  };

  const handleClearCart = () => {
    if (isAuthenticated) {
      setUserCart([]);
    }
    dispatch(clearCart());
    window.dispatchEvent(new Event('cartChanged'));
  };

  const navigateToProduct = (id, e) => {
    if (
      e.target.closest('button') ||
      e.target.closest('[role="button"]')
    ) {
      return;
    }
    dispatch(toggleCart());
    navigate(`/products/${id}`);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CartContainer
            ref={sidebarRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <CartHeader>
              <h3>Your Cart ({cartCount})</h3>
              <CloseButton onClick={() => dispatch(toggleCart())}><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.64016 2.27L7.50016 6.13L11.3402 2.29C11.425 2.19972 11.5272 2.12749 11.6406 2.07766C11.754 2.02783 11.8763 2.00141 12.0002 2C12.2654 2 12.5197 2.10536 12.7073 2.29289C12.8948 2.48043 13.0002 2.73478 13.0002 3C13.0025 3.1226 12.9797 3.24439 12.9333 3.35788C12.8869 3.47138 12.8178 3.57419 12.7302 3.66L8.84016 7.5L12.7302 11.39C12.895 11.5512 12.9916 11.7696 13.0002 12C13.0002 12.2652 12.8948 12.5196 12.7073 12.7071C12.5197 12.8946 12.2654 13 12.0002 13C11.8727 13.0053 11.7456 12.984 11.6268 12.9375C11.508 12.8911 11.4002 12.8204 11.3102 12.73L7.50016 8.87L3.65016 12.72C3.56567 12.8073 3.46473 12.8769 3.35316 12.925C3.2416 12.9731 3.12163 12.9986 3.00016 13C2.73495 13 2.48059 12.8946 2.29306 12.7071C2.10552 12.5196 2.00016 12.2652 2.00016 12C1.99783 11.8774 2.02058 11.7556 2.06701 11.6421C2.11344 11.5286 2.18257 11.4258 2.27016 11.34L6.16016 7.5L2.27016 3.61C2.10535 3.44876 2.0087 3.23041 2.00016 3C2.00016 2.73478 2.10552 2.48043 2.29306 2.29289C2.48059 2.10536 2.73495 2 3.00016 2C3.24016 2.003 3.47016 2.1 3.64016 2.27Z" fill="currentColor"/>
</svg>
</CloseButton>
            </CartHeader>
            
            <CartItems>
              {cartItems.length === 0 ? (
                <>
                  <EmptyCart>Your cart is empty</EmptyCart>
                  <ShopNowBtn
                    type="button"
                    onClick={() => {
                      dispatch(toggleCart());
                      navigate('/products');
                    }}
                  >
                    Shop Now
                  </ShopNowBtn>
                </>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => handleQuantityChange(item.id, 0)}
                    onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                  />
                ))
              )}
            </CartItems>
            
            <CartFooter>
              <Total>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </Total>
              <ButtonRow>
                <CartActionButton
                  onClick={() => {
                    dispatch(toggleCart());
                    navigate('/checkout');
                  }}
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </CartActionButton>
                <CartActionButton
                  $outline
                  onClick={handleClearCart}
                  disabled={cartItems.length === 0}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 10H10V9H13V10ZM15 14H12V13H15V14ZM14 12H11V11H14V12Z" fill="currentColor"/>
<path d="M8.50145 10C8.49768 9.57816 8.38505 9.16443 8.17447 8.79889C7.96389 8.43335 7.66248 8.12837 7.29945 7.9135L10.9999 1.5L10.1349 1L6.34645 7.563C5.8815 7.45918 5.39794 7.47357 4.93998 7.60485C4.48202 7.73613 4.06428 7.98012 3.72495 8.3145C1.85295 10.12 1.99795 14.341 2.00495 14.52C2.01012 14.6491 2.06507 14.7712 2.15828 14.8607C2.2515 14.9502 2.37573 15.0001 2.50495 15H10.0004C10.1054 15 10.2077 14.967 10.2928 14.9056C10.3779 14.8443 10.4416 14.7577 10.4748 14.6581C10.508 14.5586 10.509 14.4511 10.4777 14.3509C10.4464 14.2507 10.3844 14.163 10.3004 14.1C8.53045 12.772 8.50145 10.027 8.50145 10ZM5.96495 8.4985C6.36513 8.5029 6.74822 8.66142 7.0345 8.94108C7.32077 9.22075 7.4882 9.60003 7.50195 10C7.50195 10.019 7.50295 10.104 7.51045 10.2345L4.56045 8.9225C4.75477 8.76226 4.97901 8.64226 5.22012 8.56947C5.46124 8.49668 5.71442 8.47256 5.96495 8.4985ZM7.72495 14C7.32529 13.5931 7.07054 13.066 6.99995 12.5H5.99995C6.03576 13.0321 6.20198 13.5473 6.48395 14H5.37245C5.16674 13.3511 5.04163 12.6794 4.99995 12H3.99995C4.032 12.6774 4.1436 13.3487 4.33245 14H2.99995C3.01545 13.082 3.14495 11.054 3.90145 9.7235L7.66795 11.3985C7.84852 12.3383 8.23437 13.2266 8.79795 14H7.72495Z" fill="currentColor"/>
</svg> Clear
                </CartActionButton>
              </ButtonRow>
            </CartFooter>
          </CartContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
`;

const CartContainer = styled(motion.div)`
  position: relative;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  color:${colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg{
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
    color: ${colors.text};
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 20px 0;
`;

const EmptyCart = styled.p`
  text-align: center;
  color: #666;
  margin-top: 50px;
`;

const ShopNowBtn = styled.button`
  display: block;
  margin: 18px auto 0 auto;
  background: ${colors.highlight};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: ${colors.primary};
  }
`;

const CartFooter = styled.div`
  border-top: 1px solid #eee;
  padding-top: 15px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${colors.text};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  & > span{
    flex: ${props => props.$outline ? '0 1 0' : '1 1 220px'};
    width: 100%;
  }
`;

const CartActionButton = styled(Button)`
  //flex: ${props => props.$outline ? '0 1 auto' : '0 0 220px'};
  width: ${props => props.$outline ? '120px' : '100%'};
  gap: ${pxToRem(8)};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: ${pxToRem(50)};
  padding: ${pxToRem(10)} ${pxToRem(10)};
  font-size: 16px;
  font-weight: 600;
  border-radius: ${borderRadius.sm};
  background: ${({ $outline }) => ($outline ? '#fff' : `${colors.info}`)};
  color: ${({ $outline }) => ($outline ? `${colors.highlight}` : '#fff')};
  border: ${({ $outline }) => ($outline ? `2px solid ${colors.highlight}` : `2px solid ${colors.info}`)};
  transition: background 0.18s, color 0.18s, border 0.18s;
  cursor: pointer;

  &::before{
    background: ${({ $outline }) => ($outline ? `${colors.warning}` : `${colors.highlight}`)};
  }

  &:hover:enabled {
    background: ${({ $outline }) => ($outline ? `${colors.warning}` : `${colors.highlight}`)};
    color: ${({ $outline }) => ($outline ? `${colors.textLight}` : `${colors.textLight}`)};
    border-color: ${({ $outline }) => ($outline ? `${colors.warning}` : `${colors.highlight}`)};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  svg{
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }
`;



const SwiperNavStyles = createGlobalStyle`
  .quick-buy-swiper .swiper-button-next,
  .quick-buy-swiper .swiper-button-prev {
    width: 30px !important;
    height: 30px !important;
    min-width: 30px !important;
    min-height: 30px !important;
    max-width: 30px !important;
    max-height: 30px !important;
    border-radius: 50%;
    background: #fff;
    color: #e74c3c;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    font-size: 16px !important;
    top: 40%;
  }
  .quick-buy-swiper .swiper-button-next:after,
  .quick-buy-swiper .swiper-button-prev:after {
    font-size: 16px !important;
  }
`;

const CartSidebarWithNavStyles = (props) => (
  <>
    <SwiperNavStyles />
    <CartSidebar {...props} />
  </>
);

export default CartSidebarWithNavStyles;