import React from 'react';
import styled from 'styled-components';

const SearchMessageContainer = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.15em 1.5em #00000036;
  margin-top: 1rem;
  padding: 0.5rem;
  text-align: center;
`;

export const SearchMessage = ({ message }) => {
  return (
    <SearchMessageContainer>
      <p>{message}</p>
    </SearchMessageContainer>
  );
}