import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors, fontSizes, gapSizes } from '../../assets/styles/theme';

const BeautyPicksSection = styled.section`
  padding: 40px 0;
  text-align: center;
`;

const Container = styled.div`
    max-width: 1320px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
`;

const Title = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: 700;
  margin-bottom: 30px;
    color: ${colors.text};
  span {
    color: ${colors.primary};
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: ${fontSizes.lg};
  }
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${gapSizes.lg};
  justify-content: center;
  @media (min-width: 768px) and (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media (max-width: 767px) {
    gap: ${gapSizes.md};
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const CardImage = styled.img`
  width: 100%;
  display: block;
`;

const CardText = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: ${colors.textLight};
  text-align: left;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);

  p {
    margin: 0;
    font-size: ${fontSizes.sm};
  }

  strong {
    font-size: ${fontSizes.base};
  }
`;

const cardData = [
  {
    image: "/discounted-1.png",
    title: "On Best Seller",
    offer: "Up To 10% Off",
  },
  {
    image: "/discounted-2.png",
    title: "Sampoo and Mask",
    offer: "Up To 10% Off",
  },
  {
    image: "/discounted-3.png",
    title: "On Kay Bestseller",
    offer: "Up To 20% Off",
  },
  {
    image: "/discounted-4.png",
    title: "On Best Seller",
    offer: "Up To 30% Off",
  },
];

const BeautyPicks = () => {
  return (
    <BeautyPicksSection>
      <Container>
        <Title>
        <span>Beauty Picks</span> for Every Mood
      </Title>
      <CardsWrapper>
        {cardData.map((card, index) => (
          <Link to="/products" key={index} style={{ textDecoration: 'none' }}>
            <Card>
              <CardImage src={card.image} alt={card.title} />
              <CardText>
                <p>{card.title}</p>
                <strong>{card.offer}</strong>
              </CardText>
            </Card>
          </Link>
        ))}
      </CardsWrapper>
      </Container>
    </BeautyPicksSection>
  );
};

export default BeautyPicks;
