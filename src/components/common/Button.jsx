import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, fontSizes } from '../../assets/styles/theme';


const Button = ({ children, to, variant, fullWidth, small, ...props }) => {
  if (to) {
    return (
      <StyledLink to={to} $variant={variant} $fullWidth={fullWidth} $small={small} {...props}>
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton $variant={variant} $fullWidth={fullWidth} $small={small} {...props}>
      {children}
    </StyledButton>
  );
};



const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: 500;
  font-size: ${(props) => (props.$small ? fontSizes.sm : fontSizes.base)};
  cursor: pointer;
  transition: all 0.7s ease;
  border: none;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  text-decoration: none;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  max-width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  &:before {
    content: '';
    position: absolute;
    left: -200%;
    bottom: -400%;
    width:1px;
    height:1px;
    background: ${colors.highlight};
    border-radius: 50%;
    z-index: -1;
    transition: left 0.4s ease-in-out, bottom 0.4s ease-in-out, width 0.8s ease-in-out, height 0.8s ease-in-out;
  }

  &:hover:not(:disabled):before {
  width: 432px;
    height: 200px;
    left: -18%;
    bottom: -120%;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const StyledButton = styled.button`
  ${baseStyles}
  background-color: ${colors.primary};
  color: #fff;
  border: none;

  &:hover:not(:disabled) {
    background: #f5968c;
    color: #fff;
  }
`;

const StyledLink = styled(Link)`
  ${baseStyles}
  background-color: ${colors.primary};
  color: #fff;
  border: none;

  &:hover:not(:disabled) {
    //background: #f5968c;
    color: #fff;
  }
`;

export default Button;