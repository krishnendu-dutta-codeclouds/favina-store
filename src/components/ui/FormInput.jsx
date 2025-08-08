import styled from 'styled-components';
import { colors, fontSizes } from '../../assets/styles/theme';

const FormInput = ({ label, error, ...props }) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <Input {...props} />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const Label = styled.label`
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${colors.text};
`;

const Input = styled.input`
  padding: 10px 15px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: ${fontSizes.sm};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${colors.muted};
  }
`;

const ErrorMessage = styled.span`
  color: ${colors.warning};
  font-size: ${fontSizes.xs};
`;

export default FormInput;