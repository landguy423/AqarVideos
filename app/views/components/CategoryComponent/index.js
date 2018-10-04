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

import I18n from '@i18n';
import PropTypes from 'prop-types';
import { styles } from './styles';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import  { CATEGORY_ICON_LIST } from '@common/category';

export default class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'building',
    }
  }

  componentWillMount() {
    this.setState({ category: this.props.category })
  }

  onSelectCategory(item, index) {
    this.setState({category: item});
    this.props.selectCategory(item);

    // if (index == 6 || index == 3) {
    //   this.refs.categoryScroll.scrollToEnd();
    // }
    // if (index == 0 || index == 4) {
    //   this.refs.categoryScroll.scrollTo({x: 0, y: 0, animated: true});
    // }
  }

  render() {
    const { category } = this.state;
    return (
      <ScrollView 
        ref='categoryScroll'
        style={styles.categoryScrollView} 
        horizontal
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(width, height) => this.refs.categoryScroll.scrollTo({x: width - COMMON_STYLES.SCREEN_WIDTH})}
      >
        <View style={styles.categoryView}>

          <TouchableOpacity onPress={() => this.onSelectCategory('gallery', 4)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'gallery' && styles.categoryBack]}>
              {category === 'gallery'
                ? <Image source={CATEGORY_ICON_LIST['gallery_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['gallery']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'gallery' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.gallery')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('store', 6)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'store' && styles.categoryBack]}>
              {category === 'store'
                ? <Image source={CATEGORY_ICON_LIST['store_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['store']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'store' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.stores')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('factory', 6)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'factory' && styles.categoryBack]}>
              {category === 'factory'
                ? <Image source={CATEGORY_ICON_LIST['factory_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['factory']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'factory' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.factory')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('office_for_sale', 6)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'office_for_sale' && styles.categoryBack]}>
              {category === 'office_for_sale'
                ? <Image source={CATEGORY_ICON_LIST['office_for_sale_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['office_for_sale']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'office_for_sale' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.office_for_sale')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('firms', 6)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'firms' && styles.categoryBack]}>
              {category === 'firms'
                ? <Image source={CATEGORY_ICON_LIST['firms_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['firms']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'firms' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.firms')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('esteraha', 6)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'esteraha' && styles.categoryBack]}>
              {category === 'esteraha'
                ? <Image source={CATEGORY_ICON_LIST['esteraha_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['esteraha']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'esteraha' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.esteraha')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('chalet', 3)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'chalet' && styles.categoryBack]}>
              {category === 'chalet'
                ? <Image source={CATEGORY_ICON_LIST['chalet_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['chalet']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'chalet' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.chalet')}</Text>
            </View> 
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('apartment_owner', 6)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'apartment_owner' && styles.categoryBack]}>
              {category === 'apartment_owner'
                ? <Image source={CATEGORY_ICON_LIST['apartment_owner_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['apartment_owner']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'apartment_owner' ? styles.textCategorySelect : styles.textCategory}>
                {I18n.t('category.apartment_owner')}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('office', 3)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'office' && styles.categoryBack]}>
              {category === 'office'
                ? <Image source={CATEGORY_ICON_LIST['office_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['office']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'office' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.office')}</Text>
            </View> 
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('land', 5)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'land' && styles.categoryBack]}>
              {category === 'land'
                ? <Image source={CATEGORY_ICON_LIST['land_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['land']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'land' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.land')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('apartment', 2)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'apartment' && styles.categoryBack]}>
              {category === 'apartment'
                ? <Image source={CATEGORY_ICON_LIST['apartment_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['apartment']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'apartment' ? styles.textCategorySelect : styles.textCategory}>
                {I18n.t('category.apartment')}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('villa', 1)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'villa' && styles.categoryBack]}>
              {category === 'villa'
                ? <Image source={CATEGORY_ICON_LIST['villa_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['villa']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'villa' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.villa')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSelectCategory('building', 0)} activeOpacity={0.5}>
            <View style={[styles.btnCategory, category === 'building' && styles.categoryBack]}>
              {category === 'building'
                ? <Image source={CATEGORY_ICON_LIST['building_select']} style={styles.icon} resizeMode='contain' />
                : <Image source={CATEGORY_ICON_LIST['building']} style={styles.icon} resizeMode='contain' />
              }
              <Text style={category === 'building' ? styles.textCategorySelect : styles.textCategory}>{I18n.t('category.building')}</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    )
  }
}

CategoryComponent.defaultProps = {
  category: 'building',
}