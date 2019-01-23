import React from 'react';
import styled from 'styled-components';
import { Spinner } from './';

const SearchBarContainer = styled.div`
  left: 50%;
  position: fixed;
  top: 0.75rem;
  transform: translateX(-50%);
  z-index: 5000;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0 0.15em 1.5em #00000036;
  min-width: 30rem;
  padding: 0.75rem;

  @media screen and (max-width: 35rem) {
    left: unset;
    margin: 0 0.75rem;
    min-width: unset;
    transform: unset;
    width: calc(100% - 1.5rem);
  }
`;

export const SearchBar = ({
  placeholder,
  onChange,
  onKeyUp,
  value,
  isSearching
}) => {
  return (
    <SearchBarContainer>
      <SearchInput
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
      />

      {isSearching &&
        <Spinner />
      }
    </SearchBarContainer>
  );
}
