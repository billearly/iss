import React, { Component } from 'react';
import styled from 'styled-components';
import { debounce } from '../utility';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {
  Spinner,
  SearchResults,
  SearchMessage,
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
      searchResults: []
    }
    
    this.input = React.createRef();

    this.performSearch = debounce(this.performSearch, 1500, true).bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.clearPreviousResultIcons = this.clearPreviousResultIcons.bind(this);
    this.displayResults = this.displayResults.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    // This is where I want to do the leaflet display, so I need to be passed a function
  }

  performSearch() {
    if (this.state.searchTerm !== '') {
      provider.search({ query: this.state.searchTerm })
        .then(results => {
          this.setState({
            isSearching: false,
            searchResults: results
          });

          if (results.length > 0) {
            this.displayResults(results);
          }
        });
    }
  }

  displayResults(resultList) {
    this.clearPreviousResultIcons();

    // Show top 5 results
    const limit = resultList.length < 5
      ? resultList.length
      : 5;

    for (var i = 0; i < limit; i++) {
      this.props.resultIcons[i].setLatLng([resultList[i].y, resultList[i].x]);
      this.props.resultIcons[i].setStyle({ opacity: 1, fillOpacity: 1 });
    }

    // Pan to the top result
    this.props.map.panTo([resultList[0].y, resultList[0].x]);
  }

  clearPreviousResultIcons() {
    this.props.resultIcons.forEach(icon => 
      icon.setStyle({ opacity: 0, fillOpacity: 0 })
    );
  }

  resetSearch() {
    this.clearPreviousResultIcons();

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
          />
        }
  
        {!this.state.isSearching && this.state.searchTerm && this.state.searchResults.length === 0 &&
          <SearchMessage
            message={`No results for '${this.state.searchTerm}'`}
          />
        }
      </SearchBarContainer>
    );
  }
}
