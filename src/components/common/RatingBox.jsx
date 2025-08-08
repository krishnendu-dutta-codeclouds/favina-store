import styled from 'styled-components';
import { fontSizes } from '../../assets/styles/theme';

const RatingBoxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  background: #fff;
  color: #333;
  font-weight: 700;
  font-size: ${fontSizes.xs};
  border-radius: 8px;
  padding: 2px 7px;
  box-shadow: 0 2px 8px rgba(231,76,60,0.08);
`;

const StarIcon = styled.span`
  color: #ffc107;
  font-size:  ${fontSizes.sm};;
  margin-left: 6px;
  svg{
    width: 16px;
    height: auto;
  }
`;

const RatingBox = ({ rating, count }) => (
  <RatingBoxWrapper>
    {rating}
    <StarIcon><svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="#FABB05"/>
</svg>
</StarIcon>
    {count !== undefined && (
      <span style={{ marginLeft: 8, fontWeight: 400, fontSize: fontSizes.xs }}>
        {count} Reviews
      </span>
    )}
  </RatingBoxWrapper>
);

export default RatingBox;
