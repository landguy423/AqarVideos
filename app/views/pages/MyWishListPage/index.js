import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';

import {
  View,
  Text,
  ListView,
  TouchableOpacity
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import LoadingSpinner from '@components/LoadingSpinner';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import _ from 'lodash'
import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import { getWishlistProducts, deleteWishlistProduct } from '@redux/Product/actions';
import VideoComponent from '@components/VideoComponent'
import { PRICE_FORMAT } from '@common';

class MyWishListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      listData: [],
      loading: false,
    }
  }

  componentWillMount() {
    const {
      data,
      token,
      user,
      products,
      getWishlistProducts,
    } = this.props

    this.setState({ loading: true })
    getWishlistProducts(token.tokenInfo.token, { user_id: user.userInfo.user.customer_id })
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps

    if ((this.props.products.loading === 'GET_WISHLIST_PRODUCT_REQUEST' && products.loading === 'GET_WISHLIST_PRODUCT_SUCCESS') ||
        (this.props.products.loading === 'ADD_VIEW_COUNT_REQUEST' && products.loading === 'ADD_VIEW_COUNT_SUCCESS')) {
      this.setState({ loading: false })
      if (products.wishlistProduct) {
        const data = _.orderBy(products.wishlistProduct, ['date_added'], ['desc'])

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows(data);
        this.setState({
          dataSource,
          listData: data,
        })
      }
    }
    if (this.props.products.loading === 'GET_WISHLIST_PRODUCT_REQUEST' && products.loading === 'GET_WISHLIST_PRODUCT_FAILED') {
      this.setState({ loading: false })
    }
  }

  onItemSelect(rowData, rowID) {
    Actions.ProductDetail({ data: rowData });
  }

  onItemDelete(rowData, secId, rowId, rowMap) {
    const {
      token,
      user,
      deleteWishlistProduct,
    } = this.props
    const { listData } = this.state;

    if (rowMap[`${secId}${rowId}`]) {
			rowMap[`${secId}${rowId}`].closeRow();
		}

    let data = listData.splice(rowId, 1);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(listData);
    this.setState({
      dataSource,
      listData,
    })

    deleteWishlistProduct(
      token.tokenInfo.token,
      {
        user_id: user.userInfo.user.customer_id,
        product_id: rowData.product_id,
      }
    )
  }

  render() {
    const { dataSource, listData, loading } = this.state

    return (
      <Container title={I18n.t('sidebar.my_wishlist')}>
        <LoadingSpinner visible={loading } />
        
        <View style={styles.container}>
          {listData.length > 0 && dataSource
            ? <SwipeListView
                dataSource={dataSource}
                enableEmptySections={true}
                renderRow={ (rowData, secId, rowId, rowMap) => (
                  <SwipeRow
                    disableRightSwipe
                    rightOpenValue={-50}
                  >
                    <View style={styles.listRightView}>
                      <TouchableOpacity
                        style={styles.btnDeleteView}
                        activeOpacity={0.9}
                        onPress={() => this.onItemDelete(rowData, secId, rowId, rowMap)}
                      >
                        <FontAwesome style={styles.iconDelete}>{Icons.trash}</FontAwesome>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.listStyle}>
                      <TouchableOpacity
                        style={styles.btnDeleteView}
                        activeOpacity={0.9}
                        onPress={() => this.onItemSelect(rowData, rowId)}
                      >
                        <View style={styles.listItem}>
                          <View style={styles.videoView}>
                            <VideoComponent rowData={rowData} />
                          </View>
                          <View style={styles.footerView}>
                            <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail">{rowData.name}</Text>
                            <View style={styles.bottomWrapper}> 
                              <Text  style={styles.textPrice}>{PRICE_FORMAT(rowData.price)} {I18n.t('sar')}</Text>
                              <View style={styles.viewWrapper}>
                                <Text  style={styles.textViewCount}>{I18n.t('number_of_view')} {rowData.viewed}</Text>
                                <FontAwesome style={styles.eye}>{Icons.eye}</FontAwesome>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </SwipeRow>
                )}
              />
            : !loading && <Text style={styles.noPackgeText}>{I18n.t('alert.search')}</Text>
          }
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
  getWishlistProducts: (token, data) => dispatch(getWishlistProducts(token, data)),
  deleteWishlistProduct: (token, data) => dispatch(deleteWishlistProduct(token, data))
})

MyWishListPage.propTypes = {
  getWishlistProducts: PropTypes.func.isRequired,
  deleteWishlistProduct: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyWishListPage)