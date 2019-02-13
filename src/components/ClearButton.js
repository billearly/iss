import React from 'react';
import styled from 'styled-components';
import { XCircle } from 'react-feather';

const ButtonContainer = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;

export const ClearButton = () => {
  return (
    <ButtonContainer>
      <XCircle color='#00000065'/>
    </ButtonContainer>
  );
}