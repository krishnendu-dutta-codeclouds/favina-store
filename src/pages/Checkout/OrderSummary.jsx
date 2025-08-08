import styled from 'styled-components';
import { borderRadius, colors, fontSizes, gapSizes, pxToRem } from '../../assets/styles/theme.js';

const OrderSummary = ({
  orderItems,
  handleRemoveOrderItem,
  setOrderItems,
  discountRate,
  discount,
  platformCharge,
  total,
  coupon,
  setCoupon,
  couponApplied,
  setCouponApplied,
  couponError,
  setCouponError,
  couponCodes
}) => (
  <OrderSummarySection>
    <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
    <OrderItems>
      {orderItems.length === 0 ? (
        <EmptyMsg>Your cart is empty.</EmptyMsg>
      ) : (
        orderItems.map(item => (
          <OrderItem key={item.id}>
            <OrderItemImg src={item.image} alt={item.title} />
            <OrderItemInfo>
              <OrderItemTitle>{item.title}</OrderItemTitle>
              <OrderItemQty>
                Qty:
                <QtyControl>
                  <QtyBtn
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => {
                      if (item.quantity > 1) {
                        setOrderItems(orderItems.map(i =>
                          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
                        ));
                      }
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </QtyBtn>
                  <QtyInput
                    type="tel"
                    min={1}
                    value={item.quantity}
                    onChange={e => {
                      const val = Math.max(1, parseInt(e.target.value) || 1);
                      setOrderItems(orderItems.map(i =>
                        i.id === item.id ? { ...i, quantity: val } : i
                      ));
                    }}
                  />
                  <QtyBtn
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => {
                      setOrderItems(orderItems.map(i =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                      ));
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </QtyBtn>
                </QtyControl>
              </OrderItemQty>
              <OrderItemPrice>
                ${(item.price * item.quantity).toFixed(2)}
              </OrderItemPrice>
            </OrderItemInfo>
            <RemoveBtn
              type="button"
              title="Remove from order summary"
              onClick={() => handleRemoveOrderItem(item.id)}
            >
              ×
            </RemoveBtn>
          </OrderItem>
        ))
      )}
    </OrderItems>
    <CouponForm onSubmit={e => {
      e.preventDefault();
      const code = coupon.trim().toUpperCase();
      if (couponCodes[code]) {
        setCouponApplied(true);
        setCouponError("");
      } else {
        setCouponApplied(false);
        setCouponError("Invalid coupon code. Try SAVE10, SAVE20, or SAVE30.");
      }
    }}>
      <CouponLabel htmlFor="coupon-input">Coupon Code</CouponLabel>
      <CouponFormWrapper>
        <CouponInput
          id="coupon-input"
          type="text"
          value={coupon}
          onChange={e => {
            setCoupon(e.target.value);
            setCouponApplied(false);
            setCouponError("");
          }}
          placeholder="Enter coupon code"
          autoComplete="off"
        />
        <CouponButton type="submit">Apply</CouponButton>
      </CouponFormWrapper>
      {couponApplied && couponCodes[coupon.toUpperCase()] && (
        <CouponSuccess>Coupon applied: {coupon.toUpperCase()} ({couponCodes[coupon.toUpperCase()] * 100}% off)</CouponSuccess>
      )}
      {couponError && <CouponError>{couponError}</CouponError>}
    </CouponForm>
    <OrderSummaryRow>
      <span>Discount ({discountRate * 100}%)</span>
      <span>- ${discount.toFixed(2)}</span>
    </OrderSummaryRow>
    <OrderSummaryRow>
      <span>Platform Charge</span>
      <span>+ ${platformCharge.toFixed(2)}</span>
    </OrderSummaryRow>
    <OrderTotalRow>
      <span>Total</span>
      <span>${total.toFixed(2)}</span>
    </OrderTotalRow>
  </OrderSummarySection>
);

const OrderSummarySection = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  padding: 28px 20px 20px 20px;
  min-width: 260px;
  position: sticky;
  top: 140px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  max-height: 650px;
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    position: static;
    top: unset;
    max-height: unset;
    padding: 18px 10px 10px 10px;
  }
  @media (max-width: 600px) {
    padding: 12px 12px 8px 12px;
    min-width: 0;
  }
`;
const OrderSummaryTitle = styled.h2`
  font-size: 20px;
  color: ${colors.primary};
  margin-bottom: 18px;
  text-align: left;
  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;
const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 18px;
  overflow-y: auto;
 // max-height: calc(100vh - 180px);
  @media (max-width: 600px) {
    gap: 10px;
    margin-bottom: 10px;
   // max-height: 220px;
  }
`;
const OrderItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: #fff;
  border-radius: ${borderRadius.sm};
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  @media (max-width: 600px) {
    gap: 6px;
    padding: 7px 4px;
  }
`;
const OrderItemImg = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: ${borderRadius.sm};
  background: #fafafa;
  border: 1px solid #eee;
  @media (max-width: 600px) {
    width: 90px;
    height: 90px;
  }
`;
const OrderItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${gapSizes.xs};
  @media (max-width: 600px) {
    gap: 1px;
  }
`;
const OrderItemTitle = styled.div`
  font-size: ${fontSizes.sm};
  color: ${colors.text};
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
const OrderItemQty = styled.div`
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 600px) {
    font-size: 12px;
    gap: 4px;
  }
