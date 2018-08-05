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
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Video from 'react-native-video';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-modest-checkbox';

import { RNS3 } from 'react-native-aws3';
import { AWS_OPTIONS } from '@common';
import { pickBy } from 'lodash';

import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import * as commonColors from '@common/styles/commonColors';
import * as commonStyles from '@common/styles/commonStyles';
import { CATEGORY_ICON_LIST } from '@common/category';

import ModalShare from '@components/ModalShare';

import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';

import { addProduct } from '@redux/Product/actions';

class PostNewVideoPreviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareModal: false,
      terms: false,
      loading: false,
      videoError: false,
      icon: CATEGORY_ICON_LIST['building'],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps

    if (products.loading && this.props.products.loading === 'ADD_PRODUCT_REQUEST' && products.loading === 'ADD_PRODUCT_SUCCESS' ) {
      this.setState({ loading: false })
      Actions.Main()
    }
  }

  onEdit() {
    Actions.PostNewVideo();
  }

  onPost() {
    const {
      data,
      token,
      user,
      addProduct,
    } = this.props

    const file = {
      uri: data.video_url,
      name: data.videoFileName,
      type: 'video/quicktime',
    }

    this.setState({ loading: true })

    console.log('UPLOADING FILE: ', file)
    console.log('UPLOADING OPTION: ', AWS_OPTIONS)
    
    RNS3.put(file, AWS_OPTIONS)
      .then(response => {
        console.log('UPLOADING RESPONSE: ', response)
        this.setState({ loading: false })
        if (response.status !== 201) {
          this.setState({ videoError: true, videoUploadingErrorMsg: 'Failed to upload video file to server' })
          throw new Error("Failed to upload video file to server")
        } else {
          this.setState({ videoError: false })
          const video_url = response.body.postResponse.location

          console.log('video_url: ', video_url)

          // const video_url = 'https://videoaqar.s3.amazonaws.com/upload%2FIMG_7189.MOV'

          const params = {
            customer_id: user.userInfo.user.customer_id,
            product_description: {
              1: {
                name: data.name,
                description: data.description,
              }
            },
            ...data,
            video_url,
            latitude: data.coordinate.latitude,
            longitude: data.coordinate.longitude,
            location: data.location === I18n.t('post_video.select_address') ? '' : data.location,
          }

          addProduct(token.tokenInfo.token, params)
        }
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log('UPLOADING ERROR: ', error)
      })
  }

  onCamera() {
    this.player.presentFullscreenPlayer();
    this.player.seek(0);
  }

  render() {
    const { data } = this.props;
    const {
      icon,
      loading,
      videoUploadingErrorMsg,
      videoError,
    } = this.state;

    return (
      <Container title={I18n.t('sidebar.preview')} type='detail'>
        <LoadingSpinner visible={loading } />
        
        <CustomAlert 
          title={'Warning'}
          message={videoUploadingErrorMsg} 
          visible={videoError} 
          closeAlert={() => this.setState({ videoError: false })}
        />

        <View style={styles.container}>
          <ScrollView>
            <TouchableOpacity onPress={() => this.onCamera()}>
              <View style={styles.videoView}>
                {data.video_url && (
                  <Video
                    ref={(ref) => {this.player = ref}}
                    source={{ uri: data.video_url }}
                    style={styles.videoThumbnail}
                    resizeMode='cover'
                    autoplay={false}
                    paused
                    onLoadStart={() => this.player.presentFullscreenPlayer}
                  />)}
              </View>
            </TouchableOpacity>

            <View style={styles.titleView}>
              <View style={styles.iconView}>
                <Image source={CATEGORY_ICON_LIST[data.category]} style={styles.iconOffice} resizeMode="contain" />
                <Text style={styles.textDescription}>
                  {data.category}
                </Text>
              </View>
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
            
            <View style={styles.titleView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.location')}
              </Text>
              <Text style={styles.textDescription}>
                {data.location === I18n.t('post_video.select_address') ? '' : data.location}
              </Text>
            </View>

            {(data.category === 'building') && (
              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.type')}
                </Text>
                <Text style={styles.textDescription}>
                  {data.building_type}
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
              </View>)}

            {(data.category === 'apartment' || data.category === 'chalet') && (
              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.period')}
                </Text>
                <Text style={styles.textDescription}>
                  {data.period}
                </Text>
              </View>
            )}

            {(data.category === 'apartment') && (
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
                    {data.room_type}
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

            {(data.category === 'office') && (
              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.area_space')}
                </Text>
                <Text style={styles.textDescription}>
                  {data.areaspace}
                </Text>
              </View>
            )}

            {(data.category === 'gallery') && (
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
            
            <View style={styles.titleView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.product_option')}
              </Text>
              <Text style={styles.textDescription}>
                {data.product_type}
              </Text>
            </View>

            <View style={styles.itemView}>
              <CheckBox
                label={I18n.t('terms_conditions')}
                labelBefore
                labelStyle={{
                  color: commonColors.placeholderText,
                  fontSize: 14,
                  fontFamily: commonStyles.normalFont,
                  fontWeight: 'bold'
                }}
                onChange={(checked) => this.setState({ terms: checked })}
              />
            </View>

            <TouchableOpacity onPress={() => this.onPost()} activeOpacity={0.5}>
              <View style={[styles.buttonStyle, styles.postBtnView]}>
                <Text style={styles.textPost}>{I18n.t('post')}</Text>
              </View>
            </TouchableOpacity>

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
  addProduct: (token, data) => dispatch(addProduct(token, data)),
})

PostNewVideoPreviewPage.propTypes = {
  addProduct: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostNewVideoPreviewPage)
