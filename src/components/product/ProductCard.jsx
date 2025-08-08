import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/slices/cartSlice';
import Button from '../common/Button';
import { FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useImageBasePath } from '../../context/ImagePathContext';
import { useAuth, useCart } from '../../redux/hooks';
import { colors, fontSizes, pxToRem, clampPx, gapSizes, borderRadius } from '../../assets/styles/theme';

const ProductCard = ({ product, wishlistIds = [], onToggleWishlist }) => {
  const dispatch = useAppDispatch();
  // Use wishlistIds from props if provided, else fallback to local state (for non-wishlist pages)
  const [wishlist, setWishlist] = useState([]);
  const isWished = wishlistIds.length ? (wishlistIds.includes(product.id) || wishlistIds.includes(String(product.id))) : wishlist.includes(product.id);
  const [toast, setToast] = useState(null);
  const imageBasePath = useImageBasePath();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { items } = useCart();

  // Helper to get/set wishlist as array of product IDs in localStorage per user
  const getUserWishlist = () => {
    if (!user?.id) return [];
    const allWishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    const arr = Array.isArray(allWishlists[user.id]) ? allWishlists[user.id] : [];
    // Always return array of product IDs (string or number)
    return arr.filter(id => !!id);
  };
  const setUserWishlist = (list) => {
    if (!user?.id) return;
    // Ensure unique IDs
    const uniqueList = Array.from(new Set(list)).filter(id => !!id);
    const allWishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    allWishlists[user.id] = uniqueList;
    localStorage.setItem('wishlists', JSON.stringify(allWishlists));
    // Dispatch a custom event for instant header update
    window.dispatchEvent(new Event('wishlistChanged'));
  };

  useEffect(() => {
    setWishlist(getUserWishlist());
    const handleStorage = () => setWishlist(getUserWishlist());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
    // eslint-disable-next-line
  }, [user?.id]);

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
      setToast(isWished ? 'Removed from wishlist' : 'Added to wishlist');
      setTimeout(() => setToast(null), 1500);
      return;
    }
    // fallback for non-wishlist pages
    let updatedList;
    let message;
    const currentWishlist = getUserWishlist();
    if (isWished) {
      updatedList = currentWishlist.filter(id => id !== product.id && id !== String(product.id));
      message = 'Removed from wishlist';
    } else {
      updatedList = [...currentWishlist, product.id];
      message = 'Added to wishlist';
    }
    setWishlist(updatedList);
    setUserWishlist(updatedList);
    setToast(message);
    setTimeout(() => setToast(null), 1500);
  };

  // Helper to get/set cart for current user in localStorage
  const getUserCart = () => {
    if (!user?.id) return [];
    const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
    const arr = Array.isArray(allCarts[user.id]) ? allCarts[user.id] : [];
    return arr;
  };
  const setUserCart = (cartItems) => {
    if (!user?.id) return;
    const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
    allCarts[user.id] = cartItems;
    localStorage.setItem('carts', JSON.stringify(allCarts));
  };

  const handleAddToCart = () => {
    let updatedCart;
    const userCart = getUserCart();
    const exists = userCart.find(item => item.id === product.id);
    if (exists) {
      updatedCart = userCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...userCart, { ...product, quantity: 1 }];
    }
    if (isAuthenticated) {
      setUserCart(updatedCart);
    }
    dispatch(addToCart({ ...product, quantity: 1 }));
    setToast('Added to cart');
    setTimeout(() => setToast(null), 1500);
  };

  // Toast in document body, not inside card
  useEffect(() => {
    if (!toast) return;
    const toastDiv = document.createElement('div');
    toastDiv.className = 'global-toast-message';
    toastDiv.textContent = toast;
    document.body.appendChild(toastDiv);
    setTimeout(() => {
      toastDiv.classList.add('hide');
    }, 1200);
    setTimeout(() => {
      if (toastDiv.parentNode) document.body.removeChild(toastDiv);
    }, 1500);
    return () => {
      if (toastDiv.parentNode) document.body.removeChild(toastDiv);
    };
  }, [toast]);

  // Discount calculation
  const discount =
    product.offerPrice && product.offerPrice < product.price
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : null;

  // Fix: Ensure correct image path for public/images usage (works in browser, not Node)
  let imageSrc = product.image;
  if (imageSrc && !imageSrc.startsWith('/') && !imageSrc.startsWith('http')) {
    imageSrc = `/${imageSrc}`;
  }

  // Only navigate to product details if not clicking on add/wishlist
  const handleCardClick = (e) => {
    // Prevent navigation if clicking on button or icon inside card
    if (
      e.target.closest('button') ||
      e.target.closest('a') ||
      e.target.closest('[role="button"]')
    ) {
      return;
    }
    navigate(`/products/${product.id}`);
  };

  // Helper to check if product is in cart
  const isInCart = (() => {
    if (isAuthenticated && user?.id) {
      const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
      const arr = Array.isArray(allCarts[user.id]) ? allCarts[user.id] : [];
      return arr.some(item => item.id === product.id);
    }
    // Fallback to redux items (for guest)
    return items.some(item => item.id === product.id);
  })();

  return (
    <Card onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <ImageContainer>
        {/* Wishlist button at top right of image on mobile */}
        <WishlistBtn
          aria-label="Add to wishlist"
          $wished={isWished ? 1 : 0}
          onClick={handleAddToWishlist}
          type="button"
        >
          <FaHeart />
        </WishlistBtn>
        <Image src={imageSrc} alt={product.title} />
      </ImageContainer>
      <Details>
        <DetailsHeader>
          <Title title={product.title}>{product.title}</Title>
          <RatingRow>
            <StarIcon>★</StarIcon>
            <RatingValue>{product.rating ? product.rating.toFixed(1) : '4.0'}</RatingValue>
          </RatingRow>
        </DetailsHeader>
        <GroupBox>
          <MetaRow>
          <Weight>80g</Weight>
          {discount && <DiscountBadge>{discount}% Off</DiscountBadge>}
        </MetaRow>
        <PriceRow>
          {product.offerPrice && product.offerPrice < product.price ? (
            <>
              <MRP>MRP: <Strike>${product.price.toFixed(0)}</Strike></MRP>
              <OfferPrice>${product.offerPrice.toFixed(0)}</OfferPrice>
            </>
          ) : (
            <OfferPrice>${product.price.toFixed(0)}</OfferPrice>
          )}
        </PriceRow>
        </GroupBox>
      </Details>
      <Actions>
        <IconButton
          aria-label={isInCart ? 'Added to cart' : 'Add to cart'}
          onClick={(e) => {
            e.stopPropagation();
            if (!isInCart) handleAddToCart();
          }}
          type="button"
          $tick={isInCart}
        >
          {isInCart ? 
          
          <FaCheck style={{ color: '#fff' }} /> 
          : 
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.04902 18.9445C8.98846 18.9445 9.75002 18.1829 9.75002 17.2435C9.75002 16.304 8.98846 15.5425 8.04902 15.5425C7.10959 15.5425 6.34802 16.304 6.34802 17.2435C6.34802 18.1829 7.10959 18.9445 8.04902 18.9445Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.46 18.9445C16.3994 18.9445 17.161 18.1829 17.161 17.2435C17.161 16.304 16.3994 15.5425 15.46 15.5425C14.5205 15.5425 13.759 16.304 13.759 17.2435C13.759 18.1829 14.5205 18.9445 15.46 18.9445Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.106 3.74934L6.116 10.1133C6.425 11.0913 6.579 11.5803 6.876 11.9423C7.136 12.2623 7.475 12.5093 7.858 12.6623C8.293 12.8353 8.805 12.8353 9.831 12.8353H13.686C14.712 12.8353 15.224 12.8353 15.658 12.6623C16.042 12.5093 16.38 12.2623 16.641 11.9423C16.937 11.5803 17.091 11.0913 17.401 10.1133L17.81 8.81734L18.05 8.05134L18.381 7.00134C18.4991 6.62684 18.5274 6.22978 18.4634 5.84233C18.3995 5.45489 18.2452 5.08795 18.013 4.77125C17.7809 4.45455 17.4774 4.19699 17.1271 4.01945C16.7768 3.84191 16.3897 3.74937 15.997 3.74934H4.106ZM4.106 3.74934L4.095 3.71234C4.05277 3.57089 4.00608 3.43082 3.955 3.29234C3.75255 2.77988 3.40923 2.33516 2.96473 2.00956C2.52022 1.68397 1.99266 1.49078 1.443 1.45234C1.34 1.44434 1.227 1.44434 1 1.44434" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          }
          
        </IconButton>
        <ViewButton
          as={Link}
          to={`/products/${product.id}`}
          onClick={e => e.stopPropagation()}
        >
          <svg width="23" height="22" viewBox="0 0 21 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.36171 18.2383C5.49641 18.3088 5.64783 18.3411 5.79956 18.3317C5.9513 18.3223 6.09757 18.2715 6.22254 18.185L17.0559 10.685C17.1666 10.6083 17.257 10.5059 17.3195 10.3866C17.382 10.2673 17.4146 10.1347 17.4146 9.99998C17.4146 9.86531 17.382 9.73265 17.3195 9.61335C17.257 9.49405 17.1666 9.39167 17.0559 9.31498L6.22254 1.81498C6.09766 1.72786 5.95126 1.6767 5.79929 1.66707C5.64733 1.65744 5.49563 1.68972 5.36075 1.76038C5.22587 1.83105 5.11298 1.93738 5.03439 2.0678C4.95579 2.19822 4.91451 2.34771 4.91504 2.49998V17.5C4.91502 17.6521 4.95663 17.8013 5.03537 17.9315C5.1141 18.0616 5.22696 18.1677 5.36171 18.2383ZM6.58171 4.09082L15.1175 9.99998L6.58171 15.9091V4.09082Z" fill="currentColor"/>
            </svg>
          <span>View Product</span>
        </ViewButton>
      </Actions>
    </Card>
  );
};

