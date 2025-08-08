// Wrapper for ImageCard components, styled for 2-column mobile layout
import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { colors, fontSizes, gapSizes } from '../../assets/styles/theme';

const Section = styled.section`
  display: flex;
  gap: ${gapSizes.lg};
  padding: 50px 20px;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${colors.card};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  flex: 1;
  
  max-width: 400px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
`;

const LeftCard = styled(Card)`
  background-color: ${colors.info};
  display: flex;
  width:420px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  @media (max-width: 768px) {
      max-width: 100%;
  }
  &:hover{
    h3{
      color: ${colors.primary};
    }
    p{
      color: ${colors.highlight};
    }
    h4,.icon{ color: ${colors.textLight};}
    .icon svg{
      color: ${colors.text};
    }
    &::before {
      transform: scale(15);
    }
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -50px;
    left: -50px;
    width: 100px;
    height: 100px;
    background-color: ${colors.text};
    border-radius: 50%;
    transform: scale(4);
    transition: transform 0.5s ease;
    z-index: 0;
    @media (max-width: 768px) {
       bottom: -120px;
        left: -120px;
    }
  }

  h3 {
    font-size: ${fontSizes.xl};
    font-weight: 700;
    margin-bottom: 10px;
    color: ${colors.text};
    transition: color 0.5s ease;
     z-index: 1;
  }

  h4 {
    font-size: ${fontSizes.base};
    font-weight: 600;
    color: ${colors.text};
    margin-bottom: 20px;
    transition: color 0.5s ease;
    z-index: 1;
  }

  p {
    color: ${colors.text};
    font-size: ${fontSizes.sm};
    margin-bottom: 20px;
    transition: color 0.5s ease;
    z-index: 1;
  }

  .icon {
    width: 35px;
    height: 35px;
    background-color: ${colors.textLight};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    svg {
      transform: rotate(-45deg);
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  &:hover .icon svg {
    transform: rotate(0deg);
  }
`;

const ImageCard = styled(Card)`
  position: relative;
  text-align: center;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  .caption {
    margin: 10px auto;
    font-size: ${fontSizes.base};
    font-weight: 500;
    color: ${colors.text};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    text-align: left;
    @media (max-width: 768px) {
       font-size: ${fontSizes.sm};
    }
  }

  .icon {
    width: 28px;
    height: 28px;
    background-color: ${colors.dark};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      transform: rotate(-45deg);
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  &:hover .icon svg {
    transform: rotate(0deg);
  }
`;


const ImageCardsWrapper = styled.div`
  display: flex;
  width: auto;
  max-width: 60%;
  gap: ${gapSizes.md};
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    gap: ${gapSizes.sm};
   max-width: 100%;
  }
`;

const SkinSpotlight = () => {
  const navigate = useNavigate();
  const handleLeftCardClick = () => {
    navigate('/products', { state: { selectedCategories: ['Skincare'] } });
  };
  return (
    <Section>
      <LeftCard onClick={handleLeftCardClick} tabIndex={0} style={{cursor:'pointer'}}>
        <h3>Skin in the Spotlight</h3>
        <h4>Highly-loved, deeply nourishing</h4>
        <p>find your new obsession</p>
        <div className="icon">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </div>
      </LeftCard>

      <ImageCardsWrapper>
        <ImageCard>
          <img src="/viral-beauty.png" alt="Viral Beauty Essentials" />
          <div className="caption">
            Viral Beauty Essentials
            <div className="icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </ImageCard>
        <ImageCard>
          <img src="/no-makeup.png" alt="No Makeup, Makeup Edit" />
          <div className="caption">
            No Makeup, Makeup Edit
            <div className="icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </ImageCard>
      </ImageCardsWrapper>
    </Section>


  );
};

export default SkinSpotlight;
