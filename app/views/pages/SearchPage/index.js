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
  TextInput,
} from 'react-native';

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
import ModalShare from '@components/ModalShare';
import { RadioGroup, RadioButton } from '@components/RadioButtonGroup';
import DropdownComponent from '@components/DropdownComponent';
import CategoryComponent from '@components/CategoryComponent';
import AutoSuggestComponent from '@components/AutoSuggestComponent';
import LoadingSpinner from '@components/LoadingSpinner';
import PostProductLocationPage from '../PostProductLocationPage';

import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { getRegions } from '@redux/Region/actions';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      category: 'building',
      title: '',
      description: '',
      price: '',
      productOption: 'Sale',
      period: '',
      buildingType: '',
      videoUri: null,
      minSquareMeter: '',
      address: I18n.t('post_video.select_address'),
      page: 'post',
      coordinate: null,
    }
    this.player = null;
  }

  componentWillMount() {
    // if (this.props.tokenInfo) {
    //   this.setState({ loading: true })
    //   this.props.getRegions(this.props.tokenInfo.token)
    // }
  }

  componentWillReceiveProps(nextProps) {

  }

  onSelectProductOption(index, value) {
    this.setState({productOption: value})
  }

  selectCategory(item) {
    this.setState({category: item});
  }

  onSearch() {
    
  }

  getAddress(addressArr) {
    const address = addressArr.street + ', ' + addressArr.city + ', ' + addressArr.country;
    this.setState({ address })
    this.setState({ coordinate: addressArr.coordinate })
  }

  changePage(page) {
    this.setState({ page })
  }

  render() {
    // const {videoData} = this.props;
    const {
      page,
      coordinate,
      address,
      category, 
      videoUri,
      loading,
    } = this.state;  

    const periodData = [
      { value: 'Daily' },
      { value: 'Monthly' },
      { value: 'Yearly' }
    ];

    const buildingTypeData = [
      { value: 'Residential' },
      { value: 'Commercial' }
    ];

    const apartmentRoomType = [
      { value: 'Singular' },
      { value: 'Familiar' }
    ];

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
        <LoadingSpinner visible={loading } />

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <KeyboardScrollView>
              <CategoryComponent category={item => this.selectCategory(item)} />

              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {I18n.t('post_video.location')}
                </Text>
                <TouchableOpacity onPress={() => this.changePage('map')}>
                  <View style={styles.addressView}>
                    <Text style={styles.input}>{this.state.address}</Text>
                  </View>
                </TouchableOpacity>
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

              {(category == 'building' || category == 'land') && (
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.type')}
                  </Text>
                  <DropdownComponent
                    selectItem={value => this.setState({buildingType: value})}
                    item={this.state.buildingType} data={buildingTypeData}
                  />
                </View>
              )}

              <View style={styles.squareMeterView}>
                <View style={styles.squareMeterBox}>
                  <TextInput
                    ref="squareMeter"
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline
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
                    ref="squareMeter"
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline
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
                    multiline
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
                    multiline
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
                    selectItem={value => this.setState({period: value})}
                    item={this.state.period} data={periodData}
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
                      selectItem={value => this.setState({roomType: value})}
                      item={this.state.roomType} data={apartmentRoomType}
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
                      value={this.state.roomCount}
                      onChangeText={text => this.setState({ roomCount: text }) }
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
                      onChange={(checked) => this.setState({ownership: checked})}
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

            </KeyboardScrollView>
          </View>

          <TouchableOpacity onPress={() => this.onSearch()} activeOpacity={0.5}>
            <View style={styles.searchBtnView}>
              <Text style={styles.searchBtn}>{I18n.t('search')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

export default connect(state => ({
  tokenInfo: state.token.tokenInfo,
  regionData: state.regions.regionData
}),{ getRegions })(SearchPage);
