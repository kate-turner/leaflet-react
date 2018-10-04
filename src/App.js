import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
      haveUsersLocation: false,
      zoom: 2,
    }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUsersLocation: true,
        zoom: 13,
      });
    }, () => {
      console.log('location not permitted');
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          console.log(location);
          this.setState({
            location: {
              lat: location.latitude,
              lng: location.longitude
            },
            haveUsersLocation: true,
            zoom: 13,
          });
        })
    });
  }

  formSubmitted = (event) => {
    event.preventDefault();
  }
  
  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <div>
        <Map className="map" center={position} zoom={this.state.zoom}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            { 
              this.state.haveUsersLocation ? 
              <Marker 
                position={position}
                icon={myIcon}>
                <Popup>
                  A pretty CSS3 popup.<br />Easily customizable.
                </Popup>
              </Marker> : ''
            }
        </Map>
        <CardBody className="message-form">
          <CardTitle>Welcome to GuestM.app</CardTitle>
          <CardSubtitle>Leave a message with your location</CardSubtitle>
          <CardText>Thanks for stopping by</CardText>
          <Form onSubmit={this.formSubmitted}>
             <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" placeholder="Enter your name" />
             </FormGroup>
              <FormGroup>
                <Label for="message">Name</Label>
                <Input type="textarea" name="message" id="message" placeholder="Enter a message" />
             </FormGroup>
             <Button type="submit" color="info" disabled={!this.state.haveUsersLocation}>Submit Message</Button>
          </Form>
        </CardBody>
      </div>
    );
  }
}

export default App;
