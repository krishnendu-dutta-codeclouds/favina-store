import styled from 'styled-components';
import { useState } from 'react';
import { colors, fonts, fontSizes, pxToRem } from '../../assets/styles/theme';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container>
      <ContentWrapper>
        <FormSection>
          <ContactTitle>Contact Us</ContactTitle>
          <Description>
            We'd love to hear from you! Fill out the form below and we'll get back to you soon.
          </Description>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <Button type="submit">Send Message</Button>
            {submitted && <SuccessMsg>Thank you for contacting us!</SuccessMsg>}
          </Form>
        </FormSection>
        <MapSection>
          <MapCard>
            <MapIframe
              title="ShopEase Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019019228767!2d-122.41941518468153!3d37.7749297797597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c7e6b1b0b%3A0x4a0f0e4d9e8e8e8e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapCard>
        </MapSection>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`

  max-width: 1320px;
  margin: ${pxToRem(10)} auto;
  padding: ${pxToRem(20)} ${pxToRem(20)};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 80vh;
  @media (min-height:700px){
    align-items: center;
  }
`;

const ContentWrapper = styled.div`
border-radius: ${pxToRem(6)};
  box-shadow: 0 8px 32px 0 rgba(160,132,202,0.13), 0 2px 10px rgba(160,132,202,0.07);
  backdrop-filter: blur(10px);
background: ${colors.card};
max-width: 1320px;
overflow: hidden;
  display: flex;
  align-items: stretch;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: ${pxToRem(30)};
  }
`;

const FormSection = styled.div`
  flex: 1;
  
  background: ${colors.card};
  border-radius: ${pxToRem(0)};
  box-shadow: 0 2px 12px rgba(168,132,202,0.18);
  padding: ${pxToRem(36)} ${pxToRem(32)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 900px) {
    padding: ${pxToRem(24)} ${pxToRem(12)};
  }
`;

const ContactTitle = styled.h1`
  font-size: ${fontSizes.xl};
  font-family: ${fonts.title};
  font-weight: 800;
  color: ${colors.primary};
  margin-bottom: ${pxToRem(8)};
  letter-spacing: -1px;
`;

const MapSection = styled.div`
  flex: 1;
  min-width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${pxToRem(20)};
`;

const MapCard = styled.div`
  width: 100%;
  background: rgba(248,243,250,0.95);
  border-radius: ${pxToRem(16)};
  box-shadow: 0 2px 12px rgba(168,132,202,0.08);
  padding: ${pxToRem(18)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapIframe = styled.iframe`
  width: 100%;
  min-height: 350px;
  border: 0;
  border-radius: ${pxToRem(12)};
  box-shadow: 0 2px 8px rgba(160,132,202,0.10);
`;

const Description = styled.p`
  color: ${colors.textDark};
  font-size: ${fontSizes.base};
  font-family: ${fonts.body};
  margin-bottom: ${pxToRem(24)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(18)};
`;

const Input = styled.input`
  padding: ${pxToRem(14)} ${pxToRem(16)};
  border: ${pxToRem(1.5)} solid ${colors.border};
  border-radius: ${pxToRem(7)};
  font-size: ${fontSizes.base};
  font-family: ${fonts.body};
  background: #fff;
  color: ${colors.text};
  transition: border 0.18s;
  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: ${pxToRem(14)} ${pxToRem(16)};
  border: 1.5px solid ${colors.border};
  border-radius: ${pxToRem(7)};
  font-size: ${fontSizes.base};
  font-family: ${fonts.body};
  background: #fff;
  color: ${colors.text};
  min-height: ${pxToRem(100)};
  resize: vertical;
  transition: border 0.18s;
  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

const Button = styled.button`
  background: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: ${pxToRem(7)};
  padding: ${pxToRem(14)} 0;
  font-size: ${fontSizes.base};
  font-family: ${fonts.title};
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(160,132,202,0.10);
  transition: background 0.18s, box-shadow 0.18s;
  &:hover {
    background: ${colors.text};
    box-shadow: 0 4px 16px rgba(160,132,202,0.13);
  }
`;

const SuccessMsg = styled.div`
  color: #27ae60;
  margin-top: ${pxToRem(10)};
  text-align: center;
  font-size: ${fontSizes.base};
  font-family: ${fonts.body};
  font-weight: 600;
`;

export default ContactPage;
