import styled from 'styled-components';
import { pxToRem, fontSizes, colors } from '../../assets/styles/theme';

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(16)};
  margin: ${pxToRem(5)} 0;
`;
const QtyLabel = styled.span`
  font-size: 1.1rem;
  color: #5b4a44;
  font-weight: 600;
`;
const QtyControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
`;
const QtyBtn = styled.button`
  width: ${pxToRem(38)};
  height: ${pxToRem(38)};
  border-radius: ${pxToRem(30)};
  background: ${colors.info};
  border: ${pxToRem(1.5)} solid #ede7f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.md};
  &:hover { background: #ede7f6; }
`;
const QtyInput = styled.input`
  max-width: ${pxToRem(38)};
  height: ${pxToRem(38)};
  border-radius: ${pxToRem(30)};
  border: ${pxToRem(1.5)} solid #ede7f6;
  background: #fff;
  text-align: center;
  font-size: ${fontSizes.sm};
  color: #5b4a44;
  font-weight: 600;
  outline: none;
`;

const QuantitySelector = ({ value, onChange, min = 1, max = 99 }) => (
  <QtyRow>
    <QtyLabel>Qty</QtyLabel>
    <QtyControl>
      <QtyBtn type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></QtyBtn>
      <QtyInput type="tel" value={value} min={min} max={max} onChange={e => onChange(Number(e.target.value))} />
      <QtyBtn type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M5 12H19" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></QtyBtn>
    </QtyControl>
  </QtyRow>
);

export default QuantitySelector;
