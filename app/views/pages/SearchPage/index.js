import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import PropTypes from 'prop-types';
import KeyboardScrollView from '@components/KeyboardView';
import { connect } from 'react-redux';
import CheckBox from 'react-native-modest-checkbox';

import I18n from '@i18n';
import Container from '@layout/Container';
import Modal from 'react-native-modal';
import CustomAlert from '@components/CustomAlert';
import { RadioGroup, RadioButton } from '@components/RadioButtonGroup';
import DropdownComponent from '@components/DropdownComponent';
import CategoryComponent from '@components/CategoryComponent';
import LoadingSpinner from '@components/LoadingSpinner';
import PostProductLocationPage from '../PostProductLocationPage';
import ProductListPage from '../ProductListPage';

import { styles } from './styles';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { searchProduct } from '@redux/Product/actions';

import { PERIOD_DATA, BUILDING_TYPE_DATA, APARTMENT_ROOM_TYPE } from '@common';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isError: false,
      errMsg: '',
      showProducts: false,
      page: 'post',
      address: I18n.t('post_video.select_address'),
      coordinate: null,
      category: 'building',
      minPrice: '',
      maxPrice: '',
      productOption: I18n.t('post_video.sale'),
      radius: '1',
      period: '0',
      buildingType: '0',
      roomType: '0',      
      furniture: true,
      streetSize: '',
      searchedProducts: [],
    }
    this.player = null;
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps;
    if (this.props.products.loading === 'SEARCH_PRODUCT_REQUEST' && products.loading === 'SEARCH_PRODUCT_SUCCESS') {
      this.setState({ loading: false });
      if (products.searchProduct.status === 200) {
        this.setState({ showProducts: true, searchProductList: products.searchProduct.product });
      } else if (products.searchProduct.status === 107) {
        this.setState({ isError: true, errMsg: I18n.t('alert.search') });
      }
    }
  }

  onSelectProductOption(index, value) {
    this.setState({ productOption: index })
  }

  selectCategory(item) {
    this.setState({ category: item });
  }

  onSearch() {
    const { searchProduct, token, user } = this.props;

    if (!this.state.coordinate || !this.state.radius) {
      this.setState({ isError: true })
      this.setState({ errMsg: I18n.t('post_video.select_address') })
      return;
    }

    this.setState({ loading: true });
    this.props.searchProduct(
      token.tokenInfo.token,
      {
        user_id: user.userInfo ? user.userInfo.user.customer_id : null,
        category_name: this.state.category,
        lat: this.state.coordinate.latitude,
        long: this.state.coordinate.longitude,
        radius: 50,
        product_type: this.state.productOption,
        min_price: this.state.minPrice,
        max_price: this.state.maxPrice,
        building_type: this.state.buildingType,
        period: this.state.period,
        room_type: this.state.roomType,
        furniture: this.state.furniture,
        street_size: this.state.streetSize
      }
    );
  }

  getAddress(addressArr) {
    if (addressArr) {
      const street = addressArr.street ? (addressArr.street + ', ') : ''
      const city = addressArr.city ? (addressArr.city + ', ') : ''
      const address =  street + city + addressArr.country

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
          title={I18n.t('alert.error')}
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
                    <Text style={[styles.input, styles.underline]}>{address}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.radius')}
                </Text>
                <TextInput
                  ref="radius"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('post_video.radius_ph')}
                  placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="numbers-and-punctuation"
                  value={this.state.radius}
                  onChangeText={text => this.setState({ radius: text })}
                />
              </View> */}

              <View style={styles.productOptionView}>
                <RadioGroup 
                  color='#7D7D7D' 
                  style={styles.radioGroup} 
                  thickness={2}
                  selectedIndex={0}
                  onSelect={(index, value) => this.onSelectProductOption(index, value)}
                >
                  <RadioButton value={I18n.t('post_video.sale')}>
                    <Text style={styles.textRadio}>{I18n.t('post_video.sale')}</Text>
                  </RadioButton>
                  <RadioButton value={I18n.t('post_video.rent')}>
                    <Text style={styles.textRadio}>{I18n.t('post_video.rent')}</Text>
                  </RadioButton>
                </RadioGroup>
              </View>

              {(category === 'building') && (
                <View style={styles.itemView}>
                  <DropdownComponent
                    selectItem={value => this.setState({ buildingType: value })}
                    item={BUILDING_TYPE_DATA[parseInt(this.state.buildingType)].value}
                    data={BUILDING_TYPE_DATA}
                  />
                </View>
              )}

              <View style={styles.priceView}>
                <View style={styles.priceBox}>
                  <TextInput
                    ref="maxPrice"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={I18n.t('post_video.max_price')}
                    placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                    textAlign="right"
                    style={styles.inputPrice}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numeric"
                    value={this.state.maxPrice}
                    onChangeText={text => this.setState({ maxPrice: text })}
                  />
                </View>
                <View style={styles.priceBox}>
                  <TextInput
                    ref="minPrice"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={I18n.t('post_video.min_price')}
                    placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                    textAlign="right"
                    style={styles.inputPrice}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numeric"
                    value={this.state.minPrice}
                    onChangeText={text => this.setState({ minPrice: text })}
                  />
                </View>
              </View>

              {(category === 'apartment') && (
                <View style={styles.itemView}>
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
                    <DropdownComponent
                      selectItem={value => this.setState({ roomType: value })}
                      item={APARTMENT_ROOM_TYPE[parseInt(this.state.roomType)].value}
                      data={APARTMENT_ROOM_TYPE}
                    />
                  </View>
                  <View style={styles.itemView}>
                    <CheckBox
                      label={I18n.t('post_video.furniture')}
                      labelBefore
                      checkboxStyle={{ width: 20 }}
                      labelStyle={{
                        color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
                        fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
                        marginBottom: 3,
                        marginRight: 20,
                        fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY
                      }}
                      onChange={checked => this.setState({ furniture: checked.checked })}
                    />
                  </View>
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
                      placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                      textAlign="right"
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      returnKeyType={'next'}
                      keyboardType="numeric"
                      value={this.state.streetSize}
                      onChangeText={text => this.setState({ streetSize: text }) }
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
            backdropColor='rgba(0, 0, 0, 0.2)'
            onBackdropPress={() => this.setState({ showProducts: false })}
          >
            <View style={styles.modal} >
              <ProductListPage
                page="search"
                category={this.state.category}
                allProduct={this.state.searchProductList}
                listWidth={COMMON_STYLES.SCREEN_SUB_WIDTH}
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
