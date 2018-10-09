import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import CheckBox from 'react-native-modest-checkbox';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

import I18n from '@i18n';
import Container from '@layout/Container';
import KeyboardScrollView from '@components/KeyboardView';
import { RadioGroup, RadioButton } from '@components/RadioButtonGroup';
import DropdownComponent from '@components/DropdownComponent';
import CategoryComponent from '@components/CategoryComponent';
import LoadingSpinner from '@components/LoadingSpinner';
import PostProductLocationPage from '../PostProductLocationPage'

import { styles } from './styles';

import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { PERIOD_DATA, BUILDING_TYPE_DATA, APARTMENT_ROOM_TYPE } from '@common';
import { updateProduct, deleteMyProduct } from '@redux/Product/actions';

class ProductUpdatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      videoFileName: null,
      coordinate: null,
      data: null,
      opacity: 0,

      page: 'post',
    }
    this.player = null;
  }

  componentWillMount() {
    const { data } = this.props
    this.setState({ ...data })

    this.setState({
      coordinate: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps
    if (this.props.products.loading === 'UPDATE_PRODUCT_REQUEST' && products.loading === 'UPDATE_PRODUCT_SUCCESS' ||
      this.props.products.loading === 'DELETE_PRODUCT_REQUEST' && products.loading === 'DELETE_PRODUCT_SUCCESS' ||
      products.loading === 'UPDATE_PRODUCT_FAILED') {
        this.setState({ loading: false })
    }
  }

  componentDidUpdate(prevProps) {
    const { products } = prevProps
    if (products.loading === 'UPDATE_PRODUCT_REQUEST' && this.props.products.loading === 'UPDATE_PRODUCT_SUCCESS' ||
      products.loading === 'DELETE_PRODUCT_REQUEST' && this.props.products.loading === 'DELETE_PRODUCT_SUCCESS' ||
      this.props.products.loading === 'UPDATE_PRODUCT_FAILED') {
        Actions.MyAds()
    }
  }

  onSelectProductOption(index, value) {
    this.setState({ product_type: index })
  }

  selectCategory(item) {
    this.setState({ category: item });
  }

  onDeleteVideo() {
    this.setState({ video_url: null, videoFileName: null })
  }

  onUpdate = () => {
    const { user, token, updateProduct } = this.props
    const stateData = this.state

    this.setState({ loading: true })
    const params = {
      customer_id: user.userInfo.user.customer_id,
      product_description: {
        1: {
          name: stateData.name,
          description: stateData.description,
        }
      },
      ...stateData,
    }
    updateProduct(token.tokenInfo.token, params)
  }

  onDelete = () => {
    const { user, token, deleteMyProduct } = this.props
    const stateData = this.state

    this.setState({ loading: true })
    const params = {
      user_id: user.userInfo.user.customer_id,
      product_id: stateData.product_id
    }
    deleteMyProduct(token.tokenInfo.token, params)
  }

  onCamera() {
    if (!!this.state.video_url && this.state.video_url.length > 0) {
      const options = {
        title: I18n.t('post_video.record_choose_video'),
        takePhotoButtonTitle: I18n.t('post_video.record_video'),
        chooseFromLibraryButtonTitle: I18n.t('post_video.choose_library'),
        mediaType: 'video',
        allowsEditing: true,
        durationLimit: 300, //limit 5mins
        // noData: true,
        storageOptions: {
          skipBackup: true,
          path: 'videos',
          cameraRoll: true,
          waitUntilSaved: true,
        }
      }
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
          console.log('error')
        } else if (response.customButton) {
          console.log('error')
        } else {
          this.setState({ video_url: response.uri, videoFileName: response.fileName });
        }
      })
    } else {
      this.player.presentFullscreenPlayer();
      this.player.seek(0);
    }
  }

  onShowVideo() {
    this.player.presentFullscreenPlayer();
    this.player.seek(0);
  }

  changePage(page) {
    this.setState({ page })
  }

  getAddress(addressArr) {
    if (addressArr) {
      const street = addressArr.street ? (addressArr.street + ', ') : ''
      const city = addressArr.city ? (addressArr.city + ', ') : ''
      const location =  street + city + addressArr.country

      this.setState({ location, coordinate: addressArr.coordinate })
    } else {
      this.setState({ location: I18n.t('post_video.select_address') })
    }
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
    const {
      loading,
      page,
      latitude,
      longitude,
      location,
      category, 
      video_url,
    } = this.state;

    if (page === 'map') {
      return (
        <PostProductLocationPage
          changePage={() => this.changePage('post')}
          coordinate={{ latitude: parseInt(latitude), longitude: parseInt(longitude) }}
          getAddress={location => this.getAddress(location)}
          address={location}
        />
      )
    }

    return (
      <Container title="" type='detail'>
        <LoadingSpinner visible={loading } />

        <View style={styles.container}>
          <KeyboardScrollView>
            <TouchableOpacity onPress={() => this.onCamera()}>
              <View style={styles.videoView}>
                {(!!video_url && video_url.length > 0) ?
                  <Video
                    ref={ref => this.player = ref}
                    source={{ uri: video_url }}
                    style={styles.videoThumbnail}
                    resizeMode='cover'
                    autoplay={false}
                    paused
                    onBuffer={this.onBuffer}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                  /> :
                  <Icon name='video' style={styles.cameraIcon} />
                }

                {(!!video_url && video_url.length > 0) && (
                  <View style={styles.showVideo}>
                    <TouchableOpacity onPress={() => this.onShowVideo()}>
                      <View style={styles.deleteVideoInner}>
                        <Icon name='video' style={styles.deleteVideoIcon} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {(!!video_url && video_url.length > 0) && (
                  <View style={styles.deleteVideo}>
                    <TouchableOpacity onPress={() => this.onDeleteVideo()}>
                      <View style={styles.deleteVideoInner}>
                        <Icon name='video-off' style={styles.deleteVideoIcon} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                <ActivityIndicator
                  animating
                  size="large"
                  color="#fff"
                  style={{
                    opacity: this.state.opacity,
                    position: 'absolute',
                    top: 80,
                    left: COMMON_STYLES.SCREEN_WIDTH / 2 - 20,
                  }}
                />

              </View>
            </TouchableOpacity>

            <CategoryComponent selectCategory={item => this.selectCategory(item)} category={category} />

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.location')}
              </Text>
              <TouchableOpacity onPress={() => this.changePage('map')}>
                <View style={styles.addressView}>
                  <Text style={[styles.input, styles.underline]}>{location ? location : I18n.t('post_video.select_address') }</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.title')}
              </Text>
              <TextInput
                ref="title"
                autoCapitalize="none"
                autoCorrect
                placeholder={I18n.t('post_video.ph_video_name')}
                placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                textAlign="right"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'next'}
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
                onSubmitEditing={() => this.refs.description.focus()}
              />
            </View>

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.description')}
              </Text>
              <TextInput
                ref="description"
                autoCapitalize="none"
                autoCorrect
                multiline
                placeholder={I18n.t('post_video.ph_video_desc')}
                placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                textAlign="right"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'next'}
                value={this.state.description}
                onChangeText={text => this.setState({ description: text })}
                onSubmitEditing={() => this.refs.price.focus()}
              />
            </View>

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                  {I18n.t('post_video.price')}
              </Text>
              <TextInput
                ref="price"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={I18n.t('sar')}
                placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                textAlign="right"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                keyboardType="numbers-and-punctuation"
                value={this.state.price}
                onChangeText={text => this.setState({ price: text })}
                onSubmitEditing={() => this.refs.password.focus()}
              />
            </View>

            <View style={styles.productOptionView}>
              <RadioGroup 
                color='#7D7D7D' 
                style={styles.radioGroup} 
                thickness={2}
                selectedIndex={parseInt(this.state.product_type)}
                onSelect={(index, value) => this.onSelectProductOption(index, value)}
              >
                <RadioButton value={I18n.t('post_video.sale')}>
                  <Text style={styles.textRadio}>{I18n.t('post_video.sale')}</Text>
                </RadioButton>
                <RadioButton value={I18n.t('post_video.rent')}>
                  <Text style={styles.textRadio}>{I18n.t('post_video.rent')}</Text>
                </RadioButton>
              </RadioGroup>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.product_option')}
              </Text>
            </View>

            {(category === 'building') && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.type')}
                </Text>
                <DropdownComponent
                  selectItem={value => this.setState({ building_type: value })}
                  item={BUILDING_TYPE_DATA[parseInt(this.state.building_type)].value}
                  data={BUILDING_TYPE_DATA}
                />
              </View>
            )}

            {category === 'villa' && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.squaremeter')}
                </Text>
                <TextInput
                  ref="squareMeter"
                  autoCapitalize="none"
                  autoCorrect
                  placeholder={I18n.t('post_video.squaremeter')}
                  placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="numbers-and-punctuation"
                  value={this.state.squaremeter}
                  onChangeText={text => this.setState({ squaremeter: text })}
                />
              </View>)}

            {(category === 'apartment' || category === 'chalet') && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.period')}
                </Text>
                <DropdownComponent
                  selectItem={value => this.setState({ period: value })}
                  item={PERIOD_DATA[parseInt(this.state.period)].value}
                  data={PERIOD_DATA}
                />
              </View>
            )}

            {(category === 'apartment') && (
              <View>
                <View style={styles.itemView}>
                  <CheckBox
                    label={I18n.t('post_video.furniture')}
                    labelBefore
                    labelStyle={{
                      color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
                      fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
                      marginBottom: 3,
                      fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY
                    }}
                    checked={this.state.furniture === '1' ? true : false}
                    onChange={checked => this.setState({ furniture: checked.checked })}
                  />
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.room_type')}
                  </Text>
                  <DropdownComponent
                    selectItem={value => this.setState({ room_type: value })}
                    item={APARTMENT_ROOM_TYPE[parseInt(this.state.room_type)].value}
                    data={APARTMENT_ROOM_TYPE}
                  />
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.room_count')}
                  </Text>
                  <TextInput
                    ref="roomCount"
                    autoCapitalize="none"
                    autoCorrect
                    placeholder={I18n.t('post_video.ph_room_count')}
                    placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                    textAlign="right"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numbers-and-punctuation"
                    value={this.state.room_count}
                    onChangeText={text => this.setState({ room_count: text })}
                  />
                </View>
                <View style={styles.itemView}>
                  <CheckBox
                    label={I18n.t('post_video.ownership')}
                    labelBefore
                    labelStyle={{
                      color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
                      fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
                      marginBottom: 3,
                      fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY
                    }}
                    checked={this.state.ownership === '1' ? true : false}
                    onChange={checked => this.setState({ ownership: checked.checked })}
                  />
                </View>
              </View>
            )}

            {(category === 'office') && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.area_space')}
                </Text>
                <TextInput
                  ref="areaSpace"
                  autoCapitalize="none"
                  autoCorrect
                  placeholder={I18n.t('post_video.ph_area_space')}
                  placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="numbers-and-punctuation"
                  value={this.state.areaspace}
                  onChangeText={text => this.setState({ areaspace: text })}
                />
              </View>
            )}

            {(category === 'gallery') && (
              <View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.street_size')}
                  </Text>
                  <TextInput
                    ref="streetSize"
                    autoCapitalize="none"
                    autoCorrect
                    placeholder={I18n.t('post_video.ph_meter')}
                    placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                    textAlign="right"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numbers-and-punctuation"
                    value={this.state.street_size}
                    onChangeText={text => this.setState({ street_size: text })}
                  />
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.gallery_shop')}
                  </Text>
                  <TextInput
                    ref="galleryNumber"
                    autoCapitalize="none"
                    autoCorrect
                    placeholder={I18n.t('post_video.ph_gallery_number')}
                    placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                    textAlign="right"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    value={ this.state.gallery_number }
                    onChangeText={text => this.setState({ gallery_number: text })}
                  />
                </View>
              </View>
            )}

            <TouchableOpacity onPress={this.onUpdate} activeOpacity={0.5}>
              <View style={[styles.buttonStyle, styles.editBtnView]}>
                <Text style={styles.textEdit}>{I18n.t('edit')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onDelete} activeOpacity={0.5}>
              <View style={[styles.buttonStyle, styles.deleteBtnView]}>
                <Text style={styles.textEdit}>{I18n.t('delete')}</Text>
              </View>
            </TouchableOpacity>

          </KeyboardScrollView>
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
  updateProduct: (token, data) => dispatch(updateProduct(token, data)),
  deleteMyProduct: (token, data) => dispatch(deleteMyProduct(token, data)),
})

ProductUpdatePage.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  updateProduct: PropTypes.func.isRequired,
  deleteMyProduct: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductUpdatePage)
