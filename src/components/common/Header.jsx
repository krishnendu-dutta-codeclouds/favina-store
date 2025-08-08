import styled, { keyframes } from 'styled-components';
import { FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes, FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useAppDispatch, useCart, useAuth } from '../../redux/hooks';
import { toggleCart } from '../../redux/slices/cartSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { useEffect, useState } from 'react';
import LogoSvg from '../../assets/images/logo.svg';
import productData from '../../data/product.json';
import { useImageBasePath } from '../../context/ImagePathContext';
import { colors, fontSizes, borderRadius } from '../../assets/styles/theme';
import OptimizedImage from '../common/OptimizedImage';



const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { isAuthenticated, user } = useAuth();
  const { items } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownDisplay, setUserDropdownDisplay] = useState(window.innerWidth <= 900 ? 'none' : 'flex');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownMobileOpen, setUserDropdownMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const imageBasePath = useImageBasePath();

  useEffect(() => {
    const handleResize = () => {
      setUserDropdownDisplay(window.innerWidth <= 900 ? 'none' : 'flex');
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getWishlistCount = () => {
    if (!user?.id) return 0;
    const allWishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    const arr = Array.isArray(allWishlists[user.id]) ? allWishlists[user.id] : [];
    return arr.filter(id => !!id).length;
  };

  const getCartCount = () => {
    if (isAuthenticated && user?.id) {
      const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
      const arr = Array.isArray(allCarts[user.id]) ? allCarts[user.id] : [];
      return arr.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  useEffect(() => {
    const updateWishlistCount = () => {
      setWishlistCount(getWishlistCount());
    };
    updateWishlistCount();
    window.addEventListener('storage', updateWishlistCount);

    const handleWishlistChanged = () => setWishlistCount(getWishlistCount());
    window.addEventListener('wishlistChanged', handleWishlistChanged);

    return () => {
      window.removeEventListener('storage', updateWishlistCount);
      window.removeEventListener('wishlistChanged', handleWishlistChanged);
    };
  }, [user?.id]);

  useEffect(() => {
    setWishlistCount(getWishlistCount());
  }, [location, user?.id]);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = (productData.products || []).filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    if (!searchOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    const handleClick = (e) => {
      if (e.target.closest('.search-overlay-content')) return;
      setSearchOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [searchOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Banner>
        <Carousel>
          Get 30% off on your first order! Use code: <PromoCode>SAVE30</PromoCode>
        </Carousel>
      </Banner>
      <HeaderContainer>
      <Container>
        <Logo to="/" title="Go to Home">
          <OptimizedImage src={LogoSvg} alt="ShopEase Logo" width={38} height={38} />
        </Logo>
        <Nav>
          <NavLink to="/" title="Home">Home</NavLink>
          <NavLink to="/products" title="Browse all products">Products</NavLink>
          <NavLink to="/contact" title="Contact us">Contact</NavLink>
        </Nav>
        <Icons>
          <SearchIconBtn
            aria-label="Search"
            title="Search products"
            onClick={() => setSearchOpen(true)}
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3368 21L16.9968 16.66" stroke="#5A4E4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.3369 19C15.7552 19 19.3369 15.4183 19.3369 11C19.3369 6.58172 15.7552 3 11.3369 3C6.91864 3 3.33691 6.58172 3.33691 11C3.33691 15.4183 6.91864 19 11.3369 19Z" stroke="#5A4E4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          </SearchIconBtn>
          <UserDropdown
            tabIndex={0}
            style={{ display: userDropdownDisplay }}
            onMouseEnter={() => window.innerWidth > 900 && setDropdownOpen(true)}
            onMouseLeave={() => window.innerWidth > 900 && setDropdownOpen(false)}
            onFocus={() => window.innerWidth > 900 && setDropdownOpen(true)}
            onBlur={e => {
              if (window.innerWidth > 900 && !e.currentTarget.contains(e.relatedTarget)) setDropdownOpen(false);
            }}
          >
            <UserIconBtn
              aria-haspopup="true"
              aria-expanded={dropdownOpen || userDropdownMobileOpen}
              tabIndex={-1}
              title={isAuthenticated ? "Account" : "Login/Register"}
              onClick={() => {
                if (window.innerWidth <= 900) setUserDropdownMobileOpen(v => !v);
              }}
            >
              <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9393 19.325H4.41013C3.15763 19.325 2.19096 18.38 2.35513 17.1383L2.45013 16.4142C2.62263 15.4142 3.53763 14.785 4.53096 14.5692L10.6101 13.5H10.7301L16.8093 14.5692C17.8193 14.8025 18.7176 15.3967 18.8901 16.4142L18.9851 17.1475C19.1493 18.3892 18.1826 19.3333 16.9301 19.3333L16.9393 19.325ZM14.8368 6.83332C14.8368 7.93839 14.3978 8.9982 13.6164 9.7796C12.835 10.561 11.7752 11 10.6701 11C9.56506 11 8.50525 10.561 7.72385 9.7796C6.94245 8.9982 6.50346 7.93839 6.50346 6.83332C6.50346 5.72825 6.94245 4.66845 7.72385 3.88704C8.50525 3.10564 9.56506 2.66666 10.6701 2.66666C11.7752 2.66666 12.835 3.10564 13.6164 3.88704C14.3978 4.66845 14.8368 5.72825 14.8368 6.83332Z" stroke="#5A4E4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

              {isAuthenticated && user?.firstName && (
                <UserName>{user.firstName}</UserName>
              )}
            </UserIconBtn>
            <DropdownMenu
              $open={window.innerWidth > 900 ? dropdownOpen : userDropdownMobileOpen}
              style={window.innerWidth <= 900 ? { right: 0, left: 'auto' } : {}}
            >
              {!isAuthenticated ? (
                <>
                  <DropdownItem to="/login" title="Login" onClick={() => setUserDropdownMobileOpen(false)}>Login</DropdownItem>
                  <DropdownItem to="/register" title="Register" onClick={() => setUserDropdownMobileOpen(false)}>Register</DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem to="/account" title="My Account" onClick={() => setUserDropdownMobileOpen(false)}>My Account</DropdownItem>
                  <DropdownButton onClick={() => { handleLogout(); setUserDropdownMobileOpen(false); }} title="Logout">Logout</DropdownButton>
                </>
              )}
            </DropdownMenu>
          </UserDropdown>
          <WishlistButton
            as={Link}
            to="/wishlist"
            aria-label="Wishlist"
            title="View Wishlist"
            className="wishlist-header-icon"
          >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7534 3.6079L10.2134 4.1279C10.2834 4.20048 10.3673 4.25822 10.46 4.29766C10.5528 4.33709 10.6526 4.35742 10.7534 4.35742C10.8542 4.35742 10.954 4.33709 11.0468 4.29766C11.1396 4.25822 11.2235 4.20048 11.2934 4.1279L10.7534 3.6079ZM8.17942 16.4299C6.66342 15.2349 5.00642 14.0679 3.69142 12.5879C2.40342 11.1359 1.50342 9.4429 1.50342 7.2449H0.00341797C0.00341797 9.9109 1.11342 11.9449 2.57042 13.5839C4.00042 15.1939 5.82442 16.4839 7.25042 17.6079L8.17942 16.4299ZM1.50342 7.2449C1.50342 5.0949 2.71842 3.2909 4.37742 2.5319C5.98942 1.7949 8.15542 1.9899 10.2134 4.1279L11.2934 3.0889C8.85342 0.551896 6.01742 0.132896 3.75342 1.1679C1.53942 2.1809 0.00341797 4.5329 0.00341797 7.2449H1.50342ZM7.25042 17.6079C7.76342 18.0119 8.31342 18.4419 8.87042 18.7679C9.42742 19.0939 10.0634 19.3579 10.7534 19.3579V17.8579C10.4434 17.8579 10.0794 17.7379 9.62742 17.4729C9.17442 17.2089 8.70542 16.8449 8.17942 16.4299L7.25042 17.6079ZM14.2564 17.6079C15.6824 16.4829 17.5064 15.1949 18.9364 13.5839C20.3934 11.9439 21.5034 9.9109 21.5034 7.2449H20.0034C20.0034 9.4429 19.1034 11.1359 17.8154 12.5879C16.5004 14.0679 14.8434 15.2349 13.3274 16.4299L14.2564 17.6079ZM21.5034 7.2449C21.5034 4.5329 19.9684 2.1809 17.7534 1.1679C15.4894 0.132896 12.6554 0.551896 10.2134 3.0879L11.2934 4.1279C13.3514 1.9909 15.5174 1.7949 17.1294 2.5319C18.7884 3.2909 20.0034 5.0939 20.0034 7.2449H21.5034ZM13.3274 16.4299C12.8014 16.8449 12.3324 17.2089 11.8794 17.4729C11.4264 17.7369 11.0634 17.8579 10.7534 17.8579V19.3579C11.4434 19.3579 12.0794 19.0929 12.6364 18.7679C13.1944 18.4419 13.7434 18.0119 14.2564 17.6079L13.3274 16.4299Z" fill="#5A4E4D"/>
</svg>

            {wishlistCount > 0 && <WishlistCount>{wishlistCount}</WishlistCount>}
          </WishlistButton>
          <CartButton onClick={() => dispatch(toggleCart())} title="View Cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.05232 18.75C8.99175 18.75 9.75332 17.9884 9.75332 17.049C9.75332 16.1096 8.99175 15.348 8.05232 15.348C7.11288 15.348 6.35132 16.1096 6.35132 17.049C6.35132 17.9884 7.11288 18.75 8.05232 18.75Z" stroke="#5A4E4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.4635 18.75C16.4029 18.75 17.1645 17.9884 17.1645 17.049C17.1645 16.1096 16.4029 15.348 15.4635 15.348C14.524 15.348 13.7625 16.1096 13.7625 17.049C13.7625 17.9884 14.524 18.75 15.4635 18.75Z" stroke="#5A4E4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.10942 3.555L6.11942 9.919C6.42842 10.897 6.58242 11.386 6.87942 11.748C7.13942 12.068 7.47842 12.315 7.86142 12.468C8.29642 12.641 8.80842 12.641 9.83442 12.641H13.6894C14.7154 12.641 15.2274 12.641 15.6614 12.468C16.0454 12.315 16.3834 12.068 16.6444 11.748C16.9404 11.386 17.0944 10.897 17.4044 9.919L17.8134 8.623L18.0534 7.857L18.3844 6.807C18.5025 6.4325 18.5308 6.03544 18.4668 5.648C18.4029 5.26055 18.2486 4.89361 18.0164 4.57691C17.7843 4.26021 17.4808 4.00266 17.1305 3.82511C16.7803 3.64757 16.3931 3.55503 16.0004 3.555H4.10942ZM4.10942 3.555L4.09842 3.518C4.05619 3.37656 4.0095 3.23649 3.95842 3.098C3.75597 2.58554 3.41265 2.14082 2.96814 1.81523C2.52364 1.48963 1.99607 1.29645 1.44642 1.258C1.34342 1.25 1.23042 1.25 1.00342 1.25" stroke="#5A4E4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
          </CartButton>
          <MobileMenuIcon
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)
            }
          >
            <FaBars />
          </MobileMenuIcon>
        </Icons>
      </Container>
      {searchOpen && (
        <SearchBarWrapper>
          <SearchBarInner className="search-overlay-content">
            <SearchInput
              autoFocus
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <CloseSearchBtn onClick={() => setSearchOpen(false)} aria-label="Close search">
              <FaTimes />
            </CloseSearchBtn>
            {searchTerm && (
              <SearchResults>
                {searchResults.length === 0 ? (
                  <NoResults>No products found.</NoResults>
                ) : (
                  searchResults.map(product => (
                    <SearchResultItem
                      key={product.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchTerm('');
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      <OptimizedImage src={
                        product.image && !product.image.includes('/') && product.image
                          ? `${imageBasePath}/${product.image}`
                          : product.image
                      } alt={product.title} width={48} height={48} />
                      <ResultInfo>
                        <ResultTitle>{product.title}</ResultTitle>
                        <ResultPrice>${product.price.toFixed(2)}</ResultPrice>
                      </ResultInfo>
                    </SearchResultItem>
                  ))
                )}
              </SearchResults>
            )}
          </SearchBarInner>
        </SearchBarWrapper>
      )}
      {mobileMenuOpen && (
        <>
          <MobileMenuOverlay onClick={() => setMobileMenuOpen(false)} />
          <MobileMenu>
            <MobileMenuHeader>
              <Logo to="/" onClick={() => setMobileMenuOpen(false)}>
                <OptimizedImage src={LogoSvg} alt="ShopEase Logo" width={38} height={38} />
              </Logo>
              <MobileMenuClose
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaTimes />
              </MobileMenuClose>
            </MobileMenuHeader>
            <MobileNav>
              {isAuthenticated ? (
                <MobileAccountSection>
                  <MobileAccountLabel>
                    My Account
                    <MobileAccountName>
                      {user?.firstName ? `(${user.firstName})` : ''}
                    </MobileAccountName>
                  </MobileAccountLabel>
                  <MobileNavLink to="/account" onClick={() => setMobileMenuOpen(false)}>
                    Account Dashboard
                  </MobileNavLink>
                  <MobileNavButton onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                    Logout
                  </MobileNavButton>
                  <MobileDivider />
                </MobileAccountSection>
              ) : (
                <>
                  <MobileNavLink to="/login" onClick={() => setMobileMenuOpen(false)}>Login</MobileNavLink>
                  <MobileNavLink to="/register" onClick={() => setMobileMenuOpen(false)}>Register</MobileNavLink>
                  <MobileDivider />
                </>
              )}
              <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/products" onClick={() => setMobileMenuOpen(false)}>Products</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
              <MobileDivider />
              <MobileNavLink to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                Wishlist {wishlistCount > 0 && <MobileBadge>{wishlistCount}</MobileBadge>}
              </MobileNavLink>
              <MobileNavLink as="button" onClick={() => { setMobileMenuOpen(false); dispatch(toggleCart()); }}>
                Cart {cartCount > 0 && <MobileBadge>{cartCount}</MobileBadge>}
              </MobileNavLink>
            </MobileNav>
          </MobileMenu>
        </>
      )}
    </HeaderContainer>
    </>
    
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  background: ${colors.card};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 9999;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: ${fontSizes.lg};
  font-weight: bold;
  color: ${colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${colors.text};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px; 
  font-size: ${fontSizes.base};
  position: relative;
  overflow: hidden;
  border-radius: ${borderRadius.sm};
  z-index: 1;
  transition: color 0.6s ease, transform 0.3s ease;
  &:before {
    content: '';
    position: absolute;
    left: -150%;
    bottom: -150%;
    width: 0;
    height: 0;
    background: ${colors.highlight};
    border-radius: 8px;
    z-index: -1;
    transform: translate(-50%, 50%);
    transition: width 0.35s cubic-bezier(0.4,0,0.2,1), height 0.35s cubic-bezier(0.4,0,0.2,1), left 0.35s, bottom 0.35s;
  }

  &:hover:before {
    width: calc(100% + 6px);
    height: calc(100% + 4px);
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, 50%);
  }

  &:hover {
    color: ${colors.textLight};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const MobileMenuIcon = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: ${colors.text};
  cursor: pointer;
  margin-left: 10px;
  svg{
    height:auto;
    width: 19px;
  }
  @media (max-width: 900px) {
    display: block;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 900px) {
    .wishlist-header-icon {
      display: none;
    }
  }
`;

const SearchIconBtn = styled.button`
  background: none;
  border: none;
  color: ${colors.text};
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 2px;
  margin-right: 2px;
  &:hover {
    color: ${colors.accent};
  }
`;

const UserDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  outline: none;
`;

const UserIconBtn = styled.button`
  background: none;
  border: none;
  color: ${colors.text};
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 25px 0; 

  &:hover {
    color: ${colors.muted};
  }
`;

const UserName = styled.span`
  margin-left: 8px;
  font-weight: 500;
  color: ${colors.text};
  font-size: 15px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: 220px;
  background: white;
  border: 1px solid #eee;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  z-index: 120;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  padding: 8px 0;
  animation: ${({ $open }) => ($open ? 'fadeInMenu 0.18s' : 'none')};
  margin-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  right: auto;

  @keyframes fadeInMenu {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const DropdownItem = styled(Link)`
  padding: 10px 20px;
  color: ${colors.text};
  text-decoration: none;
  font-size: 15px;
  background: none;
  border: none;
  text-align: left;

  &:hover {
    background: #f5f5f5;
    color: #111;
  }
`;

const DropdownButton = styled.button`
  padding: 10px 20px;
  color: ${colors.text};
  background: none;
  border: none;
  font-size: 15px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
    color: #111;
  }
`;

const WishlistButton = styled(Link)`
  background: none;
  border: none;
  font-size: 18px;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 2px;
  position: relative;
  
  &:hover {
    color: ${colors.accent};
  }
`;

const WishlistCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${colors.warning};
  color: ${colors.textLight};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.xs};
`;

const CartButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  position: relative;
  cursor: pointer;
  color: ${colors.text};
  padding: 0 0;
  position:relative;
  top:2px;
  &:hover {
    color: ${colors.muted};
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${colors.warning};
  color: ${colors.textLight};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.xs};
`;


const MobileMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.28);
  z-index: 999;
`;

const MobileMenu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 82vw;
  max-width: 340px;
  height: 100vh;
  background: #fff;
  z-index: 1000;
  box-shadow: 2px 0 16px rgba(0,0,0,0.13);
  display: flex;
  flex-direction: column;
  animation: slideInLeft 0.22s;
  @keyframes slideInLeft {
    from { transform: translateX(-100%);}
    to { transform: translateX(0);}
  }
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 7px 20px;
  border-bottom: 1px solid #eee;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const MobileMenuClose = styled.button`
  background: none;
  border: none;
  font-size: 26px;
  color: ${colors.text};
  cursor: pointer;
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 0 0 0;
`;

const MobileNavLink = styled(Link)`
  padding: 14px 28px;
  color: #222;
  font-size: 17px;
  text-decoration: none;
  font-weight: 500;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display:flex;
  &:hover {
    background: #f5f5f5;
    color: ${colors.primary};
  }
`;

const MobileNavButton = styled.button`
  padding: 14px 28px;
  color: #222;
  font-size: 15px;
  font-weight: 500;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
    color: ${colors.primary};
  }
`;

const MobileDivider = styled.div`
  height: 1px;
  background: #eee;
  margin: 10px 0;
`;

const MobileBadge = styled.span`
  display: inline-flex;
  margin-left: 8px;
  background: ${colors.primary};
  color: #fff;
  border-radius: 50px;
  font-size: 12px;
  width: 25px;
  height: 25px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const MobileAccountSection = styled.div`
  padding: 18px 28px 0 28px;
  background: #faf9fa;
  border-bottom: 1px solid #eee;
`;

const MobileAccountLabel = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #5b4a44;
  margin-bottom: 4px;
`;

const MobileAccountName = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #e5a6a6;
  margin-left: 6px;
`;

const Banner = styled.div`
  width: 100%;
  background: ${colors.info};
  color: ${colors.textLight};
  display: flex;
  align-items: center;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  position: relative;
  overflow: hidden;
  z-index: 110;
`;


const Carousel = styled.div`
  flex: 1;
  padding: 10px 20px;
  overflow: hidden;
  position: relative;
  text-align: center;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap:wrap;
  gap: 5px;
`;

const PromoCode = styled.span`
  font-weight: 600;
  background: ${colors.textLight};
  color: ${colors.primary};
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 10px;
  font-size: ${fontSizes.xs};
  letter-spacing: 0.5px;
  `;  



const SearchBarWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 110px;
  z-index: 2000;
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const SearchBarInner = styled.div`
  background: #fff;
  border-radius: 0 0 12px 12px;
  padding: 10px 28px 10px 28px;
  min-width: 350px;
  max-width: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 0;
`;


const SearchInput = styled.input`
  width: 100%;
  padding: 0 48px 0 18px;
  min-height: 40px;
  font-size: 14px;
  border-radius: 8px;
  border: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  outline: none;
  background: #faf9fa;
`;

const CloseSearchBtn = styled.button`
  position: absolute;
  top: 22px;
  right: 40px;
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: ${colors.accent};
  }
`;

const SearchResults = styled.div`
  max-height: 320px;
  overflow-y: auto;
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.13s;
  &:hover {
    background: #f7f7f7;
  }
`;

const ResultImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 7px;
  background: #fafafa;
`;

const ResultInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ResultTitle = styled.div`
  font-size: 16px;
  color: #222;
  font-weight: 500;
`;

const ResultPrice = styled.div`
  font-size: 15px;
  color: #e5a6a6;
  font-weight: 600;
`;

const NoResults = styled.div`
  color: #888;
  font-size: 15px;
  padding: 18px 0 0 0;
  text-align: center;
`;

export default Header;