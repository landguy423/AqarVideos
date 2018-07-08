'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ListView,
  ScrollView
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view'
import ScrollableTabBar from './ScrollableTabBar';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import LoadingSpinner from '@components/LoadingSpinner';
import { saveMyLocation } from '@redux/Map/actions';
import { getProductsByCategory } from '@redux/Product/actions';

import MapPage from '@pages/MapPage';
import ProductListPage from '@pages/ProductListPage';
import I18n from '@i18n';

const ASPECT_RATIO = commonStyles.screenWidth / commonStyles.screenHeight
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const _isArabic = true

class TabView extends Component {
  constructor(props) {
    super(props);
    watchID:  null;

    this.state = {
      tabIndex: 0,
      region: null,
      currentLocation: null,
      allProduct: null,
      loading: false,
    }
  }

  componentWillMount() {
    const { token, user, category, map, getProductsByCategory } = this.props
    const { myLocation } = map;

    this.setState({ loading: true })
    if (user.userInfo) {
      getProductsByCategory(token.tokenInfo.token, { id: user.userInfo.user.customer_id })
    } else {
      getProductsByCategory(token.tokenInfo.token, { id: 0 })
    }

    if (myLocation == null) {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
        let currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }

        this.setState({
          region: region,
          currentLocation: currentLocation
        });

        this.props.saveMyLocation({
          region: region,
          currentLocation: currentLocation
        });
      })
    } else {
      this.setState({
        region: myLocation.region,
        currentLocation: myLocation.currentLocation
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps

    if (this.props.products.loading === 'GET_PRODUCT_BY_CATEGORY_REQUEST' && products.loading === 'GET_PRODUCT_BY_CATEGORY_SUCCESS' ) {
      this.setState({
        loading: false,
        allProduct: products.allProduct,
      })
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  changeTab(index) {
    index = index.i;
    this.setState({tabIndex: index});
    this.props.changeTab(index);
  }

  render() {
    const { btnStatus } = this.props;
    let { tabIndex, region, currentLocation, allProduct, loading } = this.state;
    
    if (currentLocation == null) {
      currentLocation = {
        latitude: 37.78825,
        longitude: -122.4324,
      }
    }
    if (region == null) {
      region = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    }

    return (
      <View style={styles.container}>
        <LoadingSpinner visible={loading } />

        {allProduct && (
          <ScrollableTabView
            style={{backgroundColor:'#FFF'}}
            tabBarBackgroundColor='#424242'
            tabBarTextStyle={{color:'#FFF'}}
            contentProps={{bounces: true, keyboardDismissMode: 'on-drag'}}
            tabBarUnderlineStyle={{backgroundColor:'#EB0089'}}
            onChangeTab = {index => this.changeTab(index)}
            renderTabBar={() => <ScrollableTabBar/>}
            initialPage={_isArabic ? 12 : 0}
          >
            <ScrollView tabLabel={I18n.t('category.gallery')}>
              {btnStatus === 'map' && (
                <MapPage category="gallery" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="gallery" allProduct={allProduct} />
              )}
            </ScrollView>


            <ScrollView tabLabel={I18n.t('category.stores')}>
              {btnStatus === 'map' && (
                <MapPage category="stores" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="stores" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.factory')}>
              {btnStatus === 'map' && (
                <MapPage category="factory" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="factory" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.office_for_sale')}>
              {btnStatus === 'map' && (
                <MapPage category="land" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="office_for_sale" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.firms')}>
              {btnStatus === 'map' && (
                <MapPage category="firms" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="firms" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.esteraha')}>
              {btnStatus === 'map' && (
                <MapPage category="esteraha" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="esteraha" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.chalet')}>
              {btnStatus === 'map' && (
                <MapPage category="chalets" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="chalet" allProduct={allProduct} />
              )}
            </ScrollView>
          
            <ScrollView tabLabel={I18n.t('category.apartment_owner')}>
              {btnStatus === 'map' && (
                <MapPage category="apartment_owner" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="apartment_owner" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.office')}>
              {btnStatus === 'map' && (
                <MapPage category="office" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="office" allProduct={allProduct} />
              )}
            </ScrollView>
            
            <ScrollView tabLabel={I18n.t('category.land')}>
              {btnStatus === 'map' && (
                <MapPage category="land" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="land" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.apartment')}>
              {btnStatus === 'map' && (
                <MapPage category="apartment" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="apartment" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.villa')}>
              {btnStatus === 'map' && (
                <MapPage category="villa" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="villa" allProduct={allProduct} />
              )}
            </ScrollView>

            <ScrollView tabLabel={I18n.t('category.building')}>
              {btnStatus === 'map' && (
                <MapPage category="building" allProduct={allProduct} region={region} />
              )}
              {btnStatus === 'list' && (
                <ProductListPage category="building" allProduct={allProduct} />
              )}
            </ScrollView>
          </ScrollableTabView>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ token, user, products, map }) => ({
  user,
  token,
  products,
  map,
})

const mapDispatchToProps = dispatch => ({
  getProductsByCategory: (token, data) => dispatch(getProductsByCategory(token, data)),
  saveMyLocation: args => dispatch(saveMyLocation(args)),
})

TabView.propTypes = {
  getProductsByCategory: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabView)