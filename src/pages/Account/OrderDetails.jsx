import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuth } from '../../redux/hooks';
import { getOrdersFromStorage } from '../../redux/slices/orderSlice';
import { colors, fontSizes, pxToRem, fonts } from '../../assets/styles/theme.js';
const ORDERS_PER_PAGE = 5;

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    const userOrders = getOrdersFromStorage();
    if (!user || !user.email) {
      setOrders([]);
      return;
    }
    const userSpecificOrders = userOrders.filter(order => 
      order.customer && order.customer.email === user.email
    );
    setOrders(userSpecificOrders);
    setPage(1); 
  }, [user.email]);

  useEffect(() => {
    const allOrders = getOrdersFromStorage();
    let updated = false;
    const now = new Date();
    const updatedOrders = allOrders.map(order => {
      if (
        order.status !== 'delivered' &&
        order.date &&
        new Date(order.date).getTime() <= now.getTime() - 2 * 24 * 60 * 60 * 1000 // 2 days in ms
      ) {
        updated = true;
        return { ...order, status: 'delivered' };
      }
      return order;
    });
    if (updated) {
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
  });

  const totalPages = Math.ceil(sortedOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = sortedOrders.slice(
    (page - 1) * ORDERS_PER_PAGE,
    page * ORDERS_PER_PAGE
  );

  const handleClearOrders = () => {
    const allOrders = getOrdersFromStorage();
    let filteredOrders = [];
    if (user && user.email) {
      filteredOrders = allOrders.filter(order => {
        if (order.customer && order.customer.email === user.email) {
          return order.status !== 'delivered';
        }
        return true;
      });
    }
    localStorage.setItem('orders', JSON.stringify(filteredOrders));
    const userOrders = filteredOrders.filter(order => order.customer && order.customer.email === user.email);
    setOrders(userOrders);
    setPage(1);
  };

  return (
    <OrdersContainer>
      <OrdersHeader>
        <h2>Your Orders</h2>
        <SortActions>
          <SortDropdown>
            <label htmlFor="sort-order">Sort:</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </SortDropdown>
          <ClearButton type="button" onClick={handleClearOrders} disabled={orders.length === 0}>
            Clear Order List
          </ClearButton>
        </SortActions>
      </OrdersHeader>
      {paginatedOrders.length === 0 ? (
        <EmptyMessage>You haven't placed any orders yet.</EmptyMessage>
      ) : (
        <>
          <OrdersList>
            {paginatedOrders.map((order) => (
              <OrderItem key={order.id || order.date}>
                <OrderHeader>
                  <div>
                    <strong>Order #</strong> {order.id || order.date}
                  </div>
                  <div>
                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </div>
                  <div>
                    <Status $status={order.status}>{order.status}</Status>
                  </div>
                </OrderHeader>
                <OrderProducts>
                  {order.items.map((item) => (
                    <ProductItem key={item.id}>
                      <ProductImage src={item.image} alt={item.title} />
                      <ProductDetails>
                        <ProductName>{item.title}</ProductName>
                        <ProductPrice>${item.price.toFixed(2)}</ProductPrice>
                        <ProductQuantity>Qty: {item.quantity}</ProductQuantity>
                      </ProductDetails>
                    </ProductItem>
                  ))}
                </OrderProducts>
              </OrderItem>
            ))}
          </OrdersList>
          <Pagination>
            <PageButton
              type="button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </PageButton>
            <PageInfo>
              Page {page} of {totalPages}
            </PageInfo>
            <PageButton
              type="button"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              Next
            </PageButton>
          </Pagination>
        </>
      )}
    </OrdersContainer>
  );
};

const OrdersContainer = styled.div`
`;

const OrdersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width:800px){
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const SortActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ClearButton = styled.button`
  padding: 6px 16px;
  border-radius: 4px;
  background: ${colors.warning};
  color: #fff;
  opacity:0.8;
  border: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
  &:hover:enabled {
  opacity:1;
    background: ${colors.warning};
  }
  &:disabled {
    background: #eee;
    color: #aaa;
    cursor: not-allowed;
  }
`;
const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 30px 0 0 0;
`;

const PageButton = styled.button`
  padding: 6px 16px;
  border-radius: 4px;
  background: #f3f0f8;
  color: #333;
  border: 1px solid #ede7f6;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
  &:hover:enabled {
    background: #ede7f6;
    color: #e74c3c;
  }
  &:disabled {
    background: #eee;
    color: #aaa;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 15px;
  color: #888;
  font-weight: 500;
`;

const SortDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  select {
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 15px;
    background: #fff;
    margin-left: 4px;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 40px;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  
`;

const OrderItem = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
   background: #fff;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Status = styled.span`
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  background: ${({ $status }) => 
    $status === 'completed' ? '#d4edda' : 
    $status === 'cancelled' ? '#f8d7da' : '#fff3cd'};
  color: ${({ $status }) => 
    $status === 'completed' ? '#155724' : 
    $status === 'cancelled' ? '#721c24' : '#856404'};
`;

const OrderProducts = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProductItem = styled.div`
  display: flex;
  gap: 15px;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: 500;
`;

const ProductPrice = styled.div`
  color: #666;
  font-size: 14px;
  margin: 5px 0;
`;

const ProductQuantity = styled.div`
  color: #666;
  font-size: 14px;
`;

export { OrderDetails };
export default OrderDetails;