import styled from 'styled-components';
import { fonts } from '../../assets/styles/theme';
const TextSliderWrapper = ({ messages, duration = 22 }) => (
  <Wrapper>
    <Container>
      <TextSlider>
        <TextSliderTrack $duration={duration}>
          {[...messages, ...messages].map((msg, idx) => (
            <TextSliderItem key={idx} $highlight={msg.highlight}>
              {msg.text}
            </TextSliderItem>
          ))}
        </TextSliderTrack>
      </TextSlider>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  margin: 0 0 32px 0;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 30px 20px;
  position: relative;
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const Container = styled.div`
  width: 100vw;
  max-width: 1320px;
  overflow: hidden;
  position: relative;
  height: 54px;
  display: flex;
  align-items: center;
  &::before, &::after{
    content: '';
    position: absolute;
    top: 0;
    left:-80px;
    width: 150px;
    height: 100%;
    background: #fff;
    filter:blur(8px);
    z-index: 2;
    @media (max-width: 700px) {
      left:-100px;
    }
  }
  &::after{
    top: 0;
    left:inherit;
    right:-80px;
    @media (max-width: 700px) {
      right:-100px;
    }
  }
`;

const TextSlider = styled.div`
  width: 100vw;
  max-width: 1320px;
  overflow: hidden;
  position: relative;
  height: 54px;
  display: flex;
  align-items: center;
`;

const TextSliderTrack = styled.div`
  display: flex;
  align-items: center;
  animation: scrollTextSlider ${({ $duration }) => $duration}s linear infinite;
  @keyframes scrollTextSlider {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const TextSliderItem = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ $highlight }) => ($highlight ? '#e5a6a6' : '#5b4a44')};
  margin: 0 60px;
  font-family: ${fonts.title};
  opacity: ${({ $highlight }) => ($highlight ? 1 : 0.85)};
  transition: color 0.2s;
  white-space: nowrap;
  letter-spacing: -1px;
  @media (max-width: 700px) {
    margin: 0 24px;
  }
`;

export default TextSliderWrapper;
