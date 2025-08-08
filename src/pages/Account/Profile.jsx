import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAuth } from '../../redux/hooks';
import { updateProfile } from '../../redux/slices/authSlice';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/common/Button';
import { useState } from 'react';

const Profile = () => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: user || {},
  });
  const dispatch = useAppDispatch();
  const [showToast, setShowToast] = useState(false);

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <ProfileContainer>
      <h2>Profile Information</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormInput
            label="First Name"
            {...register('firstName', { required: 'First name is required' })}
            error={errors.firstName}
          />
          <FormInput
            label="Last Name"
            {...register('lastName', { required: 'Last name is required' })}
            error={errors.lastName}
          />
        </FormGroup>
        
        <FormInput
          label="Email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email}
          disabled
        />
        
        <FormInput
          label="Phone"
          {...register('phone')}
          error={errors.phone}
        />
        
        <FormInput
          label="Address"
          {...register('address')}
          error={errors.address}
        />
        
        <FormGroup>
          <FormInput
            label="City"
            {...register('city')}
            error={errors.city}
          />
          <FormInput
            label="State"
            {...register('state')}
            error={errors.state}
          />
        </FormGroup>
        
        <FormGroup>
          <FormInput
            label="Country"
            {...register('country')}
            error={errors.country}
          />
          <FormInput
            label="Postal Code"
            {...register('postalCode')}
            error={errors.postalCode}
          />
        </FormGroup>
        
        <Button type="submit">Update Profile</Button>
      </Form>
      {showToast && <Toast>Profile saved successfully!</Toast>}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  h2 {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #27ae60;
  color: #fff;
  padding: 14px 30px;
  border-radius: 6px;
  font-size: 16px;
  z-index: 9999;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  animation: fadeInOut 2s;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateX(-50%) translateY(20px);}
    10% { opacity: 1; transform: translateX(-50%) translateY(0);}
    90% { opacity: 1; transform: translateX(-50%) translateY(0);}
    100% { opacity: 0; transform: translateX(-50%) translateY(20px);}
  }
`;

export default Profile;