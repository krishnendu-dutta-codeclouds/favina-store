import styled from 'styled-components';
import { pxToRem, fontSizes, colors, fonts, gapSizes  } from '../../assets/styles/theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import RatingBox from '../../components/common/RatingBox';
import bgTestimonial from '../../assets/images/pawel-czerwinski-fcZU7mRWImY-unsplash1.png';


const CustomTestimonialSectionWrapper = styled.section`
  overflow: hidden;
  margin: ${pxToRem(70)} auto 0 auto;
  min-height: ${pxToRem(340)};
  width: 100%;
  padding: ${pxToRem(0)} ${pxToRem(20)};
  @media (max-width: 1099px) {
    flex-direction: column;
    min-height: 0;
  }
`;
const TestimonialContainer = styled.div`
  box-shadow: 0 2px 18px rgba(0,0,0,0.06);
  border-radius: ${pxToRem(10)};
  display: flex;
  width: 100%;
  margin: auto;
  @media (max-width: 1099px) {
    flex-direction: column;
  }
`;
const TestimonialTitle = styled.h2`
  font-size: ${fontSizes.xl};
  color: ${colors.text};
  font-weight: 800;
  margin-bottom: ${pxToRem(24)};
  text-align: center;
  @media (max-width: 1099px) {
    font-size: ${fontSizes.lg}; 
    margin-bottom: ${pxToRem(16)};
  }
`;
const TestimonialLeft = styled.div`
  width: 50%;
  background: #fbeaec url(${bgTestimonial}) no-repeat center center;
  background-size: cover;
  padding: 48px 38px 38px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px 0 0 10px;
  @media (max-width: 1099px) {
    width: 100%;
    padding: 28px 18px 18px 18px;
  }
  .swiper-pagination-bullet{
    background-color: ${colors.primary} !important;
  }
`;
const TestimonialRating = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${gapSizes.md};
  margin-bottom: 18px;
`;
const TestimonialSlide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 320px;
  padding: 0 10px;
`;
const TestimonialQuote = styled.div`
  font-size: ${fontSizes.xl};
  font-family: ${fonts.title};
  line-height: 1;
  font-weight: 700;
  color: ${colors.text};
  margin-bottom: ${gapSizes.md};
  text-align: center;
`;
const TestimonialText = styled.div`
  font-size: ${fontSizes.md};
  font-family: ${fonts.body};
  color: ${colors.text};
  margin-bottom: ${gapSizes.md};
  max-width: 600px;
  text-align: center;
`;
const TestimonialUser = styled.div`
  font-size: ${fontSizes.base};
  color: ${colors.text};
  margin-bottom: ${gapSizes.md};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${gapSizes.sm};
`;
const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${gapSizes.xs};
  color: ${colors.text};
  font-size: ${fontSizes.sm};
  margin-left: ${gapSizes.sm};
`;
const VerifiedIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
`;
const TestimonialRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 38px 28px;
  background: #fff;
  border-radius: 0 10px 10px 0;
  @media (max-width: 1099px) {
    padding: 24px 12px;
  }
`;
const ProductImg = styled.img`
  width: 100%;
  height: 320px;
  object-fit: contain;
  margin-bottom: 28px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(231,76,60,0.08);
`;
const FeatureList = styled.div`
  display: flex;
  gap: ${gapSizes.lg};
  justify-content: center;
`;
const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${gapSizes.sm};
`;
const FeatureIcon = styled.img`
  width: 54px;
  height: 54px;
  object-fit: contain;
  margin-bottom: 4px;
`;
const FeatureText = styled.div`
  font-size: ${fontSizes.base};
  color: ${colors.highlight};
  font-weight: 600;
  text-align: center;
`;

