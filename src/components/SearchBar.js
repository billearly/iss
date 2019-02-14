import React from 'react';
import styled from 'styled-components';
import {
  Spinner,
  SearchResults,
  ClearButton
} from './';

const SearchBarContainer = styled.div`
  left: 50%;
  position: fixed;
  top: 0.75rem;
  transform: translateX(-50%);
  width: 30rem;
  z-index: 5000;

  @media screen and (max-width: 35rem) {
    width: calc(100% - 1.5rem);
  }
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0 0.15em 1.5em #00000036;
  padding: 0.75rem;
  width: 100%;
`;

export const SearchBar = ({
  placeholder,
  onChange,
  onKeyUp,
  resetSearch,
  value,
  isSearching,
  searchResults
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

      {!isSearching && value &&
        <ClearButton
          onClick={resetSearch}
        />
      }

      {searchResults &&
        <SearchResults
          results={searchResults}
        />
      }

      {/*{!isSearching && value && !searchResults} --- This is the way to show a 'no results' message*/}
    </SearchBarContainer>
  );
}
