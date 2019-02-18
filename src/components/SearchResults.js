import React from 'react';
import styled from 'styled-components';

const StyledList = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.15em 1.5em #00000036;
  margin: 1rem 0 0;
  overflow: hidden;
  padding: 0;
`;

const StyledResult = styled.div`
  border-bottom: 0.05rem solid lightgray;

  &:last-child {
    border: none;
  }
`;

const StyledInput = styled.input`
  opacity: 0;
  position: fixed;

  &:checked+label {
    background-color: #e68181;
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
  display: block;
  padding: 0.5rem;

  &:hover {
    background-color: #ffd3d3;
  }
`;

export const SearchResults = ({ results }) => {
  const mapResults = () => {
    return results.map((result, i) =>
      <StyledResult key={i}>
        <StyledInput
          type="radio"
          name="result"
          id={`result-${i}`}
          value={result.label}
        />
        
        <StyledLabel htmlFor={`result-${i}`}>
          {result.label}
        </StyledLabel>
      </StyledResult>
    );
  };

  return (
    <StyledList>
      {mapResults()}
    </StyledList>
  );
}