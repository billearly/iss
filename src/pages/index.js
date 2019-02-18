import React, { Component } from 'react';
import { createMap } from '../leaflet/setup';
import {
  GlobalStyle,
  LeafletLibs,
  MapContainer,
  Button,
  SearchBar
} from '../components';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      issIcon: null,
      resultIcons: null
    }

    this.centerIssIcon = this.centerIssIcon.bind(this);
  }

  componentDidMount() {
    const { map, issIcon, resultIcons } = createMap();

    this.setState({
      map,
      issIcon,
      resultIcons
    });
  };

  // Put this into its own special button component
  centerIssIcon() {
    const pos = [
      this.state.issIcon._latlng.lat,
      this.state.issIcon._latlng.lng
    ];
    
    this.state.map.panTo(pos, true);
  }

  render() {
    return(
      <>
        <GlobalStyle />
        <LeafletLibs />

        <SearchBar
          placeholder='Search location'
          map={this.state.map}
          resultIcons={this.state.resultIcons}
        />

        <MapContainer id="map"></MapContainer>
        
        <Button onClick={this.centerIssIcon}>
          Find ISS
        </Button>
      </>
    );
  }
}
