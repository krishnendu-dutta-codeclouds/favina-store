import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductGrid from '../../components/product/ProductGrid';
import { useImageBasePath } from '../../context/ImagePathContext';
import productData from '../../data/product.json';
import { useAuth } from '../../redux/hooks';

const WishlistPage = () => {
  const imageBasePath = useImageBasePath();
  const { user, isAuthenticated } = useAuth();

  const getWishlist = () => {
    if (!user?.id) return [];
    const allWishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    const arr = Array.isArray(allWishlists[user.id]) ? allWishlists[user.id] : [];
    return arr.filter(id => !!id);
  };

  const [wishlistIds, setWishlistIds] = useState(getWishlist());

  useEffect(() => {
    setWishlistIds(getWishlist());
    const handleStorage = () => setWishlistIds(getWishlist());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
    // eslint-disable-next-line
  }, [user?.id]);

  const allProducts = productData.products || [];
  const wishlistProducts = allProducts.filter(
    p => wishlistIds.includes(p.id) || wishlistIds.includes(String(p.id))
  );

  const handleToggleWishlist = (id) => {
    if (!user?.id) return;
    const allWishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    const arr = Array.isArray(allWishlists[user.id]) ? allWishlists[user.id] : [];
    let updated;
    if (arr.includes(id) || arr.includes(String(id))) {
      updated = arr.filter(wid => String(wid) !== String(id));
    } else {
      updated = [...arr, id];
    }
    allWishlists[user.id] = updated;
    localStorage.setItem('wishlists', JSON.stringify(allWishlists));
    setWishlistIds(updated);
  };

  return (
    <Container>
      <h1>My Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <EmptyMsg>Your wishlist is empty.</EmptyMsg>
      ) : (
        <ProductGrid
          products={wishlistProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 30px 20px;
  h1{
    margin-bottom: 20px;
    font-size: 24px;
  }
`;

const EmptyMsg = styled.div`
  text-align: center;
  color: #888;
  margin: 40px 0;
`;

export default WishlistPage;
