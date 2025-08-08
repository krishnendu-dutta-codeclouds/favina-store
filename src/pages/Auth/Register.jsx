import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAuth } from '../../redux/hooks';
import { useNavigate, Link } from 'react-router-dom';
import { registerThunk } from '../../redux/slices/authSlice';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/common/Button';
import LogoSvg from '../../assets/images/logo.svg';
const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const handleRegister = (formData) => {
    dispatch(registerThunk(formData)).then((result) => {
      if (!result?.error) {
        navigate('/account');
      }
    });
  };

  return (
    <Container>
      <FormContainer>
        <LogoWrapper>
          <Link to="/" title="Go to Home">
            <img src={LogoSvg} alt="ShopEase Logo" style={{height:38}} />
          </Link>
        </LogoWrapper>
        <h2>Create Account</h2>
        <Form onSubmit={handleSubmit(handleRegister)}>
          <FormGroup>
            <FormInput
              label="First Name"
              placeholder="Enter your first name"
              {...formRegister('firstName', { required: 'First name is required' })}
              error={errors.firstName}
            />
            <FormInput
              label="Last Name"
              placeholder="Enter your last name"
              {...formRegister('lastName', { required: 'Last name is required' })}
              error={errors.lastName}
            />
          </FormGroup>
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email address"
            {...formRegister('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Create a password"
            {...formRegister('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={errors.password}
          />
          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            {...formRegister('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match'
            })}
            error={errors.confirmPassword}
          />
          <Button type="submit" fullWidth>
            Register
          </Button>
        </Form>
        <LoginLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </LoginLink>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 20px;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
`;
const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: #ffecec;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;

  a {
    color: #333;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default RegisterPage;