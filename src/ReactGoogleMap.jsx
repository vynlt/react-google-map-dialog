import React, { Component } from "react";
import {
  compose, withProps,
  withHandlers, withState,
  withStateHandlers,
} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow
} from "react-google-maps";
import { geolocated } from "react-geolocated";

const MyMapComponent = compose(
  withProps( props => ({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVec11szjuxod9rdgN-zTEoRpuOcH7hTE",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  })),
  withScriptjs,
  withGoogleMap,
  withState('directions', 'setDirection', 0),
  withHandlers({
    handleMarkerClick: props => (lat, lng) => event => {
      const google = window.google;
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(props.coords ? props.coords.latitude : 0, props.coords ? props.coords.longitude : 0),
        destination: new google.maps.LatLng(lat, lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          props.setDirection(result
          );
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
      onToggleOpen: ({ isOpen }) => (a) => ({
        isOpen: !isOpen,
        showInfoIndex: a,
      })
    }),
 
)(props => {

console.log(props.latCenter)
  return (
    !props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : props.coords ? (

      <GoogleMap defaultZoom={15} center ={{ lat: (!props.latCenter ? props.coords.latitude : props.latCenter), lng: (!props.lngCenter ? props.coords.longitude : props.lngCenter) }}>
        <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }} />
        <Marker key={0} position={{ lat: 10.846553, lng: 106.643971 }} onClick={() => props.onToggleOpen(0)} >
          {(props.isOpen && props.showInfoIndex === 0) && <InfoWindow onCloseClick={props.onToggleOpen}>
            <div style={{ height: '100%', width: '!00%', fontFamily: 'Roboto', textAlign: 'center' }}>
              <h3> Store Ngã 3 Cây Trâm</h3>
              <button className="btn info" onClick={props.handleMarkerClick(10.846553, 106.643971)}>Find path</button>
            </div>
          </InfoWindow>}
        </Marker>
        <Marker key={1} position={{ lat: 10.845113, lng: 106.624355 }} onClick={() => props.onToggleOpen(1)} >
          {(props.isOpen && props.showInfoIndex === 1) && <InfoWindow onCloseClick={props.onToggleOpen}>
            <div style={{ height: '100%', width: '!00%', fontFamily: 'Roboto', textAlign: 'center' }}>
              <h3> Store Chợ An Sương</h3>
              <button className="btn info" onClick={props.handleMarkerClick(10.845113, 106.624355)}>Find path</button>
            </div>
          </InfoWindow>}
        </Marker>
        <DirectionsRenderer directions={props.directions} />
      </GoogleMap>
    ) : (
            <div>Getting the location data&hellip; </div>
          )
  )
});


const GeolocatedMap = geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 1
})(MyMapComponent);

class ReactGoogleMap extends Component {
  render() {
    return (
      <GeolocatedMap latCenter={this.props.latCenter} lngCenter={this.props.lngCenter}/>
    );
  }
}

export default ReactGoogleMap;