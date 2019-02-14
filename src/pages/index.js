import React, { Component } from 'react';
import { createMap } from '../leaflet/setup';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from '../utility';
import {
  GlobalStyle,
  LeafletLibs,
  MapContainer,
  Button,
  SearchBar
} from '../components';

const provider = new OpenStreetMapProvider();

export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      issIcon: null,
      resultIcons: null,
      searchTerm: '',
      isSearching: false,
      searchResults: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.centerIssIcon = this.centerIssIcon.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.performSearch = debounce(this.performSearch, 1500, true).bind(this);
    this.clearPreviousResultIcons = this.clearPreviousResultIcons.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  componentDidMount() {
    const { map, issIcon, resultIcons } = createMap();

    this.setState({
      map,
      issIcon,
      resultIcons
    });
  };

  centerIssIcon() {
    const pos = [
      this.state.issIcon._latlng.lat,
      this.state.issIcon._latlng.lng
    ];
    
    this.state.map.panTo(pos, true);
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

  resetSearch() {
    this.clearPreviousResultIcons();

    this.setState({
      searchTerm: '',
      searchResults: []
    });
  }

  displayResults(resultList) {
    this.clearPreviousResultIcons();

    // Show top 5 results
    const limit = resultList.length < 5
      ? resultList.length
      : 5;

    for (var i = 0; i < limit; i++) {
      this.state.resultIcons[i].setLatLng([resultList[i].y, resultList[i].x]);
      this.state.resultIcons[i].setStyle({ opacity: 1, fillOpacity: 1 });
    }

    // Pan to the top result
    this.state.map.panTo([resultList[0].y, resultList[0].x]);
  }

  clearPreviousResultIcons() {
    this.state.resultIcons.forEach(icon => 
      icon.setStyle({ opacity: 0, fillOpacity: 0 })
    );
  }

  handleChange(e) {
    this.setState({
      searchTerm: e.target.value,
      isSearching: e.target.value !== ''
    });
  }

  render() {
    return(
      <>
        <GlobalStyle />
        <LeafletLibs />

        <SearchBar
          placeholder='Search location'
          onChange={this.handleChange}
          onKeyUp={this.performSearch}
          resetSearch={this.resetSearch}
          value={this.state.searchTerm}
          isSearching={this.state.isSearching}
          searchResults={this.state.searchResults}
        />

        <MapContainer id="map"></MapContainer>
        
        <Button onClick={this.centerIssIcon}>
          Find ISS
        </Button>
      </>
    );
  }
}
