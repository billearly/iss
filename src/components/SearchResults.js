import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.15em 1.5em #00000036;
  margin: 1rem 0 0;
  padding: 0;
`;

const StyledResult = styled.li`
  border-bottom: 0.05rem solid lightgray;
  list-style-type: none;
  margin: 0 0.5rem;
  padding: 0.5rem 0;

  &:last-child {
    border: none;
  }
`;

export const SearchResults = ({ results }) => {
  const mapResults = () => {
    return results.map(result =>
      <StyledResult>{result.label}</StyledResult>
    );
  };

  return (
    <StyledList>
      {mapResults()}
    </StyledList>
  );
}