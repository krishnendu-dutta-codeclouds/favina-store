import styled from 'styled-components';
import { fonts, fontSizes, colors } from '../../assets/styles/theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const Testimonials = ({ testimonials = [], title = "Real Words from Real Beauties", loop = true, autoplay = true }) => {
  if (!testimonials.length) return null;

  return (
    <TestimonialSection>
      <TestimonialTitle>
        Real Words from <span>Real Beauties</span>
      </TestimonialTitle>
      <TestimonialSwiperContainer>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          autoHeight={true}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          style={{ paddingBottom: 40 }}
          loop={loop}
          speed={600}
          autoplay={
            autoplay
              ? {
                  delay: 10000, 
                  disableOnInteraction: false,
                }
              : false
          }
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <TestimonialCard>
                <TestimonialHeader>
                  <TestimonialQuote>{testimonial.quote}</TestimonialQuote>
                </TestimonialHeader>
                <TestimonialTextBox>
                  <TestimonialText>
                    {testimonial.text}
                  </TestimonialText>
                </TestimonialTextBox>
                <TestimonialUserRow>
                  <TestimonialUser>
                    — {testimonial.name || testimonial.user}
                    {testimonial.location && `, ${testimonial.location}`}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.00004 2L5.33337 4H2.66671L3.33337 6.66667L1.33337 8L3.33337 9.33333L2.66671 12H5.33337L6.00004 14L8.00004 12.6667L10 14L10.6667 12H13.3334L12.6667 9.33333L14.6667 8L12.6667 6.66667L13.3334 4H10.6667L10 2L8.00004 3.33333L6.00004 2ZM10.6667 5.33333L11.3334 6L6.66671 10.6667L4.66671 8.66667L5.33337 8L6.66671 9.33333L10.6667 5.33333Z" fill="#8BC34A"/>
                      </svg>
                  </TestimonialUser>
                  <RatingBadge>
                    <StarIcon>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99965 13.0712L4.33439 15.3664C4.17247 15.4736 4.00319 15.5195 3.82655 15.5042C3.64991 15.4889 3.49535 15.4277 3.36287 15.3205C3.23039 15.2134 3.12735 15.0797 3.05375 14.9193C2.98015 14.759 2.96543 14.579 3.00959 14.3795L3.98111 10.0414L0.735365 7.12633C0.588165 6.98861 0.496313 6.83161 0.459808 6.65534C0.423302 6.47906 0.434195 6.30706 0.492486 6.13935C0.550777 5.97164 0.639096 5.83393 0.757444 5.7262C0.875793 5.61847 1.03771 5.54961 1.2432 5.51962L5.5267 5.12942L7.18269 1.04379C7.25629 0.860168 7.37052 0.72245 7.52537 0.630638C7.68022 0.538826 7.83832 0.49292 7.99965 0.49292C8.16098 0.49292 8.31907 0.538826 8.47392 0.630638C8.62878 0.72245 8.743 0.860168 8.8166 1.04379L10.4726 5.12942L14.7561 5.51962C14.9622 5.55023 15.1241 5.61909 15.2418 5.7262C15.3596 5.83331 15.4479 5.97103 15.5068 6.13935C15.5657 6.30768 15.5769 6.47998 15.5404 6.65625C15.5039 6.83253 15.4117 6.98923 15.2639 7.12633L12.0182 10.0414L12.9897 14.3795C13.0339 14.5784 13.0191 14.7584 12.9455 14.9193C12.8719 15.0803 12.7689 15.214 12.6364 15.3205C12.5039 15.427 12.3494 15.4883 12.1727 15.5042C11.9961 15.5201 11.8268 15.4742 11.6649 15.3664L7.99965 13.0712Z" fill="#F6C6A7"/>
                        </svg>
                    </StarIcon>
                    {testimonial.rating?.toFixed ? testimonial.rating.toFixed(1) : testimonial.rating || '5.0'}
                  </RatingBadge>
                </TestimonialUserRow>
              </TestimonialCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </TestimonialSwiperContainer>
    </TestimonialSection>
  );
};

const TestimonialSwiperContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px 40px 20px;
  overflow: hidden;
  .swiper{
    overflow:visible;
    padding: 20px 0 60px ;
    @media (max-width: 768px) {
      padding-top:0 ;
    }
  }
  .swiper-pagination {
    bottom: 0 !important;
    margin-top: 12px;
  }
  .swiper-pagination-bullet {
    background: ${colors.text};
    opacity: 1;
    width: 12px;
    height: 12px;
    margin: 0 6px !important;
    transition: background 0.2s, opacity 0.2s;
  }
  .swiper-pagination-bullet-active {
    background: ${colors.text};
    opacity: 1;
    width: 50px;
    border-radius: 8px;
  }
`;


const TestimonialSection = styled.section`
  margin: 70px auto 0;
  padding: 60px 0 0 0;
  overflow: hidden;
  width: 100%;
  background: ${colors.background};
  @media (max-width: 768px) {
    margin-top:20px;
    padding-top:40px;
  }
`;

const TestimonialTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  font-size: ${fontSizes.xl};
  font-family: ${fonts.title};
  font-weight: 800;
  color: #5a4e4d;
  letter-spacing: -1px;
  width: 100%;
  padding: 0 20px;

  span {
    color: #e5a6a6;
    font-family: ${fonts.title};
    font-weight: 800;
    letter-spacing: -1px;
  }
`;

const TestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  background: #fff;
  border-radius: 12px;
  padding: 28px 24px 18px 24px;
  min-height: 200px;
  box-shadow: 0 8px 32px 0 rgba(160,132,202,0.08), 0 1.5px 8px 0 rgba(160,132,202,0.04);
  border: none;
  transition: box-shadow 0.18s, border 0.18s, transform 0.18s;
  position: relative;
  margin-bottom: 8px;
  &:hover {
    box-shadow: 0 16px 36px rgba(160,132,202,0.13), 0 2px 12px rgba(160,132,202,0.10);
    transform: translateY(-4px) scale(1.025);
  }
`;


const TestimonialText = styled.div`
  font-size: 1rem;
  font-family: ${fonts.body};
  color: #555;
  font-style: italic;
  line-height: 1.5;
  min-height: 60px;
`;


const TestimonialHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
`;

const TestimonialQuote = styled.div`
  font-size: 1.18rem;
  font-family: ${fonts.title};
  font-weight: 700;
  color: #3a2e2d;
  margin-bottom: 0;
  flex: 1;
`;

const RatingBadge = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #dedede;
  color: ${colors.text};
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 4px 12px 4px 8px;
  margin-left: 12px;
  box-shadow: 0 2px 8px rgba(229,166,166,0.08);
  gap: 6px;
`;

const StarIcon = styled.span`
  color: #e5a6a6;
  font-size: 1.1em;
  margin-right: 2px;
`;

const TestimonialTextBox = styled.div`
  background: #f3f3f3;
  border-radius: 8px;
  padding: 16px 18px;
  margin-bottom: 18px;
  width: 100%;
  min-height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const TestimonialUserRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TestimonialUser = styled.div`
  font-size: 1rem;
  color: #222;
  font-family: ${fonts.body};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default Testimonials;
