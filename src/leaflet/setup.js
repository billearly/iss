import L from 'leaflet';
import { getPosition } from '../data/iss';

const initializeMap = () => {
  var southWest = L.latLng(-90, -180);
  var northEast = L.latLng(90, 180);
  var bounds = L.latLngBounds(southWest, northEast);

  return L.map('map', {
    zoomSnap: 0.25,
    minZoom: 3,
    maxBounds: bounds,
    maxBoundsViscosity: 0.75
  }).setView(bounds.getCenter(), 7);
}

const initializeTileLayer = (map) => {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true,
  }).addTo(map);
}

const initializeStartPos = (map) => {
  const bostonPos = [42.3601, -71.0589];
  
  L.circle(bostonPos, {
    color: '#E8849D',
    fillColor: '#FFA69E',
    fillOpacity: 0.75,
    radius: 100000
  }).addTo(map);
}

const initializeIssIcon = (map) => {
  return L.circle([0, 0], {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.75,
    radius: 100000
  }).addTo(map);
}

const trackIssPos = (issIcon) => {
  setInterval(() => {
    getPosition()
      .then((pos) => {
        issIcon.setLatLng([pos.latitude, pos.longitude]);
      });
  }, 5000);
}

export const createMap = () => {
  const map = initializeMap();
  initializeTileLayer(map);
  initializeStartPos(map);

  const issIcon = initializeIssIcon(map);
  trackIssPos(issIcon);

  return { map, issIcon };
}