const Card = styled.div`
  background: ${colors.card};
  border-radius: ${borderRadius.sm};
  box-shadow: 0 4px 18px rgba(0,0,0,0.10);
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  position: relative;
  min-width: 0;
  transition: box-shadow 0.18s, transform 0.18s;
  border: 1px solid ${colors.border};
  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.13);
    transform: translateY(-2px) scale(1.01);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio:1/1;
  background: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  padding-top: 0;
`;

const Image = styled.img`
  aspect-ratio:1/1;
  width: 100%;
  object-fit: contain;
  margin-bottom: 0;
  margin-top: auto;
  display: block;
`;

const Details = styled.div`
  padding: 12px 10px 0 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 auto;
`;

const DetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Title = styled.h3`
  font-size: ${fontSizes.sm};
  margin: 0 0 2px 0;
  font-weight: 500;
  color: ${colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
 font-size: ${fontSizes.xs};
  margin-bottom: 2px;
  border:${pxToRem(1)} solid ${colors.gray};
  padding: 1px 6px;
  border-radius: 4px;
`;

const StarIcon = styled.span`
  color: #ffc107;
  font-size: ${fontSizes.sm};
`;

const RatingValue = styled.span`
  color: ${colors.primary};
  font-size: ${fontSizes.sm};
  font-weight: 600;
`;
const GroupBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${gapSizes.sm};
`;

const Weight = styled.span`
  font-size: ${fontSizes.xs};
  color: ${colors.muted};
  background: #f5f5f5;
  border-radius: 4px;
  padding: 2px 8px;
  font-weight: 500;
