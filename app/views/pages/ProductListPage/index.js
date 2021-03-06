import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

import I18n from '@i18n';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Feather';
import VideoComponent from '@components/VideoComponent'
import * as COMMON_STYLES from '@common/styles/commonStyles';
import { PRICE_FORMAT } from '@common';
import { styles } from './styles';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryProduct: [],
    }
  }

  componentWillMount() {
    const { allProduct } = this.props
    this.setCateogryProduct(allProduct)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.allProduct !== nextProps.allProduct) {
      this.setCateogryProduct(nextProps.allProduct)
    }
  }

  setCateogryProduct(allProduct) {
    const { category, user } = this.props

    // let categoryProduct = [];
    // if (user.userLogin) {
    //   const { customer_id } = user.userInfo.user
    //   categoryProduct = _.filter(allProduct, item => item.category.toLowerCase() === category.toLowerCase() && item.customer_id !== customer_id)
    // } else {
    //   categoryProduct = _.filter(allProduct, item => item.category.toLowerCase() === category.toLowerCase())
    // }
    const categoryProduct = _.filter(allProduct, item => item.category.toLowerCase() === category.toLowerCase())
    const data = _.orderBy(categoryProduct, ['date_added'], ['desc'])

    this.setState({
      categoryProduct: data,
    })
  }

  onItemSelect(rowData, rowID) {
    this.props.closeModal();
    Actions.ProductDetail({ data: rowData });
  }

  _renderRow (rowData, sectionID, rowID, highlightRow) {
    const { user, itemWidth, page } = this.props
    return (
      <View style={styles.listItem}>
        <TouchableOpacity 
          activeOpacity={0.6}
          onPress={() => this.onItemSelect(rowData, rowID)}
        >
          <View style={styles.videoView}>
            {page === 'tab'
              ? <VideoComponent rowData={rowData} offsetX={COMMON_STYLES.SCREEN_WIDTH / 2 - 30} offsetY={60} size={50} full={true} />
              : <VideoComponent rowData={rowData} offsetX={COMMON_STYLES.SCREEN_SUB_WIDTH / 2 - 30} offsetY={60} size={50} full={true} />
            }

            <View style={styles.subView}>
              <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail">{rowData.name}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <View style={styles.favoriteView}>
            {user.userLogin && (
              <FontAwesome style={styles.favorite}>{rowData.favorite ? Icons.star : Icons.starO}</FontAwesome>
            )}
          </View>

          <View style={styles.footerRightView}>
            {rowData.price.length > 0 && (
              <Text style={styles.textPrice}>{`${PRICE_FORMAT(rowData.price)} ${I18n.t('sar')}`}</Text>
            )}

            <View style={styles.viewWrapper}>
              <Text  style={styles.textViewCount}>{`${I18n.t('number_of_view')} ${rowData.viewed}`}</Text>
              <FontAwesome style={styles.eye}>{Icons.eye}</FontAwesome>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
          key={`${sectionID}-${rowID}`}
          style={{ height: 15, backgroundColor: 'transparent', flex:1}}
      />
    );
  }

  render() {
    const { categoryProduct } = this.state

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(categoryProduct);

    return (
      <View style={styles.container}>
        {categoryProduct.length > 0
        ? <ListView
            ref='listview'
            dataSource={dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeparator}
            contentContainerStyle={[styles.listView, { width: this.props.listWidth }]}
            enableEmptySections
          />
        : <Text style={styles.emptyText}>{I18n.t('alert.search')}</Text>
        }
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

ProductListPage.defaultProps = {
  listWidth: COMMON_STYLES.SCREEN_WIDTH,
  page: 'tab',
  closeModal: () => {}
}

ProductListPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  listWidth: PropTypes.number,
  page: PropTypes.string,
  closeModal: PropTypes.func
}

export default connect(
  mapStateToProps,
  null,
)(ProductListPage)
