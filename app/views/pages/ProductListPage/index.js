import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { filter } from 'lodash';
import Video from 'react-native-video';

import I18n from '@i18n';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import LoadingSpinner from '@components/LoadingSpinner';
import VideoComponent from '@components/VideoComponent'

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryProduct: [],
    }
  }

  componentWillMount() {
    const { category, allProduct, user } = this.props

    let categoryProduct = [];
    if (user.userLogin) {
      const { customer_id } = user.userInfo.user
      categoryProduct = filter(allProduct, item => item.category.toLowerCase() === category.toLowerCase() && item.customer_id !== customer_id)
    } else {
      categoryProduct = filter(allProduct, item => item.category.toLowerCase() === category.toLowerCase())
    }

    this.setState({
      categoryProduct,
    })
  }

  onItemSelect(rowData, rowID) {
    this.props.closeModal();
    Actions.ProductDetail({ data: rowData });
  }

  _renderRow (rowData, sectionID, rowID, highlightRow) {
    const { user, itemWidth } = this.props
    return (
      <View style={styles.listItem}>
        <TouchableOpacity 
          activeOpacity={0.6}
          onPress={() => this.onItemSelect(rowData, rowID)}
        >
          <View style={styles.videoView}>
            <VideoComponent rowData={rowData} offsetX={commonStyles.screenWidth / 2 - 30} offsetY={60} size={50} full={true} />

            <View style={styles.subView}>
              <Text style={styles.textTitle}>{rowData.name}</Text>
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
              <Text style={styles.textPrice}>{`${rowData.price} ${I18n.t('sar')}`}</Text>
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
        <ListView
          ref='listview'
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          contentContainerStyle={[styles.listView, { width: this.props.listWidth }]}
          enableEmptySections
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

ProductListPage.defaultProps = {
  listWidth: commonStyles.screenWidth,
  closeModal: () => {}
}

ProductListPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  listWidth: PropTypes.number,
  closeModal: PropTypes.func
}

export default connect(
  mapStateToProps,
  null,
)(ProductListPage)