`;

const DiscountBadge = styled.span`
  font-size: ${fontSizes.xs};
  color: ${colors.textLight};
  background: ${colors.primary};
  border-radius: 4px;
  padding: ${clampPx(1, 2, 2, 2)} 5px;
  font-weight: 500;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

const MRP = styled.span`
  font-size: ${fontSizes.xs};
  color: #888;
`;

const Strike = styled.span`
  text-decoration: line-through;
  color: #888;
  font-size: ${fontSizes.xs};
`;

const OfferPrice = styled.span`
  color: ${colors.text};
  font-size: ${fontSizes.sm};
  font-weight: 700;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  border-radius: 0 0 10px 10px;
  margin-top: 5px;
`;

const IconButton = styled.button`
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  color: ${({ $wished }) => ($wished ? colors.accent : `${colors.text}`)};
  font-size: ${fontSizes.sm};
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: visible;
  transition: color 0.5s, border 0.18s, background 0.18s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 9px -2px rgba(0,0,0,0.15);
  svg,path{
    position: relative;
    z-index: 1;
    transition: color 0.5s;
  }
  background: ${({ $tick }) => $tick ? '#5ceb6d' : '#fff'};
  &:hover {
    color: ${colors.textLight};
    border-color: ${colors.primary};
    svg, path{
      color: ${colors.textLight};
    }
  }
  &:after {
    content: '';
    position: absolute;
    left: -300%;
    bottom: -200%;
    width:1px;
    height:1px;
    background: ${colors.primary};
    border-radius: 50%;
    z-index: 0;
    transition: left 0.3s ease-in-out, bottom 0.3s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out;
    pointer-events: none;
  }
  &:hover:after {
    width: 70px;
    height: 70px;
    left: -30%;
    bottom: -40%;
  }
`;

