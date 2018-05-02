import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_URL, GOOGLE_API_KEY } from '@common'

import Icon from 'react-native-vector-icons/Feather';
const icon_bubble = require('@common/assets/images/map/speech_bubble.png');
const icon_satellite = require('@common/assets/images/map/satellite.png');
const icon_standard = require('@common/assets/images/map/standard.png');

import { styles } from './styles';

class PostProductLocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapType: 'standard',
      poi: null,
      coordinate: null,
      isSelect: false,
      defaultAddress: '',
    }
  }

  componentWillMount() {
    const { coordinate, address } = this.props

    if (coordinate) {
      this.setState({
        coordinate,
        isSelect: true,
        defaultAddress: address,
      })

      let region = {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
      this.onRegionChange(region, region.latitude, region.longitude)
    } else {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
        this.onRegionChange(region, region.latitude, region.longitude)
      })
    }
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat,
      lastLong: lastLong,
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  changeMapType(mapType) {
    if (mapType == 'satellite')
      this.setState({mapType: 'standard'});
    else
      this.setState({mapType: 'satellite'});
  }

  onMapPress(e) {
    if (e.nativeEvent.coordinate) {
      this.setState({ coordinate: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      }})
      const coordinate = {
        lat: e.nativeEvent.coordinate.latitude,
        lng: e.nativeEvent.coordinate.longitude,
      }

      this.getAddress(coordinate)
      this.setState({ isSelect: true })
    } else {
      const coordinate = {
        lat: this.state.coordinate.latitude,
        lng: this.state.coordinate.longitude,
      }
      this.getAddress(coordinate)
    }
  }

  async getAddress(coordinate) {
    const res = await Geocoder.geocodePosition(coordinate)
    if (res) {
      const mapAddress = {
        country: res[0].country ? res[0].country : '',
        city: res[0].locality ? res[0].locality : '',
        street: res[0].streetName ? res[0].streetName : '',
        streeNumber: res[0].streetNumber ? res[0].streetNumber : '',
        postalCode: res[0].postalCode ? res[0].postalCode : '',
        coordinate: {
          latitude: coordinate.lat,
          longitude: coordinate.lng,
        }
      }

      this.setState({ mapAddress })
    }
  }

	_onLoad(details) {
		const geoCode = details.geometry.location
		const lat = geoCode.lat
		const lng = geoCode.lng

    const coordinate = {
      latitude: lat,
      longitude: lng
    }

    this.setState({
      isSelect: true,
      coordinate,
    })
    let region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }
    this.onRegionChange(region, region.latitude, region.longitude)

    const new_coordinate = {
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    }
    this.getAddress(new_coordinate)
  }
  
  onBack() {
    if (this.state.isSelect) {
      this.props.changePage()
      this.props.getAddress(this.state.mapAddress)
    }
  }

  render() {
    const {
      mapType,
      mapRegion,
      isSelect,
      coordinate,
      defaultAddress,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.backIconWrapper}>
          <TouchableOpacity onPress={() => this.onBack()}>
            <Icon name='arrow-left' style={styles.backIcon_detail}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.btnMapTypeView}>
          <TouchableOpacity onPress={() => this.changeMapType(mapType)}>
            <Image source={mapType=='standard' ? icon_satellite : icon_standard} style={styles.btnMapType} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchView}>
          <GooglePlacesAutocomplete
            ref = 'autocomplete'
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails
            renderDescription={(row) => row.description}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true				         
              this._onLoad(details)
            }}
              
            getDefaultValue={() => { // text input default value
              return defaultAddress;
            }}

            query={{				         
              key: GOOGLE_API_KEY,
              language: 'ar', 
              types: 'geocode',
            }}

            styles={{
              description: {
                fontWeight: 'bold',
              },

              textInputContainer:{
                backgroundColor:'white'
              },
          
              predefinedPlacesDescription: {
                color: '#1faadb',
              },

              powered: {
                height:0,
                opacity:0
              },

              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 45,
                color: '#5d5d5d',
                fontSize: 16
                },

              listView:{
                backgroundColor:'white'
                },

                separator: {
                height: 1,
                backgroundColor: '#c8c7cc',
              },
            }}

            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
          
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          />
        </View>
        
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          showsScale
          showsPointsOfInterest
          showsBuildings
          showsUserLocation
          showsMyLocationButton
          mapType={mapType}
          region={mapRegion}
          // onRegionChange={this.onRegionChange.bind(this)}
          onPress={e => this.onMapPress(e)}
          onPoiClick={e => this.onPoiClick(e)}
        >
          {isSelect && (
            <MapView.Marker
              coordinate={coordinate}
            />
          )}            
        </MapView>
      </View>
    );
  }
}

export default PostProductLocationPage;
