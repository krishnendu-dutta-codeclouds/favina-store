import styled, { createGlobalStyle } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart, toggleCart } from '../../redux/slices/cartSlice';
import productData from '../../data/product.json';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import { useForm } from 'react-hook-form';
import ProductGrid from '../../components/product/ProductGrid';
import { useImageBasePath } from '../../context/ImagePathContext';
import PromoBanner, { BannerHighlight } from '../../components/common/PromoBanner';
import promoImg from '../../assets/images/main-bg2.png';
import { useAuth } from '../../redux/hooks';
import { colors, fontSizes, pxToRem, fonts, gapSizes } from '../../assets/styles/theme.js';
import CustomTestimonialSection from './CustomTestimonialSection';
import ProductSlider from './ProductSlider';
import ProductInfo, { CheckoutCardInfo, CheckoutCardInfoTitle } from './ProductInfo';
import { useCartQuantity } from '../../context/CartQuantityContext';

const SwiperNavStyles = createGlobalStyle`
  .product-detail-swiper .swiper-button-next,
  .product-detail-swiper .swiper-button-prev {
    width: ${pxToRem(30)} !important;
    height: ${pxToRem(30)} !important;
    min-width: ${pxToRem(30)} !important;
    min-height: ${pxToRem(30)} !important;
    max-width: ${pxToRem(30)} !important;
    max-height: ${pxToRem(30)} !important;
    border-radius: 50%;
    background: #fff;
    color: ${colors.primary};
    box-shadow: 0 ${pxToRem(2)} ${pxToRem(8)} rgba(0,0,0,0.08);
    font-size: ${pxToRem(16)} !important;
    top: 40%;
  }
  .product-detail-swiper .swiper-button-next:after,
  .product-detail-swiper .swiper-button-prev:after {
    font-size: ${pxToRem(16)} !important;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userReviews, setUserReviews] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const { register: formRegister, handleSubmit, reset, formState: { errors } } = useForm();
  const imageBasePath = useImageBasePath();
  const { isAuthenticated, user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const { getQuantity, setQuantity: setGlobalQuantity } = useCartQuantity();

  useEffect(() => {
    if (product && product.id) {
      setQuantity(getQuantity(product.id));
    }
  }, [product, getQuantity]);

  useEffect(() => {
    if (!product || !user?.id) return;
    const syncQuantity = () => {
      const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
      const arr = Array.isArray(allCarts[user.id]) ? allCarts[user.id] : [];
      const cartItem = arr.find(item => item.id === product.id);
      if (cartItem && cartItem.quantity !== quantity) {
        setQuantity(cartItem.quantity);
      }
    };
    window.addEventListener('cartChanged', syncQuantity);
    return () => window.removeEventListener('cartChanged', syncQuantity);
  }, [product, user?.id, quantity]);


  useEffect(() => {
    if (!id) return;
    const found = Array.isArray(productData.products)
      ? productData.products.find(p => String(p.id) === String(id))
      : null;
    setProduct(found || null);
    setLoading(false);
  }, [id]);


  useEffect(() => {
    if (product) {
   
      const saved = JSON.parse(localStorage.getItem(`reviews_${product.id}`) || '{}');
      setUserReviews(saved);
    }
  }, [product]);

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
    if (!product) return;
    let updatedCart;
    const userCart = getUserCart();
    const exists = userCart.find(item => item.id === product.id);
    if (exists) {
      setQuantity(exists.quantity);
      setGlobalQuantity(product.id, exists.quantity);
      updatedCart = userCart;
      dispatch(toggleCart()); // Open cart sidebar
      
      return;
    } else {
      updatedCart = [...userCart, { ...product, quantity }];
      if (isAuthenticated) {
        setUserCart(updatedCart);
      }
      setGlobalQuantity(product.id, quantity);
      dispatch(addToCart({ ...product, quantity }));
      dispatch(toggleCart()); // Open cart sidebar
      setIsInCart(true);
      // Fire cartChanged event for listeners
      window.dispatchEvent(new Event('cartChanged'));
    }
  };

  // --- Buy Now handler ---
  const handleBuyNow = () => {
    if (!product) return;
    let updatedCart;
    const userCart = getUserCart();
    const exists = userCart.find(item => item.id === product.id);
    let newQty = quantity;
    if (exists) {
      newQty = exists.quantity + quantity;
      updatedCart = userCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: newQty }
          : item
      );
    } else {
      updatedCart = [...userCart, { ...product, quantity }];
    }
    if (isAuthenticated) {
      setUserCart(updatedCart);
    }
    setGlobalQuantity(product.id, newQty);
    dispatch(addToCart({ ...product, quantity: newQty }));
    
    navigate('/checkout');
  };


  // Helper to get/set wishlist as array of product IDs in localStorage per user
  const getUserWishlist = () => {
    if (!user?.id) return [];
    const allWishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    const arr = Array.isArray(allWishlists[user.id]) ? allWishlists[user.id] : [];
    return arr.filter(id => !!id);
  };
  const setUserWishlist = (list) => {
    if (!user?.id) return;
    const uniqueList = Array.from(new Set(list)).filter(id => !!id);
    const allWishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    allWishlists[user.id] = uniqueList;
    localStorage.setItem('wishlists', JSON.stringify(allWishlists));
    window.dispatchEvent(new Event('wishlistChanged'));
  };

  useEffect(() => {
    setWishlist(getUserWishlist());
    const handleStorage = () => setWishlist(getUserWishlist());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
    // eslint-disable-next-line
  }, [user?.id]);

  const isWished = product ? wishlist.includes(product.id) || wishlist.includes(String(product.id)) : false;

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
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

  useEffect(() => {
    if (!product || !user?.id) return;
    const userCart = getUserCart();
    setIsInCart(userCart.some(item => String(item.id) === String(product.id)));
    // Listen for cart changes
    const syncCartStatus = () => {
      const updatedCart = getUserCart();
      setIsInCart(updatedCart.some(item => String(item.id) === String(product.id)));
    };
    window.addEventListener('cartChanged', syncCartStatus);
    return () => window.removeEventListener('cartChanged', syncCartStatus);
  }, [product, user?.id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;


  const otherProducts = (productData.products || [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const testimonialSlides = [
    {
      rating: 5.0,
      quote: "Perfect nude colour",
      text: "First-ever purchase from kay beauty...and it is so good. ROCKY ROAD beautiful nude colour as you can see in the pictures...I want this colour and finally got this. Luxurious finish gives a nice shine colour pay-off is excellent...but one thing is it takes a lot of time to dry otherwise, I love this ❤️",
      user: "Juhi Bhaskar",
      verified: true,
    },
    {
      rating: 4.8,
      quote: "Amazing texture",
      text: "The texture is so smooth and blends perfectly. Will buy again!",
      user: "Aarti P.",
      verified: true,
    },
    {
      rating: 4.9,
      quote: "Long lasting",
      text: "Stayed on my lips all day, even after meals. Highly recommend.",
      user: "Priya S.",
      verified: true,
    },
    {
      rating: 5.0,
      quote: "Best purchase",
      text: "Absolutely love the color and finish. Worth every penny.",
      user: "Sneha T.",
      verified: true,
    },
    {
      rating: 4.7,
      quote: "Great for daily use",
      text: "Perfect for my daily makeup routine. Not heavy at all.",
      user: "Tanvi P.",
      verified: true,
    },
  ];



  // --- Share Button handler ---
  const handleShare = () => {
    if (!product) return;
    const shareUrl = window.location.href;
    const shareText = `Check out this product: ${product.title}`;
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback: WhatsApp
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  };
  const discountPercent = product.offerPrice && product.offerPrice < product.price
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;


  return (
    <>
      <SwiperNavStyles />
      <ProductDetailContainer>
        <ProductSlider
          product={product}
          imageBasePath={imageBasePath}
          thumbsSwiper={thumbsSwiper}
          setThumbsSwiper={setThumbsSwiper}
          activeImgIdx={activeImgIdx}
          setActiveImgIdx={setActiveImgIdx}
        />
        <ProductInfo
          product={product}
          discountPercent={discountPercent}
          quantity={quantity}
          setQuantity={setQuantity}
          isInCart={isInCart}
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
          handleWishlist={handleWishlist}
          isWished={isWished}
          dispatch={dispatch}
          toggleCart={toggleCart}
          CheckoutCardInfo={CheckoutCardInfo}
          CheckoutCardInfoTitle={CheckoutCardInfoTitle}
          handleShare={handleShare}
          ShareButton={ShareButton}
        />
      </ProductDetailContainer>
      <PromoBanner
        image={promoImg}
        titlePink="Special Offer"
        titlePurple="On This Product"
        desc="Enjoy an exclusive discount on this product for a limited time only. Hurry up before the offer ends!"
        offerLabel="Save"
        offerHighlight="50% OFF"
        sub={
          <>
            Offer valid for <BannerHighlight>today only!</BannerHighlight>
          </>
        }
        buttonText="Buy Now"
        buttonTo="/products"
      />
      <CustomTestimonialSection
        testimonialSlides={testimonialSlides}
        product={product}
        imageBasePath={imageBasePath}
      />

      <RelatedSection>
        <RelatedTitle>Other Products</RelatedTitle>
        <ProductGrid products={otherProducts} />
      </RelatedSection>
    </>
  );
};

const ShareButton = styled.button`
  display:flex;
  align-items:center;
  gap:${gapSizes.sm};
  font-size: ${fontSizes.sm};
  color:${colors.highlight};
