import React, { Component } from 'react';
import styled from 'styled-components';
import { debounce } from '../utility';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {
  Spinner,
  SearchResults,
  SearchMessage,
  SearchSubmit,
  ClearButton
} from './';

const provider = new OpenStreetMapProvider();

const SearchBarContainer = styled.form`
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

    this.state = {
      searchTerm: '',
      isSearching: false,
      searchResults: [],
      selectedResult: null
    }
    
    this.input = React.createRef();

    this.performSearch = debounce(this.performSearch, 1500, true).bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.clearPreviousResultIcon = this.clearPreviousResultIcon.bind(this);
    this.displaySelectedResult = this.displaySelectedResult.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchTerm: e.target.value,
      isSearching: e.target.value !== ''
    });
  }

  handleClear() {
    this.resetSearch();
    this.input.current.focus();
  }

  handleSelect(e) {
    this.setState({
      selectedResult: JSON.parse(e.target.value)
    });

    // when the results first appear I need the first one to be 'selected'
  }

  handleSubmit(e) {
    e.preventDefault();
    this.displaySelectedResult();
  }

  performSearch() {
    if (this.state.searchTerm !== '') {
      provider.search({ query: this.state.searchTerm })
        .then(results => {
          this.setState({
            isSearching: false,
            searchResults: results
          });
        });
    }
  }

  displaySelectedResult() {
    this.clearPreviousResultIcon();

    const location = [this.state.selectedResult.y, this.state.selectedResult.x];

    this.props.searchResultIcon.setLatLng(location);
    this.props.searchResultIcon.setStyle({ opacity: 1, fillOpacity: 1});
    this.props.map.panTo(location);

    this.setState({
      searchTerm: '',
      searchResults: []
    });
  }

  clearPreviousResultIcon() {
    this.props.searchResultIcon.setStyle({ opacity: 0, fillOpacity: 0 })
  }

  resetSearch() {
    this.clearPreviousResultIcon();

    this.setState({
      searchTerm: '',
      searchResults: []
    });
  }

  render() {
    return (
      <SearchBarContainer onSubmit={this.handleSubmit}>
        <SearchInput
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          onKeyUp={this.performSearch}
          value={this.state.searchTerm}
          ref={this.input}
        />

        {this.state.isSearching &&
          <Spinner />
        }
  
        {!this.state.isSearching && this.state.searchTerm &&
          <ClearButton
            onClick={this.handleClear}
          />
        }

        {this.state.searchResults.length !== 0 &&
          <SearchResults
            results={this.state.searchResults}
            handleSelect={this.handleSelect}
          />
        }
  
        {!this.state.isSearching && this.state.searchTerm && this.state.searchResults.length === 0 &&
          <SearchMessage
            message={`No results for '${this.state.searchTerm}'`}
          />
        }

        <SearchSubmit
          type='submit'
        />
      </SearchBarContainer>
    );
  }
}
