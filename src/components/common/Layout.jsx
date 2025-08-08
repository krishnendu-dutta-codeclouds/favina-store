import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <MainContent>
        {children || <Outlet />}
      </MainContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 0;
  padding-bottom: 0;
`;

export default Layout;