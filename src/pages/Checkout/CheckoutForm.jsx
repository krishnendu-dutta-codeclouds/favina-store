import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAuth, useCart } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import FormInput from '../../components/ui/FormInput';
import CustomCheckbox from '../../components/ui/CustomCheckbox';
import { clearCart } from '../../redux/slices/cartSlice';
import { updateProfile } from '../../redux/slices/authSlice';
import { getOrdersFromStorage } from '../../redux/slices/orderSlice'; 
import { useEffect, useRef, useState } from 'react';
import { borderRadius, colors, fontSizes, pxToRem } from '../../assets/styles/theme.js';

const CheckoutForm = ({ discountedTotal, orderItems }) => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderIdRef = useRef(null);
  const [billingSame, setBillingSame] = useState(true);

  const { register: registerShipping, handleSubmit: handleShippingSubmit, formState: { errors: shippingErrors }, reset: resetShipping, getValues: getShippingValues } = useForm({
    defaultValues: isAuthenticated && user ? user : {},
  });

  const { register: registerBilling, formState: { errors: billingErrors }, reset: resetBilling, getValues: getBillingValues } = useForm();

  useEffect(() => {
    if (billingSame) {
      resetBilling(getShippingValues());
    }
    // eslint-disable-next-line
  }, [billingSame]);

  useEffect(() => {
    if (isAuthenticated && user) {
      resetShipping(user);
      if (billingSame) resetBilling(user);
    }
  }, [isAuthenticated, user, resetShipping, resetBilling, billingSame]);

  const onSubmit = (shippingData) => {
    let billingData = {};
    if (billingSame) {
      billingData = { ...shippingData };
    } else {
      billingData = getBillingValues();
    }
    if (isAuthenticated) {
      dispatch(updateProfile(shippingData));
    }
    const order = {
      shipping: shippingData,
      billing: billingData,
      items: orderItems,
      total: discountedTotal,
      date: new Date().toISOString(),
      status: 'pending',
      customer: user ? { email: user.email, id: user.id } : null,
    };

    const orders = getOrdersFromStorage();
    const newOrder = { ...order, id: Date.now().toString() };
    const updatedOrders = [...orders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    localStorage.setItem('shippingDetails', JSON.stringify(shippingData));
    localStorage.setItem('billingDetails', JSON.stringify(billingData));

    if (isAuthenticated && user?.id) {
      const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
      allCarts[user.id] = [];
      localStorage.setItem('carts', JSON.stringify(allCarts));
    }

    dispatch(clearCart());
    orderIdRef.current = newOrder.id;
    navigate(`/order-confirmation/${newOrder.id}`);
  };

  return (
    <Form onSubmit={handleShippingSubmit(onSubmit)}>
      <SectionTitle>Shipping Address</SectionTitle>
      <FormGroup>
        <FormInput
          label="First Name"
          placeholder="Enter your first name"
          {...registerShipping('firstName', { required: 'First name is required' })}
          error={shippingErrors.firstName}
          readOnly={isAuthenticated}
          disabled={isAuthenticated}
        />
        <FormInput
          label="Last Name"
          placeholder="Enter your last name"
          {...registerShipping('lastName', { required: 'Last name is required' })}
          error={shippingErrors.lastName}
          readOnly={isAuthenticated}
          disabled={isAuthenticated}
        />
      </FormGroup>
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email address"
        {...registerShipping('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={shippingErrors.email}
        readOnly={isAuthenticated}
        disabled={isAuthenticated}
      />
      <FormInput
        label="Phone"
        placeholder="Enter your phone number"
        maxLength={10}
        {...registerShipping('phone', { 
          required: 'Phone is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Phone number must be exactly 10 digits'
          }
        })}
        error={shippingErrors.phone}
      />
      <FormInput
        label="Address"
        placeholder="Enter your address"
        {...registerShipping('address', { required: 'Address is required' })}
        error={shippingErrors.address}
      />
      <FormGroup>
        <FormInput
          label="City"
          placeholder="Enter your city"
          {...registerShipping('city', { required: 'City is required' })}
          error={shippingErrors.city}
        />
        <FormInput
          label="State"
          placeholder="Enter your state"
          {...registerShipping('state', { required: 'State is required' })}
          error={shippingErrors.state}
        />
      </FormGroup>
      <FormGroup>
        <FormInput
          label="Country"
          placeholder="Enter your country"
          {...registerShipping('country', { required: 'Country is required' })}
          error={shippingErrors.country}
        />
        <FormInput
          label="Postal Code"
          placeholder="Enter your postal code"
          {...registerShipping('postalCode', { required: 'Postal code is required' })}
          error={shippingErrors.postalCode}
        />
      </FormGroup>
      <BillingSection >
        <CustomCheckbox
          checked={billingSame}
          onChange={e => setBillingSame(e.target.checked)}
          style={{ marginTop: 4 }}
        >
          Billing address same as shipping address
        </CustomCheckbox>
        {!billingSame && (
          <>
            <SectionTitle style={{ marginTop: 24 }}>Billing Address</SectionTitle>
            <BillingForm>
              <FormGroup>
                <FormInput
                  label="Billing First Name"
                  placeholder="Enter billing first name"
                  {...registerBilling('firstName', { required: 'First name is required' })}
                  error={billingErrors.firstName}
                />
                <FormInput
                  label="Billing Last Name"
                  placeholder="Enter billing last name"
                  {...registerBilling('lastName', { required: 'Last name is required' })}
                  error={billingErrors.lastName}
                />
              </FormGroup>
              <FormInput
                label="Billing Email"
                type="email"
                placeholder="Enter billing email address"
                {...registerBilling('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={billingErrors.email}
              />
              <FormInput
                label="Billing Phone"
                placeholder="Enter billing phone number"
                maxLength={10}
                {...registerBilling('phone', { 
                  required: 'Phone is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be exactly 10 digits'
                  }
                })}
                error={billingErrors.phone}
              />
              <FormInput
                label="Billing Address"
                placeholder="Enter billing address"
                {...registerBilling('address', { required: 'Address is required' })}
                error={billingErrors.address}
              />
              <FormGroup>
                <FormInput
                  label="Billing City"
                  placeholder="Enter billing city"
                  {...registerBilling('city', { required: 'City is required' })}
                  error={billingErrors.city}
                />
                <FormInput
                  label="Billing State"
                  placeholder="Enter billing state"
                  {...registerBilling('state', { required: 'State is required' })}
                  error={billingErrors.state}
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  label="Billing Country"
                  placeholder="Enter billing country"
                  {...registerBilling('country', { required: 'Country is required' })}
                  error={billingErrors.country}
                />
                <FormInput
                  label="Billing Postal Code"
                  placeholder="Enter billing postal code"
                  {...registerBilling('postalCode', { required: 'Postal code is required' })}
                  error={billingErrors.postalCode}
                />
              </FormGroup>
            </BillingForm>
          </>
        )}
      </BillingSection>
      <ButtonRow>
        <BackButtonStyled type="button" onClick={() => navigate('/products')}>
          ← Back
        </BackButtonStyled>
        <PlaceOrderButtonStyled type="submit" >
          Place Order
        </PlaceOrderButtonStyled>
      </ButtonRow>

    </Form>
  );
  };

const SectionTitle = styled.h3`
  font-size: 20px;
  color: ${colors.primary};
`;

const BillingSection = styled.div`
  margin: 24px 0 0 0;
  padding: 18px 0 0 0;
  border-top: 1px solid #eee;
`;

const BillingForm = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-top: 18px;
`;

const BackButtonStyled = styled(Button)`
  background: #fff;
  border: 1px solid #eee;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  width: 100px;
  border-radius: ${borderRadius.sm};
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: color 0.18s, border 0.18s, background 0.18s;
  @media (max-width: 600px) {
    font-size: 13px;
    padding: 5px 10px 5px 7px;
  }
`;

const PlaceOrderButtonStyled = styled(Button)`
  background: ${colors.primary};
  color: ${colors.textLight};
  border: ${pxToRem(1)} solid #eee;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  font-size: 16px;
  border-radius: ${borderRadius.sm};
  font-weight: 600;
  &:hover {
    background: ${colors.accent};
    color: #fff;
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
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export default CheckoutForm;