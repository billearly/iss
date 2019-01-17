import React, { Component } from 'react';
import { createMap } from '../leaflet/setup';
import {
  GlobalStyle,
  LeafletLibs,
  MapContainer,
  Button
} from '../components';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      issIcon: null
    }

    this.centerIssIcon = this.centerIssIcon.bind(this);
  }

  componentDidMount() {
    const { map, issIcon } = createMap();

    this.setState({
      map,
      issIcon
    });
  };

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

        <MapContainer id="map"></MapContainer>
        
        <Button onClick={this.centerIssIcon}>
          Find ISS
        </Button>
      </>
    );
  }
}
