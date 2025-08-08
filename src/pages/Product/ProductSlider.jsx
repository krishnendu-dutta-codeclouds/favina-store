import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import { pxToRem, borderRadius } from '../../assets/styles/theme';
import OptimizedImage from '../../components/common/OptimizedImage';

const ProductImageSection = styled.div`
  width: 50%;
  background: #f9f9f9;
  border-radius: ${borderRadius.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  max-width: 100%;
  border: ${pxToRem(1.5)} solid #ede7f6;
  padding:${pxToRem(24)} ${pxToRem(20)} ${pxToRem(20)} ${pxToRem(16)};
  @media (min-width: 1100px) {
    position: sticky;
    top: 90px;
  }
  .swiper-slide{
      background: #fff;
      overflow: hidden;
      border-radius: ${pxToRem(6)};
    }
  .swiper{
    width: 100%;
    max-width: 100% !important;
    
    &:not(.swiper + .swiper){
      margin-bottom: ${pxToRem(10)} !important;
    }
  }
    .swiper-thumbs{
      .swiper-slide{
      border-radius: ${pxToRem(6)};
      background: transparent;}
    }
  @media (max-width: 1099px) {
    width: 100%;
    max-width: 100%;
    padding: 10px 8px 10px 8px;
  }
`;
const ProductImage = styled.img`
  width: 100%;
  object-fit: contain;
  margin-bottom: 0;
  aspect-ratio: 1 / 1;
`;
const ThumbImage = styled.img`
  display: block;
  width: 100%;
  height:auto;
  object-fit: contain;
  border-radius: ${pxToRem(6)};
  background: #fff;
  cursor: pointer;
  box-shadow: 0 ${pxToRem(2)} ${pxToRem(12)} rgba(63,136,197,0.10);
  transition: border 0.18s, box-shadow 0.18s;
  &:hover {
    border: ${pxToRem(2.5)} solid #a084ca;
  }
`;

const ProductSlider = ({ product, imageBasePath, thumbsSwiper, setThumbsSwiper, activeImgIdx, setActiveImgIdx }) => (
  <ProductImageSection>
    <Swiper
      modules={[Thumbs, Navigation]}
      navigation
      thumbs={{ swiper: thumbsSwiper }}
      spaceBetween={10}
      slidesPerView={1}
      style={{ width: '100%', maxWidth: 440, marginBottom: 18 }}
      className="product-detail-swiper"
      onSlideChange={swiper => setActiveImgIdx(swiper.activeIndex)}
      initialSlide={activeImgIdx}
    >
      {(product.images || [product.image]).map((img, idx) => (
        <SwiperSlide key={idx}>
          <OptimizedImage
            src={
              img.startsWith('/') || img.startsWith('http')
                ? img
                : `${imageBasePath}/${img}`
            }
            alt={product.title}
            width={440}
            height={440}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    <Swiper
      modules={[Thumbs]}
      onSwiper={setThumbsSwiper}
      spaceBetween={10}
      slidesPerView={4}
      watchSlidesProgress
      style={{ width: '100%', maxWidth: 440 }}
    >
      {(product.images || [product.image]).map((img, idx) => (
        <SwiperSlide key={idx}>
          <OptimizedImage
            src={
              img.startsWith('/') || img.startsWith('http')
                ? img
                : `${imageBasePath}/${img}`
            }
            alt={`thumb-${idx}`}
            width={80}
            height={80}
            style={{
              borderColor: idx === activeImgIdx ? '#a084ca' : '#eee',
              boxShadow: idx === activeImgIdx ? '0 2px 8px #a084ca22' : 'none'
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </ProductImageSection>
);

export default ProductSlider;