`;
const QtyControl = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const QtyBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f3f0f8;
  border: 1px solid #ede7f6;
  color: #888;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: #ede7f6;
    color: ${colors.primary};
  }
`;
const QtyInput = styled.input`
  width: 38px;
  height: 28px;
  border-radius: ${borderRadius.sm};
  border: 1px solid #ede7f6;
  background: #fff;
  text-align: center;
  font-size: 15px;
  color: #222;
  font-weight: 600;
  outline: none;
`;
const OrderItemPrice = styled.div`
  font-size: 15px;
  color: ${colors.danger};
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 8px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  &:hover {
    color: ${colors.text};
    background: #fff0f0;
    border-radius: 50%;
  }
`;
const EmptyMsg = styled.div`
  color: #888;
  font-size: 15px;
  text-align: center;
  padding: 20px 0;
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 10px 0;
  }
`;
const CouponForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  margin: 18px 0 10px 0;
  padding: 12px 18px 12px 18px;
  background: #fff7f7;
  border-radius: ${borderRadius.sm};
  box-shadow: 0 2px 8px rgba(229,166,166,0.07);
  border: 1px solid #f3e2e2;
`;
const CouponFormWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
const CouponLabel = styled.label`
  font-size: 15px;
  color: ${colors.primary};
  font-weight: 700;
  margin-bottom: 8px;
`;
const CouponInput = styled.input`
  font-size: 15px;
  padding: 10px 14px;
  border-radius: ${borderRadius.sm};
  border: 1.5px solid ${colors.primary};
  background: #fff;
  color: #222;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  flex:1;
`;
const CouponButton = styled.button`
  width: 100px;
  font-size: 15px;
  padding: 10px 24px;
  border-radius: ${borderRadius.sm};
  background: ${colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(229,166,166,0.07);
  transition: background 0.18s;
  &:hover {
    background: ${colors.accent};
  }
`;
const CouponSuccess = styled.div`
  color: #27ae60;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 600;
`;
const CouponError = styled.div`
  color: ${colors.accent};
  font-size: 14px;
  margin-top: 8px;
  font-weight: 600;
`;
const OrderSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  color: #888;
  margin-bottom: 4px;
`;
const OrderTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #eee;
  padding-top: 14px;
  margin-top: 10px;
  @media (max-width: 600px) {
    font-size: 15px;
    padding-top: 8px;
    margin-top: 6px;
  }
`;

export default OrderSummary;
