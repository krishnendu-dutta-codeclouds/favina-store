import styled from 'styled-components';
import { useState } from 'react';
import { colors, fontSizes, pxToRem, fonts } from '../../assets/styles/theme.js';
const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(0, Math.min(99, newQuantity));
    setQuantity(qty);
    onQuantityChange(qty);
  };

  return (
    <ItemContainer>
      <Image src={item.image} alt={item.title} />
      <Details>
        <Title>{item.title}</Title>
        <Price>${item.price.toFixed(2)}</Price>
        <QuantityControls>
          <Button onClick={() => handleQuantityChange(quantity - 1)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12H19" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg></Button>
          <Input 
            type="tel" 
            value={quantity} 
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            min="0"
            max="99"
          />
          <Button onClick={() => handleQuantityChange(quantity + 1)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V19M5 12H19" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg></Button>
        </QuantityControls>
      </Details>
      <RemoveButton onClick={() => onRemove(item.id)}>×</RemoveButton>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  position: relative;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 14px;
  color: ${colors.text};
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.primary};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

const Button = styled.button`
width: ${pxToRem(25)};
  height: ${pxToRem(25)};
  border-radius: ${pxToRem(30)};
  background: ${colors.info};
  border: none;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    width: ${pxToRem(18)};
    height: ${pxToRem(18)};
  }
`;

const Input = styled.input`
  width: ${pxToRem(25)};
  height: ${pxToRem(25)};
  border-radius: ${pxToRem(30)};
  text-align: center;
  border: 1px solid #ddd;
  color: ${colors.text};
  display: inline-block;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 15px;
  right: 0;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;

export default CartItem;