import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 5000;
`;

const StyledSpinner = styled.div`
  animation: ${rotate} 0.75s linear infinite;
  border: 0.1rem solid lightgray;
  border-bottom-color: black;
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
`;

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <StyledSpinner/>
    </SpinnerContainer>
  );
};
