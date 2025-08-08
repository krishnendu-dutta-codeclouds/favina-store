import styled from 'styled-components';
import LogoSvg from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { colors, fontSizes } from '../../assets/styles/theme';
import { FaInstagram, FaFacebook, FaYoutube, FaPinterest } from 'react-icons/fa';
import OptimizedImage from '../common/OptimizedImage';

const Footer = () => {
  return (
    <FooterContainer>
      <MainContent>
        <LeftSection>
          <LogoImg src={LogoSvg} alt="Favina Cosmetics" width={38} height={38} />
          <PromoText>Get 10% OFF your first order!</PromoText>
          <SmallText>Subscribe to get exclusive offers, tips & early access to new arrivals.</SmallText>
          <Form>
            <EmailInput placeholder="Enter email address" />
            <SendButton><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.24954 11.3833L11.875 7.29998L9.24954 3.21664H2.125L4.751 7.29998L2.125 11.3833H9.24954Z" stroke="#FFF9F4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
 Send</SendButton>
          </Form>
        </LeftSection>

        <NavSection>
          <Column>
            <Heading>Shop</Heading>
            <FooterLink to="/products" state={{ selectedCategories: ['Makeup'] }}>Makeup</FooterLink>
            <FooterLink to="/products" state={{ selectedCategories: ['Skincare'] }}>Skin</FooterLink>
            <FooterLink to="/products" state={{ selectedCategories: ['Haircare'] }}>Hair</FooterLink>
            <FooterLink to="/products" state={{ selectedCategories: ['Fragrance'] }}>Fragrance</FooterLink>
            <FooterLink to="/products">Offers</FooterLink>
            <FooterLink to="/products">Bestsellers</FooterLink>
          </Column>

          <Column>
            <Heading>Customer Care</Heading>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/account/orders">Track Order</FooterLink>
            <FooterLink to="/account">Shipping & Delivery</FooterLink>
            <FooterLink to="/account">Returns & Exchanges</FooterLink>
            <FooterLink to="/account">FAQs</FooterLink>
          </Column>

          <Column>
            <Heading>My Account</Heading>
            <FooterLink to="/login">Login / Register</FooterLink>
            <FooterLink to="/account/orders">My Orders</FooterLink>
            <FooterLink to="/wishlist">Wishlist</FooterLink>
            <FooterLink to="/account">Address Book</FooterLink>
          </Column>

          <Column>
            <Heading>Stay Connected</Heading>
            <IconLink href="#"><FaInstagram /> Instagram</IconLink>
            <IconLink href="#"><FaFacebook /> Facebook</IconLink>
            <IconLink href="#"><FaYoutube /> YouTube</IconLink>
            <IconLink href="#"><FaPinterest /> Pinterest</IconLink>
          </Column>
        </NavSection>
      </MainContent>

      <BottomBar>
        <span>© 2025 Favina Cosmetic Store. All rights reserved.</span>
        <span>Made with 💖 for beauty lovers everywhere.</span>
      </BottomBar>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: #1f1f1f;
  color: ${colors.textLight};
  font-size: ${fontSizes.sm};
`;

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 60px 20px 40px;
  max-width: 1320px;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  flex: 1 1 300px;
  margin-bottom: 40px;
  padding:0 40px 0 0;
`;

const LogoImg = styled.img`
  height: 38px;
  width: auto;
  display: block;
`;

const PromoText = styled.h4`
  font-weight: 600;
  font-size: ${fontSizes.md};
  margin: 0 0 10px;
`;

const SmallText = styled.p`
  margin: 0 0 20px;
  color: ${colors.gray};
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

const EmailInput = styled.input`
  padding: 10px;
  flex: 1;
  border: none;
  border-radius: 4px;
  font-size: ${fontSizes.sm};
`;

const SendButton = styled.button`
  background: ${colors.primary};
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  svg{
    width: 14px;
    height: 14px;
  }
`;

const NavSection = styled.div`
  display: flex;
  flex: 2 1 600px;
  flex-wrap: wrap;
  gap: 40px;
`;

const Column = styled.div`
  flex: 1 1 160px;
`;

const Heading = styled.h4`
  margin-bottom: 12px;
  font-weight: 600;
  font-size: ${fontSizes.md};
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${colors.gray};
  text-decoration: none;
  margin-bottom: 8px;

  &:hover {
    color: ${colors.textLight};
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  color: ${colors.gray};
  text-decoration: none;
  margin-bottom: 8px;
  gap: 8px;

  &:hover {
    color: ${colors.textLight};
  }
`;

const BottomBar = styled.div`
  background: ${colors.info};
  color: #333;
  text-align: center;
  font-size: ${fontSizes.sm};
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;


export default Footer;