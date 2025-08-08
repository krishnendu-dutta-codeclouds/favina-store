import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ProductGrid from '../../components/product/ProductGrid';
import Button from '../../components/common/Button';
import Testimonials from '../../components/common/Testimonials';
import productData from '../../data/product.json';
import bannerImg from '../../assets/images/Banner.jpg';
import TextSliderWrapper from '../../components/common/TextSliderWrapper';
import PromoBanner, { BannerHighlight } from '../../components/common/PromoBanner';
import promoImg from '../../assets/images/main-bg1.png';
import { colors, fontSizes, fonts } from '../../assets/styles/theme';
import BeautyPicks from './BeautyPicks';
import SkinSpotlight from './SkinSpotlight';
import NewPromoSection from '../../components/common/NewPromoSection';
import OptimizedImage from '../../components/common/OptimizedImage';

const sliderMessages = [
  { text: "Limited Time Only", highlight: true },
  { text: "Flat 30% Off", highlight: false },
  { text: "Free Gift Inside", highlight: true },
  { text: "Hot Deal Alert", highlight: false },
  { text: "Exclusive Online Offer", highlight: true },
  { text: "Glow & Save", highlight: false }
];



const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setProducts(productData.products || []);
    const allTestimonials = [];
    (productData.products || []).forEach(product => {
      if (product.testimonials && product.testimonials.length > 0) {
        product.testimonials.forEach(t =>
          allTestimonials.push({
            ...t,
            productId: product.id,
            productTitle: product.title,
            category: product.category,
          })
        );
      }
    });
    setTestimonials(allTestimonials);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeroSection $banner={`${bannerImg}`}>
        <OptimizedImage
          src={bannerImg}
          alt="Hero Banner"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          className="hero-banner-image"
        />
        <Container>
          <HeroInner>
            <HeroHeading>
              Unleash Your <Highlight>Natural Glow</Highlight>
            </HeroHeading>
            <HeroSubtitle>
              Discover skincare and makeup that loves you back.
            </HeroSubtitle>
            <HeroOfferRow>
              <DiscountBadge>Get 30% OFF</DiscountBadge>
              <OfferText>on your first purchase!</OfferText>
            </HeroOfferRow>
            <ShopNowBtn to="/products">Shop Now</ShopNowBtn>
          </HeroInner>
          </Container>
      </HeroSection>

      <TextSliderWrapper messages={sliderMessages} />

      <PromoBanner
        image={promoImg}
        titlePink="Limited Edition"
        titlePurple="Unlimited Glam"
        desc="Unveil your beauty with our exclusive launch offer on premium nail polish shades."
        offerLabel="Flat"
        offerHighlight="30% OFF"
        sub={
          <>
            on your first purchase<br />
            for the next <BannerHighlight>24 hours</BannerHighlight> only!
          </>
        }
        buttonText="Shop Now"
        buttonTo="/products"
      />

      <BeautyPicks />   

      <SkinSpotlight />

      <FeaturedSection>
        <Container>
        <h2>Featured Products</h2>
        <ProductGrid products={products.slice(0, 8)} />
        </Container>
      </FeaturedSection>

      <NewPromoSection />

      <Testimonials testimonials={testimonials} />
    </>
  );
};

const Container = styled.div`
  max-width: 1320px;
  width: 100%;
  margin: 40px auto 0;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  z-index: 1;
  & > * {
    flex: 1;
    width: 100%;
   }
`;

const HeroSection = styled.section`
  overflow: hidden;
  width: 100%;
  min-height: 40vh;
  padding: 100px 30px 100px;
  background: linear-gradient(45deg, #fcfaf7, #f2eae0);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  .hero-banner-image{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    @media (max-width: 900px) {
        z-index: 0;
        height: 63vw;
        margin-left: auto;
        margin-right: 0;
        display: flex;
        object-position: right -14vw bottom 0vw;
        position: relative;
    }
  }
  @media (max-width: 900px) {
    padding-top:0;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    min-height: 420px;
    justify-content: center;
    background-position: right bottom;
    flex-direction: column-reverse;
    background:#fbf6f2;
  }
`;

const HeroInner = styled.div`
  max-width: 480px;
  border-radius: 12px;
  padding: 48px 0 40px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 600px) {
    padding: 28px 0 24px 0;
    max-width: 100%;
  }
`;

const HeroHeading = styled.h1`
  font-size: ${fontSizes.xxl};
  font-family: ${fonts.title};
  font-weight: 800;
  color: ${colors.text};
  margin: 0 0 12px 0;
  line-height: 1.1;
  letter-spacing: -1px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.xl};
  }
`;

const Highlight = styled.span`
  color: ${colors.primary};
`;

const HeroSubtitle = styled.p`
  font-size: ${fontSizes.md};
  font-family: ${fonts.body};
  color: ${colors.text};
  margin: 0 0 18px 0;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: ${fontSizes.base};
  }
`;

const HeroOfferRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  flex-wrap: wrap;
`;

const DiscountBadge = styled.span`
  background: ${colors.info};
  color: ${colors.textLight};
  font-weight: 700;
  font-size: ${fontSizes.md};
  border-radius: 7px;
  padding: 7px 22px;
  display: inline-block;
  margin-right: 8px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.sm};
    padding: 5px 16px;
  }
`;

const OfferText = styled.span`
  color: ${colors.text};
  font-size: ${fontSizes.md};
  font-weight: 400;
`;

const ShopNowBtn = styled(Button)`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  max-width: 180px;
  border-radius: 7px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  background: #fff;
  color: ${colors.text};
  border: none;
  
`;

const FeaturedSection = styled.section`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 0;
  width: 100%;
  h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: ${fontSizes.xl};
    width: 100%;
    font-family: ${fonts.title};
    font-weight: 800;
    color:${colors.text}
  }
`;


export default HomePage;