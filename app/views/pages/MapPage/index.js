import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Feather';
import VideoComponent from '@components/VideoComponent'
import { styles } from './styles';
import * as COMMON_STYLES from '@common/styles/commonStyles';

const icon_bubble = require('@common/assets/images/map/speech_bubble.png');
const icon_satellite = require('@common/assets/images/map/satellite.png');
const icon_standard = require('@common/assets/images/map/standard.png');

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapType: 'standard',
      categoryProduct: [],
    }
  }

  componentWillMount() {
    const { category, allProduct, user } = this.props

    let categoryProduct = [];
    if (user.userLogin && user.userInfo) {
      console.log('USER_INFO: ', user.userInfo)
      const { customer_id } = user.userInfo.user
      categoryProduct = _.filter(allProduct, item => item.category.toLowerCase() === category.toLowerCase() && item.customer_id !== customer_id)
    } else {
      categoryProduct = _.filter(allProduct, item => item.category.toLowerCase() === category.toLowerCase())
    }
    this.setState({
      categoryProduct,
    })
  }

  gotoDetailPage(data) {
    Actions.ProductDetail({ data });
  }

  changeMapType(mapType) {
    if (mapType === 'satellite') {
      this.setState({ mapType: 'standard' });
    } else {
      this.setState({ mapType: 'satellite' });
    }
  }

  render() {
    const { mapType, categoryProduct } = this.state;
    const { locationData, region } = this.props;
    
    return (
      <View
        style={{ height: COMMON_STYLES.SCREEN_SUB_HEIGHT }}
      >
        <View style={styles.btnMapTypeView}>
          <TouchableOpacity onPress={() => this.changeMapType(mapType)}>
            <Image source={mapType === 'standard' ? icon_satellite : icon_standard} style={styles.btnMapType} />
          </TouchableOpacity>
        </View>
        
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          showsScale
          showsPointsOfInterest
          showsBuildings
          showsUserLocation
          showsMyLocationButton
          showsCompass
          loadingEnabled
          toolbarEnabled
          pitchEnabled
          zoomEnabled
          rotateEnabled
          mapType={mapType}
          region={region}
          onRegionChange={this.onRegionChange}
        >
          {categoryProduct.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
              zIndex={9}
            >
              <View style={styles.marker}>
                <Image source={icon_bubble} resizeMode="cover" style={styles.bubble} />
                <Text style={styles.markerText}>{parseFloat(marker.price).toFixed(2)}</Text>
              </View>

              <MapView.Callout onPress={() => this.gotoDetailPage(marker)}>
                <View style={styles.markerDetailView}>
                  <View style={styles.videoView}>
                    <VideoComponent rowData={marker} offsetX={65} offsetY={20} />
                  </View>
                  <Text style={styles.markerDetailText}>{marker.name}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}


const mapStateToProps = ({ user }) => ({
  user,
})

MapPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default connect(
  mapStateToProps,
  null,
)(MapPage)
