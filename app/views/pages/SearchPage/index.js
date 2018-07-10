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

import PropTypes from 'prop-types';
import KeyboardScrollView from '@components/KeyboardView';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import CheckBox from 'react-native-modest-checkbox';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

import I18n from '@i18n';
import Container from '@layout/Container';
import Modal from 'react-native-modal';
import CustomAlert from '@components/CustomAlert';
import { RadioGroup, RadioButton } from '@components/RadioButtonGroup';
import DropdownComponent from '@components/DropdownComponent';
import CategoryComponent from '@components/CategoryComponent';
import AutoSuggestComponent from '@components/AutoSuggestComponent';
import LoadingSpinner from '@components/LoadingSpinner';
import PostProductLocationPage from '../PostProductLocationPage';
import ProductListPage from '../ProductListPage';

import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { getRegions } from '@redux/Region/actions';
import { searchProduct } from '@redux/Product/actions';

import { PERIOD_DATA, BUILDING_TYPE_DATA, APARTMENT_ROOM_TYPE } from '@common';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isError: false,
      showProducts: false,
      errMsg: '',
      page: 'post',
      address: I18n.t('post_video.select_address'),
      coordinate: null,
      category: 'building',
      minPrice: '0',
      maxPrice: '10000',
      productOption: 'Sale',
      radius: '1',
      period: 'Daily',
      buildingType: 'Residential',
      minSquareMeter: '',
      maxSquareMeter: '',
      roomType: 'Singular',
      roomCount: '',
      furniture: true,
      ownership: false,
      areaSpace: '',
      streetSize: '',
      galleryNumber: '',
      searchedProducts: [],
    }
    this.player = null;
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps;
    if (this.props.products.loading === 'SEARCH_PRODUCT_REQUEST' && products.loading === 'SEARCH_PRODUCT_SUCCESS') {
      console.log('SEARCH_PRODUCT: ', products.searchProduct);
      this.setState({ loading: false });
      if (products.searchProduct.status === 200) {
        this.setState({ showProducts: true, searchProductList: products.searchProduct.product });
      } else if (products.searchProduct.status === 107) {
        this.setState({ isError: true, errMsg: products.searchProduct.message });
      }
    }
  }

  onSelectProductOption(index, value) {
    this.setState({ productOption: value })
  }

  selectCategory(item) {
    this.setState({ category: item });
  }

  onSearch() {
    const { searchProduct, token, user } = this.props;

    // if (!this.state.coordinate || !this.state.radius) return;

    this.setState({ loading: true });
    this.props.searchProduct(
      token.tokenInfo.token,
      {
        user_id: user.userInfo ? user.userInfo.user.customer_id : null,
        category_name: this.state.category,
        // lat: this.state.coordinate.latitude,
        // long: this.state.coordinate.longitude,
        // radius: this.state.radius,
        lat: '37.78',
        long: '-122.44',
        radius: this.state.radius,
        product_type: this.state.productOption,
        min_price: this.state.minPrice,
        max_price: this.state.maxPrice,
        building_type: this.state.buildingType,
        min_square_meter: this.state.minSquareMeter,
        max_square_meter: this.state.maxSquareMeter,
        period: this.state.period,
        room_type: this.state.roomType,
        room_count: this.state.roomCount,
        furniture: this.state.furniture,
        ownership: this.state.ownership,
        areaspace: this.state.areaSpace,
        street_size: this.state.streetSize,
        gallery_number: this.state.galleryNumber
      }
    );
  }

  getAddress(addressArr) {
    if (addressArr) {
      const address = addressArr.street ? (addressArr.street + ', ') : '' +
                      addressArr.city ? (addressArr.city + ', ') : '' +
                      addressArr.country;
      this.setState({ address, coordinate: addressArr.coordinate })
    } else {
      this.setState({ address: I18n.t('post_video.select_address') })
    }
  }

  changePage(page) {
    this.setState({ page })
  }

  closeAlert() {
    this.setState({ isError: false });
  }

  render() {
    const {
      page,
      coordinate,
      address,
      category,
      loading,
      isError,
      errMsg,
    } = this.state;

    if (page === 'map') {
      return (
        <PostProductLocationPage
          changePage={() => this.changePage('post')}
          coordinate={coordinate}
          getAddress={address => this.getAddress(address)}
          address={address}
        />
      )
    }

    return (
      <Container title={I18n.t('search')} type='detail'>
        <LoadingSpinner visible={loading} />
        <CustomAlert 
          title={'Error'}
          message={errMsg}
          visible={isError} 
          closeAlert={() => this.closeAlert()}
        />

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <KeyboardScrollView>
              <CategoryComponent selectCategory={item => this.selectCategory(item)} />

              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.location')}
                </Text>
                <TouchableOpacity onPress={() => this.changePage('map')}>
                  <View style={styles.addressView}>
                    <Text style={styles.input}>{address}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.radius')}
                </Text>
                <TextInput
                  ref="radius"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('post_video.radius_ph')}
                  placeholderTextColor={ commonColors.placeholderSubText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="numbers-and-punctuation"
                  value={this.state.radius}
                  onChangeText={text => this.setState({ radius: text })}
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
                  <RadioButton value={'Sale'}>
                    <Text style={styles.textDescription}>{I18n.t('post_video.sale')}</Text>
                  </RadioButton>
                  <RadioButton value={'Rent'}>
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
                    selectItem={value => this.setState({ buildingType: value })}
                    item={this.state.buildingType}
                    data={BUILDING_TYPE_DATA}
                  />
                </View>
              )}

              <View style={styles.squareMeterView}>
                <View style={styles.squareMeterBox}>
                  <TextInput
                    ref="maxPrice"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={I18n.t('post_video.max_price')}
                    placeholderTextColor={ commonColors.placeholderSubText }
                    textAlign="right"
                    style={styles.inputPrice}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numbers-and-punctuation"
                    value={this.state.maxPrice}
                    onChangeText={text => this.setState({ maxPrice: text })}
                  />
                </View>
                <View style={styles.squareMeterBox}>
                  <TextInput
                    ref="minPrice"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={I18n.t('post_video.min_price')}
                    placeholderTextColor={ commonColors.placeholderSubText }
                    textAlign="right"
                    style={styles.inputPrice}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numbers-and-punctuation"
                    value={this.state.minPrice}
                    onChangeText={text => this.setState({ minPrice: text })}
                  />
                </View>
              </View>

              {category === 'villa' && (
              <View style={styles.squareMeterView}>
                <View style={styles.squareMeterBox}>
                  <TextInput
                    ref="maxSquareMeter"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={I18n.t('post_video.max_squaremeter')}
                    placeholderTextColor={ commonColors.placeholderSubText }
                    textAlign="right"
                    style={styles.inputPrice}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numbers-and-punctuation"
                    value={this.state.maxSquareMeter}
                    onChangeText={text => this.setState({ maxSquareMeter: text })}
                  />
                </View>
                <View style={styles.squareMeterBox}>
                  <TextInput
                    ref="minSquareMeter"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={I18n.t('post_video.min_squaremeter')}
                    placeholderTextColor={ commonColors.placeholderSubText }
                    textAlign="right"
                    style={styles.inputPrice}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numbers-and-punctuation"
                    value={this.state.minSquareMeter}
                    onChangeText={text => this.setState({ minSquareMeter: text })}
                  />
                </View>
              </View>)}

              {(category === 'apartment' || category === 'chalet') && (
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.period')}
                  </Text>
                  <DropdownComponent
                    selectItem={value => this.setState({ period: value })}
                    item={this.state.period}
                    data={PERIOD_DATA}
                  />
                </View>
              )}

              {(category === 'apartment') && (
                <View>
                  <View style={styles.itemView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.room_type')}
                    </Text>
                    <DropdownComponent
                      selectItem={value => this.setState({ roomType: value })}
                      item={this.state.roomType}
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
                      autoCorrect={true}
                      placeholder={I18n.t('post_video.ph_room_count')}
                      placeholderTextColor={commonColors.placeholderSubText}
                      textAlign="right"
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      returnKeyType={'next'}
                      keyboardType="numbers-and-punctuation"
                      value={this.state.roomCount}
                      onChangeText={text => this.setState({ roomCount: text }) }
                    />
                  </View>
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
                    <CheckBox
                      label={I18n.t('post_video.ownership')}
                      labelBefore
                      labelStyle={{
                        color: commonColors.placeholderText,
                        fontSize: 14,
                        fontFamily: commonStyles.normalFont,
                        fontWeight: 'bold'
                      }}
                      onChange={(checked) => this.setState({ ownership: checked })}
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
                    autoCorrect={ true }
                    placeholder={I18n.t('post_video.ph_area_space')}
                    placeholderTextColor={ commonColors.placeholderSubText }
                    textAlign="right"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    returnKeyType={ 'next' }
                    keyboardType="numbers-and-punctuation"
                    value={this.state.areaSpace}
                    onChangeText={text => this.setState({ areaSpace: text }) }
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
                      autoCorrect={true}
                      placeholder={I18n.t('post_video.ph_meter')}
                      placeholderTextColor={ commonColors.placeholderSubText }
                      textAlign="right"
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      returnKeyType={'next'}
                      keyboardType="numbers-and-punctuation"
                      value={this.state.streetSize}
                      onChangeText={text => this.setState({ streetSize: text }) }
                    />
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.gallery_shop')}
                    </Text>
                    <TextInput
                      ref="galleryNumber"
                      autoCapitalize="none"
                      autoCorrect={true}
                      placeholder={I18n.t('post_video.ph_gallery_number')}
                      placeholderTextColor={ commonColors.placeholderSubText }
                      textAlign="right"
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      returnKeyType={'next'}
                      value={this.state.galleryNumber}
                      onChangeText={text => this.setState({ galleryNumber: text }) }
                    />
                  </View>
                </View>
              )}
              <View style={{ height: 50 }} />

            </KeyboardScrollView>
          </View>

          <TouchableOpacity onPress={() => this.onSearch()} activeOpacity={0.5}>
            <View style={styles.searchBtnView}>
              <Text style={styles.searchBtn}>{I18n.t('search')}</Text>
            </View>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent
            isVisible={this.state.showProducts}
            backdropColor='rgba(0, 0, 0, 0.3)'
            onBackdropPress={() => this.setState({ showProducts: false })}
          >
            <View style={styles.modal} >
              <ProductListPage
                category={this.state.category}
                allProduct={this.state.searchProductList}
                listWidth={commonStyles.screenSubWidth}
                closeModal={() => this.setState({ showProducts: false })}
              />
            </View>
          </Modal>

        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ products, token, user }) => ({
  user,
  token,
  products
})

const mapDispatchToProps = dispatch => ({
  searchProduct: (token, data) => dispatch(searchProduct(token, data)),
})

SearchPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  searchProduct: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage)
