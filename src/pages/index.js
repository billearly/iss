import React, { Component } from 'react';
import { createMap } from '../leaflet/setup';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {
  GlobalStyle,
  LeafletLibs,
  MapContainer,
  Button,
  Search
} from '../components';

const provider = new OpenStreetMapProvider();

export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      issIcon: null,
      resultIcons: null,
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.centerIssIcon = this.centerIssIcon.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.displayResults = this.displayResults.bind(this);
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
          if (results.length > 0) {
            this.displayResults(results);
          }
        });
    }
  }

  displayResults(resultList) {
    // Clear previous results
    this.state.resultIcons.forEach(icon => 
      icon.setStyle({ opacity: 0, fillOpacity: 0 })
    );

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

  handleChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    return(
      <>
        <GlobalStyle />
        <LeafletLibs />

        <Search 
          placeholder='Search location'
          onChange={this.handleChange}
          onBlur={this.performSearch}
          value={this.state.searchTerm}
        />

        <MapContainer id="map"></MapContainer>
        
        <Button onClick={this.centerIssIcon}>
          Find ISS
        </Button>
      </>
    );
  }
}
