import L from 'leaflet';
import { getPosition } from '../data/iss';

const initializeMap = () => {
  var southWest = L.latLng(-90, -180);
  var northEast = L.latLng(90, 180);
  var bounds = L.latLngBounds(southWest, northEast);

  return L.map('map', {
    zoomSnap: 0.25,
    minZoom: 3,
    maxZoom: 4.25,
    maxBounds: bounds,
    maxBoundsViscosity: 0.75
  }).setView(bounds.getCenter(), 3);
}

const initializeTileLayer = () => {
  return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true,
  });
}

const initializeIssIcon = () => {
  return L.circle([0, 0], {
    color: '#2c2c2ce0',
    fillColor: '#2c2c2ce0',
    fillOpacity: 0,
    opacity: 0,
    radius: 100000
  });
}

const showIssIcon = (issIcon) => {
  issIcon.setStyle({ opacity: 0.75, fillOpacity: 0.75 });
};

const initializeSearchResultIcon = () => {
  return L.circle([0, 0], {
    color: '#133b65e0',
    fillColor: '#133b65e0',
    fillOpacity: 0,
    opacity: 0,
    radius: 100000
  });
}

const trackIssPos = (issIcon) => {
  getPosition()
    .then((pos) => {
      issIcon.setLatLng([pos.latitude, pos.longitude]);
    });
}

export const createMap = () => {
  const map = initializeMap();
  const tileLayer = initializeTileLayer();
  const issIcon = initializeIssIcon();
  const searchResultIcon = initializeSearchResultIcon();

  tileLayer.addTo(map);
  issIcon.addTo(map);
  searchResultIcon.addTo(map);

  trackIssPos(issIcon);
  setInterval(() => {
    trackIssPos(issIcon)
  }, 5000);

  setTimeout(() => {
    showIssIcon(issIcon);
  }, 5000);

  return { map, issIcon, searchResultIcon };
}