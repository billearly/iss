import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Spinner,
  SearchResults,
  SearchMessage,
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

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    
    this.input = React.createRef();
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear() {
    this.props.resetSearch();
    this.input.current.focus();
  }

  render() {
    const {
      placeholder,
      onChange,
      onKeyUp,
      value,
      isSearching,
      searchResults
    } = this.props;

    return (
      <SearchBarContainer>
        <SearchInput
          placeholder={placeholder}
          onChange={onChange}
          onKeyUp={onKeyUp}
          value={value}
          ref={this.input}
        />
  
        {isSearching &&
          <Spinner />
        }
  
        {!isSearching && value &&
          <ClearButton
            onClick={this.handleClear}
          />
        }
  
        {searchResults.length !== 0 &&
          <SearchResults
            results={searchResults}
          />
        }
  
        {!isSearching && value && searchResults.length === 0 &&
          <SearchMessage
            message={`No results for '${value}'`}
          />
        }
      </SearchBarContainer>
    );
  }
}
