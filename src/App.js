import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css';

var myIcon = L.icon({
    iconUrl: 'http://icons.iconarchive.com/icons/iconsmind/outline/256/Fire-Flame-icon.png',
    iconSize: [20, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    
});

class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
      zoom: 13
    }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    });
  }
  
  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
        <Map className="map" center={position} zoom={this.state.zoom}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker 
              position={position}
              icon={myIcon}>
              <Popup>
                A pretty CSS3 popup.<br />Easily customizable.
              </Popup>
            </Marker>
        </Map>
      );
  }
}

export default App;