`;

const ProductDetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: ${pxToRem(40)};
  max-width: ${pxToRem(1100)};
  margin: ${pxToRem(32)} auto ${pxToRem(32)} auto;
  padding: ${pxToRem(0)} ${pxToRem(20)};
  position: relative;
  @media (max-width: 1100px) {
    flex-direction: column;
    gap: ${pxToRem(32)};
    max-width: 100%;
    padding: ${pxToRem(18)} ${pxToRem(20)};
    border-radius: ${pxToRem(12)};
    margin: ${pxToRem(0)} auto 0;
  }
`;

const RelatedSection = styled.section`
  margin: 40px auto 0 auto;
  max-width: 1320px;
  padding:0 20px 40px;
`;

const RelatedTitle = styled.h3`
  font-size: ${fontSizes.xl};
  color: ${colors.text};
  font-weight: 800;
  margin-bottom: 24px;
  text-align: center;
`;


// Add global styles for the toast if not already present
if (typeof document !== 'undefined' && !document.getElementById('global-toast-style')) {
  const style = document.createElement('style');
  style.id = 'global-toast-style';
  style.innerHTML = `
    .global-toast-message {
      position: fixed;
      top: 300px;
      right: 0;
      transform: translateX(110%);
      background: ${colors.text};
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

export default ProductDetail;

