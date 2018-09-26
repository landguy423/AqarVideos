import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

import FontAwesome, {Icons} from 'react-native-fontawesome';
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
import AutoSuggestComponent from '@components/AutoSuggestComponent';
import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';
import PostProductLocationPage from '../PostProductLocationPage'

import { styles } from './styles';

import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { PERIOD_DATA, BUILDING_TYPE_DATA, APARTMENT_ROOM_TYPE } from '@common';

class PostNewVideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      
      video_url: null,
      videoFileName: null,
      category: 'building',
      location: I18n.t('post_video.select_address'),
      coordinate: null,
      name: '',
      description: '',
      price: '',
      product_type: '0',

      //building
      building_type: '0', // Residential, Commercial

      //villa
      squaremeter: '1000',

      //apartment
      furniture: false,
      period: '0',    // Daily, Monthly, Yearly
      room_type: '0', // Singular, Familiar
      room_count: '',
      ownership: false,

      //office
      areaspace: '',

      //gallery
      street_size: '',
      gallery_number: '',

      page: 'post',
      errorFlag: false,
      errorText: '',
    }
    this.player = null;
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  onPreview() {
    const propsData = this.state;

    if (!propsData.video_url || !propsData.videoFileName) {
      this.setState({ errorFlag: true })
      this.setState({ errorText: I18n.t('post_video.select_video') })
      return
    }
    if (!propsData.coordinate) {
      this.setState({ errorFlag: true })
      this.setState({ errorText: I18n.t('post_video.select_address') })
      return
    }
    if (propsData.name.length === 0) {
      this.setState({ errorFlag: true })
      this.setState({ errorText: I18n.t('post_video.select_title') })
      return
    } else if (propsData.price.length === 0) {
      this.setState({ errorFlag: true })
      this.setState({ errorText: I18n.t('post_video.select_price') })
      return
    }

    this.setState({ errorFlag: false })
    Actions.PostNewVideoPreview({ data: propsData });
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

  onCamera() {
    if (this.state.video_url === null) {
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

  changePage(page) {
    this.setState({ page })
  }

  getAddress(addressArr) {
    if (addressArr) {
      const location = addressArr.street ? (addressArr.street + ', ') : '' +
                        addressArr.city ? (addressArr.city + ', ') : '' +
                        addressArr.country;
      this.setState({ location, coordinate: addressArr.coordinate })
    } else {
      this.setState({ location: I18n.t('post_video.select_address') })
    }
    this.setState({ errorFlag: false })
  }

  render() {
    // const {videoData} = this.props;
    const {
      loading,
      errorFlag,
      errorText,
      page,
      category,
      video_url,
      location,
      coordinate,
    } = this.state;

    if (page === 'map') {
      return (
        <PostProductLocationPage
          changePage={() => this.changePage('post')}
          coordinate={coordinate}
          getAddress={location => this.getAddress(location)}
          address={location}
        />
      )
    }

    return (
      <Container title={I18n.t('sidebar.post_new_ads')}>
        <LoadingSpinner visible={loading } />

        <CustomAlert 
          title={I18n.t('alert.warning')}
          message={errorText}
          visible={errorFlag} 
          closeAlert={() => this.setState({ errorFlag: false })}
        />

        <View style={styles.container}>
          <KeyboardScrollView>
            <TouchableOpacity onPress={() => this.onCamera()}>
              <View style={styles.videoView}>
                {video_url ?
                  <Video
                    ref={ref => this.player = ref}
                    source={{ uri: video_url }}
                    style={styles.videoThumbnail}
                    resizeMode='cover'
                    autoplay={false}
                    paused
                    onLoadStart={() => this.player.presentFullscreenPlayer}
                  /> :
                  <Icon name='video' style={styles.cameraIcon} />
                }
                {video_url && (
                  <View style={styles.deleteVideo}>
                    <TouchableOpacity onPress={() => this.onDeleteVideo()}>
                      <View style={styles.deleteVideoInner}>
                        <Icon name='video-off' style={styles.deleteVideoIcon} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <CategoryComponent selectCategory={item => this.selectCategory(item)} />

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.location')}
              </Text>
              <TouchableOpacity onPress={() => this.changePage('map')}>
                <View style={styles.addressView}>
                  <Text style={styles.input}>{this.state.location}</Text>
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
                placeholderTextColor={commonColors.placeholderSubText}
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
                placeholderTextColor={commonColors.placeholderSubText}
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
                placeholderTextColor={commonColors.placeholderSubText}
                textAlign="right"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                value={this.state.price}
                keyboardType="numbers-and-punctuation"
                onChangeText={text => this.setState({ price: text })}
              />
            </View>

            <View style={styles.productOptionView}>
              <RadioGroup 
                color='#7D7D7D' 
                style={styles.radioGroup} 
                thickness={2}
                selectedIndex={0}
                onSelect={(index, value) => this.onSelectProductOption(index, value)}
              >
                <RadioButton value={I18n.t('post_video.sale')}>
                  <Text style={styles.textDescription}>{I18n.t('post_video.sale')}</Text>
                </RadioButton>
                <RadioButton value={I18n.t('post_video.rent')}>
                  <Text style={styles.textDescription}>{I18n.t('post_video.rent')}</Text>
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
                  placeholderTextColor={commonColors.placeholderSubText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  value={this.state.squaremeter}
                  keyboardType="numbers-and-punctuation"
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
                      color: commonColors.placeholderText,
                      fontSize: 14,
                      fontFamily: commonStyles.normalFont,
                      fontWeight: 'bold'
                    }}
                    onChange={checked => this.setState({ furniture: checked })}
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
                    placeholderTextColor={commonColors.placeholderSubText}
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
                      color: commonColors.placeholderText,
                      fontSize: 14,
                      fontFamily: commonStyles.normalFont,
                      fontWeight: 'bold'
                    }}
                    onChange={checked => this.setState({ ownership: checked })}
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
                  placeholderTextColor={ commonColors.placeholderSubText }
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
                    placeholderTextColor={commonColors.placeholderSubText}
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
                    placeholderTextColor={commonColors.placeholderSubText}
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

            <TouchableOpacity onPress={() => this.onPreview()} activeOpacity={0.5}>
              <View style={styles.previewBtnView}>
                <Text style={styles.textPreview}>{I18n.t('sidebar.preview')}</Text>
              </View>
            </TouchableOpacity>
          </KeyboardScrollView>
        </View>
      </Container>
    );
  }
}

export default PostNewVideoPage