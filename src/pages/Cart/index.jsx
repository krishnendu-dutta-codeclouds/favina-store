import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart, useAppDispatch } from '../../redux/hooks'; // <-- import your cart hook and dispatch
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { useSelector } from 'react-redux';

const CartPageContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(168,132,202,0.08);
  padding: 32px;
`;

const CartTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #5b4a44;
`;

const CartList = styled.div`
  margin-bottom: 32px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
`;

const ItemImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 18px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #5b4a44;
`;

const ItemPrice = styled.div`
  font-size: 1rem;
  color: #a084ca;
  margin-top: 4px;
`;

const EmptyCart = styled.div`
  text-align: center;
  color: #a084ca;
  font-size: 1.2rem;
  margin: 40px 0;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.4rem;
  cursor: pointer;
  margin-left: 12px;
  padding: 4px;
  &:hover {
    color: #c0392b;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
`;

const QtyBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #a084ca;
  background: #f6f3fa;
  color: #a084ca;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
    color: #5b4a44;
  }
`;

const QtyInput = styled.input`
  width: 38px;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #ede7f6;
  border-radius: 4px;
  background: #fff;
  color: #5b4a44;
`;

const CartSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #eee;
`;

const SummaryRow = styled.div`
  font-size: 1.1rem;
  color: #5b4a44;
  margin-bottom: 10px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  width: 260px;
`;

const CheckoutBtn = styled.button`
  background: #a084ca;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 12px 38px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.18s;
  &:hover {
    background: #5b4a44;
  }
`;

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Always get cart items and cartCount from redux store
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = useSelector(state => state.cart.cartCount);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartPageContainer>
      <CartTitle>Your Cart ({cartCount})</CartTitle>
      {cartItems.length === 0 ? (
        <EmptyCart>Your cart is empty.</EmptyCart>
      ) : (
        <>
          <CartList>
            {cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.title} />
                <ItemInfo>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemPrice>${item.price}</ItemPrice>
                  <QuantitySelector>
                    <QtyBtn onClick={() => handleQtyChange(item.id, item.quantity - 1)}>-</QtyBtn>
                    <QtyInput
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => handleQtyChange(item.id, Number(e.target.value))}
                    />
                    <QtyBtn onClick={() => handleQtyChange(item.id, item.quantity + 1)}>+</QtyBtn>
                  </QuantitySelector>
                </ItemInfo>
                <RemoveBtn onClick={() => handleRemove(item.id)} title="Remove">
                  &times;
                </RemoveBtn>
              </CartItem>
            ))}
          </CartList>
          <CartSummary>
            <SummaryRow>
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </SummaryRow>
            <CheckoutBtn
              onClick={() => navigate('/checkout')}
              disabled={cartItems.length === 0}
            >
              Checkout
            </CheckoutBtn>
          </CartSummary>
        </>
      )}
    </CartPageContainer>
  );
};

export default CartPage;
