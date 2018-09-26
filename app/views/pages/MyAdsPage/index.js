import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Video from 'react-native-video'
import Container from '@layout/Container'
import { styles } from './styles'
import LoadingSpinner from '@components/LoadingSpinner'
import FontAwesome, {Icons} from 'react-native-fontawesome'
import Icon from 'react-native-vector-icons/Feather'
import _ from 'lodash'
import I18n from '@i18n'
import { getAdsProducts } from '@redux/Product/actions'
import VideoComponent from '@components/VideoComponent'
import * as commonStyles from '@common/styles/commonStyles'
const listItemWidth = (commonStyles.screenWidth - commonStyles.padding * 2 - 15) / 2;

class MyAdsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      loading: false,
      products: []
    }
  }

  componentWillMount() {
    const {
      data,
      token,
      user,
      products,
      getAdsProducts,
    } = this.props

    this.setState({ loading: true })
    getAdsProducts(token.tokenInfo.token, { id: user.userInfo.user.customer_id })
  }

  componentWillReceiveProps( { products }) {
    if (this.props.products.loading === 'GET_ADS_PRODUCT_REQUEST' && products.loading === 'GET_ADS_PRODUCT_SUCCESS') {
      this.setState({ loading: false })
      const data = _.orderBy(products.myAdsProduct.ads, ['date_added'], ['desc'])
      this.setData(data)
    }
    if (products.loading === 'GET_ADS_PRODUCT_FAILED') {
      this.setState({ loading: false })
    }
  }

  setData = (products) => {
    this.setState({ loading: false })
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(products);
    this.setState({ dataSource, products })
  }

  onItemSelect(rowData, rowID) {
    Actions.ProductUpdate({ data: rowData });
  }

  _renderRow (rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity 
        activeOpacity={0.6}
        onPress={() => this.onItemSelect(rowData, rowID)}
      >
        <View style={styles.listItem}>
        
          <View style={styles.videoView}>
            <VideoComponent rowData={rowData} offsetX={listItemWidth / 2 - 5} offsetY={(listItemWidth - 40) / 2 - 10} />
          </View>

          <View style={styles.footerView}>
            <Text  style={styles.textTitle}>{rowData.name}</Text>
            <Text  style={styles.textPrice}>{rowData.price} {I18n.t('sar')}</Text>
            <View style={styles.viewWrapper}>
              <Text  style={styles.textViewCount}>{I18n.t('number_of_view')} {rowData.viewed}</Text>
              <FontAwesome style={styles.eye}>{Icons.eye}</FontAwesome>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
    const { dataSource, loading, products } = this.state

    return (
      <Container title={I18n.t('sidebar.my_ads')}>
        <LoadingSpinner visible={loading } />

        <View style={styles.container}>
          {products.length > 0 && dataSource
            ? <ListView
                ref='listview'
                dataSource={dataSource}
                renderRow={this._renderRow.bind(this)}
                enableEmptySections={true}
                renderSeparator={this._renderSeparator}
                contentContainerStyle={styles.listView}
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
  getAdsProducts: (token, data) => dispatch(getAdsProducts(token, data)),
})

MyAdsPage.propTypes = {
  getAdsProducts: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAdsPage)