import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Video from 'react-native-video';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import CustomCheckbox from '@components/CustomCheckbox';

import { RNS3 } from 'react-native-aws3';
import { AWS_OPTIONS } from '@common/aws';
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

import { PERIOD_DATA, BUILDING_TYPE_DATA, APARTMENT_ROOM_TYPE } from '@common';

class PostNewVideoPreviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareModal: false,
      terms: false,
      loading: false,
      videoError: false,
      icon: CATEGORY_ICON_LIST['building'],
      showTNC: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps

    if (products.loading && this.props.products.loading === 'ADD_PRODUCT_REQUEST' && products.loading === 'ADD_PRODUCT_SUCCESS' ) {
      this.setState({ loading: false })
      Actions.Main()
    }

    if (products.loading && this.props.products.loading === 'ADD_PRODUCT_REQUEST' && products.loading === 'ADD_PRODUCT_FAILED' ) {
      this.setState({ loading: false })
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

    if (!this.state.terms) {
      return
    }

    const file = {
      uri: data.video_url,
      name: data.videoFileName,
      type: 'video/quicktime',
    }

    this.setState({ videoError: false, loading: true })
    
    RNS3.put(file, AWS_OPTIONS)
      .then(response => {
        this.setState({ loading: false })
        if (response.status !== 201) {
          if (response.status === 403) {
            this.setState({ videoError: true, videoUploadingErrorMsg: I18n.t('alert.upload_success') })
          } else {
            this.setState({ videoError: true, videoUploadingErrorMsg: I18n.t('alert.upload_failed') })
          }
          throw new Error("Failed to upload video file to server")
        } else {
          this.setState({ videoError: false })
          const video_url = response.body.postResponse.location

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
          title={I18n.t('alert.warning')}
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
              <Image source={CATEGORY_ICON_LIST[data.category]} style={styles.iconOffice} resizeMode="contain" />
              <Text style={styles.textDescription}>
                {I18n.t(`category.${data.category.toLowerCase()}`)}
              </Text>
            </View>

            {data.name && (
              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {data.name}
                </Text>
              </View>
            )}
            
            {data.description && (
              <View style={[styles.titleView, { marginTop: 0 }]}>
                <Text style={styles.textDescription}>
                  {data.description}
                </Text>
              </View>
            )}
            
            <View style={styles.separate} />
            
            <View style={styles.itemView}>
              <Text style={[styles.textDescription, { fontWeight: 'bold' }]}>
                {`${data.price} ${I18n.t('sar')}`} 
              </Text>
            </View>
            
            <View style={styles.itemView}>
              <Text style={styles.textDescription}>
                {data.location === I18n.t('post_video.select_address') ? '' : data.location}
              </Text>
            </View>

            {(data.category === 'building') && (
              <View style={styles.itemView}>
                <Text style={styles.textDescription}>
                  {BUILDING_TYPE_DATA[parseInt(data.building_type)].value}
                </Text>
              </View>
            )}

            {data.category === 'villa' && (
              <View style={styles.itemView}>
                <Text style={styles.textDescription}>
                  {data.squaremeter}
                </Text>
              </View>)}

            {(data.category === 'apartment' || data.category === 'chalet') && (
              <View style={styles.itemView}>
                <Text style={styles.textDescription}>
                  {PERIOD_DATA[parseInt(data.period)].value}
                </Text>
              </View>
            )}

            {(data.category === 'apartment') && (
              <View>
                {data.furniture.checked && (
                  <View style={styles.itemView}>
                    <Text style={styles.textDescription}>
                      {I18n.t('post_video.furniture')}
                    </Text>
                  </View>
                )}
                <View style={styles.itemView}>
                  <Text style={styles.textDescription}>
                    {APARTMENT_ROOM_TYPE[parseInt(data.room_type)].value}
                  </Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.textDescription}>
                    {data.room_count}
                  </Text>
                </View>
                {data.ownership.checked && (
                  <View style={styles.itemView}>
                    <Text style={styles.textDescription}>
                      {I18n.t('post_video.ownership')}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {(data.category === 'office') && (
              data.areaspace.length > 0 && (
                <View style={styles.itemView}>
                  <Text style={styles.textDescription}>
                    {data.areaspace}
                  </Text>
                </View>
              )
            )}

            {(data.category === 'gallery') && (
              <View>
                {data.street_size.length > 0 && (
                  <View style={styles.itemView}>
                    <Text style={styles.textDescription}>
                      {data.street_size}
                    </Text>
                  </View>
                )}
                {data.gallery_number.length > 0 && (
                  <View style={styles.itemView}>
                    <Text style={styles.textDescription}>
                      {data.gallery_number}
                    </Text>
                  </View>
                )}
              </View>
            )}
            
            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {data.product_type === '0' ? I18n.t('post_video.sale') : I18n.t('post_video.rent')}
              </Text>
            </View>

            <View style={[styles.titleView, { marginTop: 20 }]}>
              <CustomCheckbox
                label={
                  <View style={styles.termsView}>
                    <TouchableOpacity onPress={() => this.setState({ showTNC: true })}>
                      <Text style={styles.termsText}>{I18n.t('terms_conditions')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>{I18n.t('will_accept')}</Text>
                  </View>
                }
                labelBefore
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

        <Modal
          animationIn='slideInUp'
          animationOut='slideOutDown'
          transparent
          isVisible={this.state.showTNC}
          backdropColor='rgba(0, 0, 0, 0.3)'
          onBackdropPress={() => this.setState({ showTNC: false })}
        >
          <View style={styles.modalView} >
            <Text style={styles.tncContent}>
              شروط الإعلان
              ١-التحديث شهريا وعدم تكرار الإعلان نفسه .
              ٢-يعتبر المشترك او المعلن هو المسؤول عن محتوي اعلان الفيديو .
              .
              ٣-اغلاق الإعلان بعد بيع او ايجار العقار المعروض .
              ٤-يتطلب إضافة أعلان جديد ، الاشتراك في إحدى باقات فيديو عقار بعد انتهاء الباقه المجانيه .
            </Text>
          </View>
        </Modal>
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
