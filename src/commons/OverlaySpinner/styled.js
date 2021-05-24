import styled from 'styled-components'

export const Wrapper = styled.div`
  z-index: 501;
  position: fixed;
  top: ${({ top }) => top}px;
  bottom: 0;
  left: ${({ left }) => left}px;
  right: 0;
  background: ${({ backgroundColor }) => backgroundColor};
  ${props =>
    props.overlayParent && `
    z-index: 1;  
    position: absolute;
    background: ${props.backgroundColor || 'rgba(255, 255, 255, 0.7)'};
  `}
`

const unfilled = 'rgba(47, 85, 151, 0.3)',
  filled = 'rgba(47, 85, 151, 0.9)'

export const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 45px;
  width: 45px;
  margin: 0px auto;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: rotation 0.6s infinite linear;
  border-left: 4px solid ${unfilled};
  border-right: 4px solid ${unfilled};
  border-bottom: 4px solid ${unfilled};
  border-top: 4px solid ${filled};
  border-radius: 100%;
  margin-top: -20px;
  margin-left: -20px;
`
