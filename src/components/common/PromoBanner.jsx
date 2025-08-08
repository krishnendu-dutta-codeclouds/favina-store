import styled from 'styled-components';
import Button from './Button';
import { colors, fontSizes, fonts, pxToRem, pxToMax, clampPx, gapSizes } from '../../assets/styles/theme';
import txtBg1 from '../../assets/images/txt-bg1.png';
const PromoBanner = ({
  image,
  titlePink = "Limited Edition",
  titlePurple = "Unlimited Glam",
  desc = "Unveil your beauty with our exclusive launch offer on premium nail polish shades.",
  offerLabel = "Flat",
  offerHighlight = "30% OFF",
  sub = (
    <>
      on your first purchase<br />
      for the next <BannerHighlight>24 hours</BannerHighlight> only!
    </>
  ),
  buttonText = "Shop Now",
  buttonTo = "/products"
}) => (
  <BannerWrapper>
    <Banner>
      <BannerImage src={image} alt={`${titlePink} ${titlePurple}`} />
      <BannerContent>
        <BannerTitle>
          <BannerTitlePink>{titlePink}</BannerTitlePink>
          <BannerTitlePurple>{titlePurple}</BannerTitlePurple>
        </BannerTitle>
        <BannerDesc>{desc}</BannerDesc>
        <BannerOffer>
          <BannerOfferLabel>{offerLabel}</BannerOfferLabel>
          <BannerOfferHighlight>{offerHighlight}</BannerOfferHighlight>
        </BannerOffer>
        <BannerSub>{sub}</BannerSub>
        <BannerButton to={buttonTo}>{buttonText}</BannerButton>
      </BannerContent>
    </Banner>
  </BannerWrapper>
);

const BannerWrapper = styled.div`
  width: 100%;
  //max-width: 1320px;
  margin: 0 auto 40px auto;
  padding: 0 20px;
`;

const Banner = styled.div`
  width: 100%;
  display: flex;
  background: ${colors.card};
  border-radius: 10px;
  box-shadow: 0 2px 18px rgba(0,0,0,0.06);
  overflow: hidden;
  min-height: 400px;
  @media (max-width: 900px) {
    flex-direction: column;
    min-height: 0;
  }
`;

const BannerImage = styled.img`
  width: 50%;
  min-width: 320px;
  object-fit: cover;
  background: ${colors.background};
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    min-width: 0;
  }
`;

const BannerContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 48px 48px 48px;
  background: ${colors.card};
  background-image: url(${txtBg1});
  background-repeat: no-repeat;
  background-size:cover;
  @media (max-width: 900px) {
    padding: 28px 18px;
  }
`;

const BannerTitle = styled.div`
  font-size: ${clampPx(24, 4, 28, 48)};
  font-weight: 900;
  margin-bottom: ${pxToRem(25)};
  line-height: 1.1;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const BannerTitlePink = styled.span`
  color: ${colors.primary};
  font-weight: 400;
  font-family: ${fonts.title};
  font-size: ${clampPx(24, 4, 28, 48)};
`;

const BannerTitlePurple = styled.span`
  color: ${colors.highlight};
  font-weight: 900;
  margin-top: ${pxToRem(-2)};
`;

const BannerDesc = styled.div`
  font-size: ${clampPx(18, 4, 14, 24)};
  color: #444;
  margin-bottom: ${pxToRem(10)};
  max-width: 480px;
  font-weight: 400;
  line-height: 1.4;
`;

const BannerOffer = styled.div`
  font-size: ${clampPx(24, 4, 28, 48)};
  font-weight: 900;
  color: ${colors.text};
  //margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BannerOfferLabel = styled.span`
  font-weight: 900;
  color: ${colors.text};
`;

const BannerOfferHighlight = styled.span`
  color: ${colors.primary};
  font-weight: 900;
  margin-left: 8px;
`;

const BannerSub = styled.div`
  font-size: ${clampPx(18, 4, 14, 24)};
  color: #444;
  margin-bottom: 22px;
  b {
    color: ${colors.text};
    font-weight: 700;
  }
`;

const BannerHighlight = styled.span`
  color: ${colors.highlight};
  font-weight: 700;
`;

const BannerButton = styled(Button)`
  margin-top: 18px;
  max-width: 180px;
  font-size: ${fontSizes.md};
  font-weight: 700;
  border-radius: 7px;
  background: ${colors.card};
  color: ${colors.text};
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);

    @media (max-width:700px){
      margin-top:0;
    }
`;

export { BannerHighlight };
export default PromoBanner;