const CustomTestimonialSection = ({
  testimonialSlides = [],
  product,
  imageBasePath
}) => (
  <CustomTestimonialSectionWrapper>
    <TestimonialTitle>Customer Reviews</TestimonialTitle>
    <TestimonialContainer>
      <TestimonialLeft>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          speed={600}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          style={{ maxWidth: 600, width: '100%' }}
        >
          {testimonialSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <TestimonialSlide>
                <TestimonialRating>
                  <RatingBox rating={slide.rating.toFixed(1)} />
                </TestimonialRating>
                <TestimonialQuote>
                  "{slide.quote}"
                </TestimonialQuote>
                <TestimonialText>
                  {slide.text}
                </TestimonialText>
                <TestimonialUser>
                  ~ {slide.user}
                  {slide.verified && (
                    <VerifiedBadge>
                      <VerifiedIcon>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.56252 1.03957C9.76494 0.993048 9.97682 1.01071 10.1687 1.09009C10.3607 1.16948 10.5231 1.30665 10.6335 1.48257L11.6275 3.06957C11.7077 3.19739 11.8157 3.30542 11.9435 3.38557L13.5305 4.37957C13.7068 4.4899 13.8443 4.65245 13.9239 4.84459C14.0035 5.03673 14.0212 5.2489 13.9745 5.45157L13.5545 7.27557C13.5206 7.42298 13.5206 7.57616 13.5545 7.72357L13.9745 9.54857C14.0207 9.75095 14.0028 9.96268 13.9232 10.1544C13.8437 10.3461 13.7064 10.5084 13.5305 10.6186L11.9435 11.6136C11.8157 11.6937 11.7077 11.8017 11.6275 11.9296L10.6335 13.5166C10.5233 13.6927 10.3609 13.8301 10.1689 13.9096C9.977 13.9892 9.76504 14.007 9.56252 13.9606L7.73752 13.5406C7.59043 13.5068 7.43761 13.5068 7.29052 13.5406L5.46552 13.9606C5.263 14.007 5.05104 13.9892 4.85911 13.9096C4.66717 13.8301 4.50479 13.6927 4.39452 13.5166L3.40052 11.9296C3.32009 11.8016 3.21171 11.6936 3.08352 11.6136L1.49752 10.6196C1.32142 10.5093 1.18404 10.3469 1.10447 10.155C1.0249 9.96305 1.00709 9.75109 1.05352 9.54857L1.47252 7.72357C1.5064 7.57616 1.5064 7.42298 1.47252 7.27557L1.05252 5.45157C1.00596 5.2488 1.02381 5.03655 1.10358 4.8444C1.18334 4.65225 1.32105 4.48976 1.49752 4.37957L3.08352 3.38557C3.21171 3.30554 3.32009 3.1975 3.40052 3.06957L4.39452 1.48257C4.50487 1.30684 4.66715 1.16979 4.85887 1.09042C5.05059 1.01104 5.26225 0.993272 5.46452 1.03957L7.29052 1.45857C7.43761 1.4923 7.59043 1.4923 7.73752 1.45857L9.56252 1.03957Z" fill="#F6C6A7" stroke="#5A4E4D"/>
                        <path d="M5.0285 8.03565L7.0635 9.98465L9.9985 5.01465" fill="#F6C6A7"/>
                        <path d="M5.0285 8.03565L7.0635 9.98465L9.9985 5.01465" stroke="#5A4E4D" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </VerifiedIcon>
                      Verified Buyers
                    </VerifiedBadge>
                  )}
                </TestimonialUser>
              </TestimonialSlide>
            </SwiperSlide>
          ))}
        </Swiper>
      </TestimonialLeft>
      <TestimonialRight>
        <ProductImg
          src={
            product.image
              ? product.image.startsWith('/')
                ? product.image
                : product.image.startsWith('products/')
                  ? `${imageBasePath}/${product.image.replace(/^products\//, '')}`
                  : !product.image.includes('/') && product.image
                    ? `${imageBasePath}/${product.image}`
                    : product.image
              : ''
          }
          alt="Product"
        />
        <FeatureList>
          <Feature>
            <FeatureIcon
              src={
                Array.isArray(product.images) && product.images.length > 0
                  ? (product.images[0].startsWith('/') || product.images[0].startsWith('http')
                      ? product.images[0]
                      : `${imageBasePath}/${product.images[0]}`
                    )
                  : (
                      product.image
                        ? product.image.startsWith('/')
                          ? product.image
                          : `${imageBasePath}/${product.image}`
                        : ''
                    )
              }
              alt="Product Feature"
            />
            <FeatureText>Product Preview</FeatureText>
          </Feature>
        </FeatureList>
      </TestimonialRight>
    </TestimonialContainer>
  </CustomTestimonialSectionWrapper>
);

export default CustomTestimonialSection;
