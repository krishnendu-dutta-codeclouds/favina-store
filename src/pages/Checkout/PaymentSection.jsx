import styled from 'styled-components';
import { borderRadius, colors, pxToRem } from '../../assets/styles/theme.js';
import CustomRadio from '../../components/ui/CustomRadio';

const PaymentSection = () => (
  <PaymentSectionWrapper>
    <h2>Payment Method</h2>
    <PaymentOption>
      <CustomRadio checked={true} readOnly id="cod" name="payment">
        <label htmlFor="cod">Cash on Delivery</label>
      </CustomRadio>
    </PaymentOption>
    <Note>Only Cash on Delivery is available at this time.</Note>
  </PaymentSectionWrapper>
);

const PaymentSectionWrapper = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  @media (max-width: 600px) {
    margin-top: 18px;
    padding-top: 10px;
  }
`;
const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Note = styled.div`
  color: ${colors.danger};
  font-size: 14px;
  margin-top: 8px;
  @media (max-width: 600px) {
    font-size: 12px;
    margin-top: 4px;
  }
`;

export default PaymentSection;
