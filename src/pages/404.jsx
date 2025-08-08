import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Page Not Found</ErrorMessage>
      <ErrorDescription>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </ErrorDescription>
      <Button as={Link} to="/" style={{ marginTop: '20px' }}>
        Go to Homepage
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
  text-align: center;
  padding: 20px;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  margin: 0;
  color: #333;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const ErrorMessage = styled.h2`
  font-size: 32px;
  margin: 20px 0 10px;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ErrorDescription = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 600px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default NotFoundPage;