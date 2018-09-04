import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Share,
  ActivityIndicator
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Video from 'react-native-video';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import I18n from '@i18n';
import Container from '@layout/Container';
import ModalShare from '@components/ModalShare';
import { CATEGORY_ICON_LIST } from '@common/category';

import { setFavorite, addViewCount } from '@redux/Product/actions';


import { PERIOD_DATA, BUILDING_TYPE_DATA, APARTMENT_ROOM_TYPE } from '@common';

import * as commonStyles from '@common/styles/commonStyles';
import { styles } from './styles';

const ASPECT_RATIO = commonStyles.screenSubWidth / 200
const LATITUDE_DELTA = 0.1222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const icon_office = require('@common/assets/images/product_detail/office.png');
const icon_report = require('@common/assets/images/product_detail/report_ad.png');

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareModal: false,
      favorite: true,
      opacity: 0,
    }
  }

  componentWillMount() {
    const { data, token, user, addViewCount } = this.props
    console.log('PRODUCT_DETAIL: ', data)
    this.setState({ favorite: data.favorite })
    addViewCount(token.tokenInfo.token, { product_id: data.product_id })
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps
    if (this.props.products.loading === 'SET_FAVORITE_REQUEST' && products.loading === 'SET_FAVORITE_SUCCESS') {
      Actions.MyWishList()
    }
  }

  onFavorite() {
    const {
      data,
      token,
      user,
      setFavorite,
    } = this.props

    const { favorite } = this.state

    this.setState({ favorite: !favorite })

    setFavorite(
      token.tokenInfo.token,
      {
        customer_id: user.userInfo.user.customer_id,
        product_id: data.product_id
      },
      favorite,
    )
  }

  onShare() {
    const { data } = this.props;
    // this.setState({ showShareModal : true });
    Share.share({
      message: data.description,
      url: data.video_url,
      title: data.name
    }, {
      dialogTitle: 'AQAR Videos',
      subject: 'AQAR Videos'
    })
  }

  onSendMessage() {
    const { data: { product_id, customer_id } } = this.props;
    Actions.DirectMessage({
      product_id,
      product_owner_id: customer_id,
    });
  }

  onReportAD() {

  }

  onCamera() {
    this.player.presentFullscreenPlayer();
    this.player.seek(0);
  }

  onLoadStart = () => {
    this.setState({ opacity: 1 }, () => {
      this.player.presentFullscreenPlayer
    })
  }

  onLoad = () => {
    this.setState({ opacity: 0 })
  }

  onBuffer = ({ isBuffering }) => {
    this.setState({ opacity: isBuffering ? 1 : 0 })
  }

  render() {
    const { data, user } = this.props;
    const { showShareModal } = this.state

    return (
      <Container title={data.name} type='detail'>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.subContainer}>
              <View style={styles.videoView}>
                {(!!data.video_url && data.video_url.length > 0 && data.status === '1') ?
                  <TouchableOpacity onPress={() => this.onCamera()}>
                    <Video
                      ref={(ref) => { this.player = ref }}
                      source={{ uri: data.video_url }}
                      style={styles.video}
                      resizeMode='cover'
                      autoplay={false}
                      paused
                      onBuffer={this.onBuffer}
                      onLoad={this.onLoad}
                      onLoadStart={this.onLoadStart}
                    />
                  </TouchableOpacity> :
                  <Icon name='video-off' style={styles.emptyVideo} />
                }

                <ActivityIndicator
                  animating
                  size="large"
                  color="#fff"
                  style={{
                    opacity: this.state.opacity,
                    position: 'absolute',
                    top: 80,
                    left: commonStyles.screenWidth / 2 - 20,
                  }}
                />
              </View>

              <View style={styles.titleView}>
                <Image source={CATEGORY_ICON_LIST[data.category.toLowerCase()]} style={styles.iconCategory} resizeMode="contain" />
                <Text style={styles.textDescription}>
                  {I18n.t(`category.${data.category}`)}
                </Text>
              </View>
              
              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.title')}
                </Text>
                <Text style={styles.textDescription}>
                  {data.name}
                </Text>
              </View>
              
              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.description')}
                </Text>
                <Text style={styles.textDescription}>
                  {data.description}
                </Text>
              </View>
              
              <View style={styles.separate} />
              
              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                    {I18n.t('post_video.price')}
                </Text>
                <Text style={styles.textDescription}>
                  {`${data.price} ${I18n.t('sar')}`} 
                </Text>
              </View>

              {data.category === 'building' && (
                <View style={styles.titleView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.type')}
                  </Text>
                  <Text style={styles.textDescription}>
                    {BUILDING_TYPE_DATA[parseInt(data.building_type)].value}
                  </Text>
                </View>
              )}

              {data.category === 'villa' && (
                <View style={styles.titleView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.squaremeter')}
                  </Text>
                  <Text style={styles.textDescription}>
                    {data.squaremeter}
                  </Text>
                </View>
              )}

              {(data.category === 'apartment' || data.category === 'chalet') && (
                <View style={styles.titleView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.period')}
                  </Text>
                  <Text style={styles.textDescription}>
                    {PERIOD_DATA[parseInt(data.period)].value}
                  </Text>
                </View>
              )}

              {data.category === 'apartment' && (
                <View>
                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.furniture')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {data.furniture}
                    </Text>
                  </View>
                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.room_type')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {APARTMENT_ROOM_TYPE[parseInt(data.room_type)].value}
                    </Text>
                  </View>
                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.room_count')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {data.room_count}
                    </Text>
                  </View>
                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.ownership')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {data.ownership}
                    </Text>
                  </View>
                </View>
              )}

              {data.category === 'office' && (
                <View style={styles.titleView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.area_space')}
                  </Text>
                  <Text style={styles.textDescription}>
                    {data.areaspace}
                  </Text>
                </View>
              )}

              {data.category === 'gallery' && (
                <View>
                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.street_size')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {data.street_size}
                    </Text>
                  </View>
                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.gallery_shop')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {data.gallery_number}
                    </Text>
                  </View>
                </View>
              )}
              
              <View style={styles.separate} />

              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.product_option')}
                </Text>
                <Text style={styles.textDescription}>
                  {data.product_type === '0' ? I18n.t('post_video.sale') : I18n.t('post_video.rent')}
                </Text>
              </View>
              
              <View style={styles.separate} />

              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.location')}
                </Text>
                <Text style={styles.textDescription}>
                  {data.location}
                </Text>
                <View style={styles.mapViewContainer}>
                  <MapView
                    style={styles.mapView}
                    showsScale
                    showsPointsOfInterest
                    showsBuildings
                    showsCompass
                    loadingEnabled
                    toolbarEnabled
                    pitchEnabled
                    zoomEnabled
                    rotateEnabled
                    initialRegion={{
                      latitude: parseFloat(data.latitude),
                      longitude: parseFloat(data.longitude),
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA
                    }}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                      }}
                      title={data.title}
                    />
                  </MapView>
                </View>
              </View>

              <View style={styles.separate} />

              {user.userLogin && (
                <View style={styles.btnView}>
                  <TouchableOpacity onPress={() => this.onFavorite()} activeOpacity={0.5}>
                    <View style={styles.btnFavorite}>
                      <FontAwesome style={this.state.favorite ? styles.icon_select : styles.icon}>{Icons.star}</FontAwesome>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.onShare()} activeOpacity={0.5}>
                    <View style={styles.btnShare}>
                      <IconEntypo name='share' style={styles.icon}></IconEntypo>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.onSendMessage()} activeOpacity={0.5}>
                    <View style={styles.btnSend}>
                      <View style={styles.sendTextWrapper}>
                        <Text style={styles.textSend}>{I18n.t('send')}</Text>
                        <Text style={styles.textSend}>{I18n.t('message')}</Text>
                      </View>
                      <FontAwesome style={styles.icon}>{Icons.envelopeO}</FontAwesome>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              
              {/* {user.userLogin && (
                <View style={styles.btnView}>
                  <TouchableOpacity onPress={() => this.onReportAD()} activeOpacity={0.5}>
                    <View style={styles.btnAd}>
                      <Text style={[styles.textDescription, {fontStyle: 'italic'}]}>{I18n.t('report_ad')}</Text>
                      <Image source={icon_report} style={styles.iconAd} />
                    </View>
                  </TouchableOpacity>
                </View>
              )} */}
            </View>
            
            <ModalShare showShareModal={showShareModal} hideShareModal={() => this.setState({ showShareModal: false })} />

          </ScrollView>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, token, products }) => ({
  user,
  token,
  products,
})

const mapDispatchToProps = dispatch => ({
  setFavorite: (token, data, flag) => dispatch(setFavorite(token, data, flag)),
  addViewCount: (token, data) => dispatch(addViewCount(token, data)),
})

ProductDetailPage.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  products: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  setFavorite: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailPage)