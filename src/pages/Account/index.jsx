import styled from 'styled-components';
import { useState } from 'react';
import { useAuth } from '../../redux/hooks';
import Profile  from './Profile';
import { OrderDetails } from './OrderDetails';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();

  return (
    <Container>
      <Sidebar>
        <Tab 
          $active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </Tab>
        <Tab 
          $active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </Tab>
      </Sidebar>
      
      <Content>
        {activeTab === 'profile' ? (
          <Profile user={user} />
        ) : (
          <OrderDetails />
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 150px);
  padding: 30px;
  max-width: 1320px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  padding-right: 30px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    display: flex;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
`;

const Tab = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  background: ${({ $active }) => ($active ? '#f0f0f0' : 'transparent')};
  border: none;
  text-align: left;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  border-radius: 5px;
  
  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 0;
  }
`;

const Content = styled.div`
  flex: 1;
`;

export default AccountPage;