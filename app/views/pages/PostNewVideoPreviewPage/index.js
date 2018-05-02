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
      uri: data.videoUri,
      name: data.videoFileName,
      type: 'video/quicktime',
    }

    this.setState({ loading: true })

    // RNS3.put(file, AWS_OPTIONS).then(response => {
    //   this.setState({ loading: false })
    //   if (response.status !== 201) {
    //     this.setState({ videoError: true, videoUploadingErrorMsg: 'Failed to upload video file to server' })
    //     throw new Error("Failed to upload video file to server")
    //   } else {
    //     this.setState({ videoError: false })
    //     uploadUrl = response.body.postResponse.location

    //     console.log(uploadUrl)
    //   }
    // })

    const uploadUrl = 'https://videoaqar.s3.amazonaws.com/upload%2FIMG_7189.MOV'
    const params = {
      // customer_id: user.userInfo.user.customer_id,
      customer_id: 4,
      product_description: {
        1: {
          name: data.title,
          description: data.description,
        }
      },
      price: data.price,
      category: data.category,
      // latitude: data.coordinate.latitude,
      // longitude: data.coordinate.longitude,
      latitude: 38.9140,
      longitude: 121.6147,
      video_url: uploadUrl,
      address: data.address,
      product_type: data.productOption,
      status: data.buildingType, 
    }

    addProduct(token.tokenInfo.token, params)
  }

  onDelete() {

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
      <Container title={I18n.t('sidebar.preview')}>
        <LoadingSpinner visible={loading } />
        
        <CustomAlert 
          title={'Warning'}
          message={videoUploadingErrorMsg} 
          visible={videoError} 
          closeAlert={() => this.setState({ errorLoading: false })}
        />

        <View style={styles.container}>
          <ScrollView>
            <TouchableOpacity onPress={() => this.onCamera()}>
              <View style={styles.videoView}>
                {data.videoUri && (
                  <Video
                    ref={(ref) => {this.player = ref}}
                    source={{uri: data.videoUri}}
                    style={styles.videoThumbnail}
                    resizeMode='cover'
                    autoplay={false}
                    paused
                    onLoadStart={() => this.player.presentFullscreenPlayer}
                  />)}
              </View>
            </TouchableOpacity>

            <View style={styles.titleView}>
              <Text style={styles.textTitle}>
                {data.title}
              </Text>
            </View>

            <View style={styles.description}>
              <Text style={styles.textDescription}>
                {data.description}
              </Text>
            </View>

            <View style={styles.separate} />
            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {data.price}
              </Text>
            </View>

            <View style={styles.itemView}>
              <Text style={styles.textDescription}>
                {data.address}
              </Text>
            </View>
            
            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {data.productOption}
              </Text>
            </View>

            {data.category == 'building' && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {data.buildingType}
                </Text>
              </View>
            )}

            {(data.category == 'building' || data.category == 'villa') && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {data.price}
                </Text>
              </View>
            )}

            {data.category == 'villa' && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {data.minSquareMeter}
                </Text>
              </View>
            )}

            {(data.category === 'apartment') && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {data.period}
                </Text>
              </View>
            )}

            {(data.category === 'apartment') && (
              <View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {data.location}
                  </Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {data.furniture}
                  </Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {data.roomType}
                  </Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {data.roomCount}
                  </Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {data.ownership}
                  </Text>
                </View>
              </View>
            )}

            {(data.category === 'office') && (
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {data.areaSpace}
                </Text>
              </View>
            )}

            {(data.category === 'gallery') && (
              <View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {data.streetSize}
                  </Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {data.galleryNumber}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.titleView}>
              <View style={styles.iconView}>
                <Image source={CATEGORY_ICON_LIST[data.category]} style={styles.iconOffice} resizeMode="contain" />
                <Text style={styles.textDescription}>
                  {data.category}
                </Text>
              </View>
            </View>

            <View style={styles.itemView}>
              <CheckBox
                label={I18n.t('terms_conditions')}
                labelBefore
                labelStyle={{color: commonColors.placeholderText, fontSize: 14, fontFamily: commonStyles.normalFont, fontWeight: 'bold'}}
                onChange={(checked) => this.setState({terms: checked})}
              />
            </View>

            <TouchableOpacity onPress={() => this.onEdit()} activeOpacity={0.5}>
              <View style={[styles.buttonStyle, styles.editBtnView]}>
                <Text style={styles.textEdit}>{I18n.t('edit')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPost()} activeOpacity={0.5}>
              <View style={[styles.buttonStyle, styles.postBtnView]}>
                <Text style={styles.textEdit}>{I18n.t('post')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onDelete()} activeOpacity={0.5}>
              <View style={[styles.buttonStyle, styles.deleteBtnView]}>
                <Text style={styles.textEdit}>{I18n.t('delete')}</Text>
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