const ViewButton = styled(Link)`
  flex: 1;
  background: #fff;
  color: ${colors.text};
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  padding: 0 0;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: background 0.18s, color 0.5s, border 0.18s;
  box-shadow: 0 5px 9px -2px rgba(0,0,0,0.15);
  span{
    position: relative;
    z-index: 1;
  }
    svg, svg path{
      fill: ${colors.text};
      width: 18px;
      height: auto;
      transition: fill 0.8s;
      margin-right: 3px;
      position: relative;
      z-index: 1;
      top:1px;
    }
  &:hover {
    
    color: ${colors.textLight};
    border-color: ${colors.info};
    svg, svg path{
    
      fill: ${colors.textLight};
    }
  }
     &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -300%;
   width:1px;
   height:1px;
    background: ${colors.info};
    border-radius: 50%;
    z-index: 0;
    transition: left 0.3s ease-in-out, bottom 0.3s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out;
    pointer-events: none;
  }
  &:hover:after {
    width: 300px;
    height: 100px;
    left: -10%;
    bottom: -80%;
  }
`;

const WishlistBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 8px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.18s, transform 0.18s, color 0.18s;
  color: ${({ $wished }) => ($wished ? colors.warning : '#ddd')};
  &:hover {
    transform: scale(1.05);
    color: ${colors.warning};
  }
`;

// Add global styles for the toast
if (typeof document !== 'undefined' && !document.getElementById('global-toast-style')) {
  const style = document.createElement('style');
  style.id = 'global-toast-style';
  style.innerHTML = `
    .global-toast-message {
      position: fixed;
      top: 300px;
      right: 0;
      transform: translateX(110%);
      background: #222;
      color: #fff;
      padding: 10px 22px;
      border-radius: 6px 0 0 6px;
      font-size: 14px;
      z-index: 2000;
      box-shadow: 0 2px 12px rgba(0,0,0,0.12);
      animation: slideInRight 1.5s forwards;
      pointer-events: none;
    }
    .global-toast-message.hide {
      animation: slideOutRight 0.3s forwards;
    }
    @keyframes slideInRight {
      0% {
        opacity: 0;
        transform: translateX(110%);
      }
      10% {
        opacity: 1;
        transform: translateX(0%);
      }
      90% {
        opacity: 1;
        transform: translateX(0%);
      }
      100% {
        opacity: 1;
        transform: translateX(0%);
      }
    }
    @keyframes slideOutRight {
      0% {
        opacity: 1;
        transform: translateX(0%);
      }
      100% {
        opacity: 0;
        transform: translateX(110%);
      }
    }
  `;
  document.head.appendChild(style);
}

export default ProductCard;