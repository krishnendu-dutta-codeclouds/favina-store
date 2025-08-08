import React from 'react';
import styled from 'styled-components';
import { colors } from '../../assets/styles/theme';

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

const StyledCheckbox = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background: #fff;
  border: 2px solid ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  position: relative;
  
`;

const Checkbox = ({ checked, onChange, children, ...props }) => (
  <CheckboxWrapper>
    <HiddenCheckbox checked={checked} onChange={onChange} {...props} />
    <StyledCheckbox style={{ borderColor: checked ? colors.primary : '#eee' }}>
      {checked && <span style={{
        width: '10px',
        height: '10px',
        background: colors.primary,
        borderRadius: '2px',
        position: 'static',
        top: '2px',
        left: '2px',
        opacity: 1
      }} />}
    </StyledCheckbox>
    {children}
  </CheckboxWrapper>
);

export default Checkbox;
