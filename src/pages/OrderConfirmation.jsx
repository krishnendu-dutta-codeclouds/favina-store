import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import { getOrderById } from '../redux/slices/orderSlice'; // changed import
import { colors, fontSizes, pxToRem, fonts, borderRadius } from '../assets/styles/theme.js';
const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(getOrderById(orderId));
  }, [orderId]);

  if (!order) {
    return (
      <Container>
        <h2>Order Not Found</h2>
        <Button as={Link} to="/products">Shop Now</Button>
      </Container>
    );
  }

  return (
    <OrderConfirmationWrapper>
      <Container>
      <h1>Order Confirmed!</h1>
      <OrderId>Order #{order.id}</OrderId>
      <Status>
        <strong>Status:</strong> {order.status === 'pending' ? 'Processing' : order.status}
      </Status>
      <OrderDetails>
       
        <h3 >Products</h3>
        <ProductList>
          {order.items.map(item => (
            <ProductItem key={item.id}>
              <ProductImage src={item.image} alt={item.title} />
              <ProductInfo>
                <div>{item.title}</div>
                <div>Qty: {item.quantity}</div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </ProductInfo>
            </ProductItem>
          ))}
        </ProductList>
        <Total>
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </Total>
      </OrderDetails>
       <OrderContainer>
          <OrderCol>
          <h3>Shipping Information</h3>
          <InfoGrid>
            <InfoRow><strong>Name:</strong> {order.shipping?.firstName} {order.shipping?.lastName}</InfoRow>
            <InfoRow><strong>Email:</strong> {order.shipping?.email}</InfoRow>
            <InfoRow><strong>Phone:</strong> {order.shipping?.phone}</InfoRow>
            <InfoRow><strong>Address:</strong> {order.shipping?.address}, {order.shipping?.city}, {order.shipping?.state}, {order.shipping?.country} - {order.shipping?.postalCode}</InfoRow>
          </InfoGrid>
        </OrderCol>
        <OrderCol>
          <h3 >Billing Information</h3>
          <InfoGrid>
            <InfoRow><strong>Name:</strong> {order.billing?.firstName} {order.billing?.lastName}</InfoRow>
            <InfoRow><strong>Email:</strong> {order.billing?.email}</InfoRow>
            <InfoRow><strong>Phone:</strong> {order.billing?.phone}</InfoRow>
            <InfoRow><strong>Address:</strong> {order.billing?.address}, {order.billing?.city}, {order.billing?.state}, {order.billing?.country} - {order.billing?.postalCode}</InfoRow>
          </InfoGrid>
        </OrderCol>
        </OrderContainer>    
      <Button as={Link} to="/account/orders">
        View My Orders
      </Button>
    </Container>
    </OrderConfirmationWrapper>
  );
};

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  font-size: 15px;
  color: #444;
`;
const OrderConfirmationWrapper = styled.div`
  width: 100%;  
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Container = styled.div`
  width: 100%;
  margin: 40px 0 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  padding: 30px 20px;
  text-align: center;
`;

const OrderId = styled.div`
  font-size: 18px;
  color: #888;
  margin-bottom: 10px;
`;

const Status = styled.div`
  font-size: 16px;
  color: #27ae60;
  margin-bottom: 20px;
`;

const OrderDetails = styled.div`
  margin: 30px 0 20px 0;
  text-align: left;
  h3{
  margin-bottom: 10px;
  color: ${colors.primary};
  }
`;

const OrderContainer = styled.div`
  display: flex;
  gap: 0;
  justify-content: space-between;
  margin-bottom: 30px;  
  text-align: left;
  border:${pxToRem(1)} solid #eee;
  padding: 0;
  border-radius: ${pxToRem(6)};
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 18px;
    padding: 0;
  }
`;
const OrderCol = styled.div`
flex:1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px 20px;
  h3{
    color: ${colors.primary};
  }
  @media (max-width: 700px) {
    padding: 24px 12px;
    border-bottom: 1px solid #eee;
    &:last-child { border-bottom: none; }
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ProductItem = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: ${borderRadius.sm};
  border: 1px solid #ddd;
  object-fit: cover;
  background: #f5f5f5;
`;

const ProductInfo = styled.div`
  flex: 1;
  font-size: 15px;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 12px;
`;

export default OrderConfirmation;
