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

import LoadingSpinner from '@components/LoadingSpinner';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryProduct: [],
    }
  }

  componentWillMount() {
    const { category, allProduct } = this.props

    const categoryProduct = filter(allProduct, item => item.category.toLowerCase() === category.toLowerCase())
    this.setState({
      categoryProduct,
    })
  }

  onItemSelect(rowData, rowID) {
    Actions.ProductDetail({ data: rowData });
  }

  _renderRow (rowData, sectionID, rowID, highlightRow) {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity 
          activeOpacity={0.6}
          onPress={() => this.onItemSelect(rowData, rowID)}
        >
          <View style={styles.videoView}>
            {(!!rowData.video_url && rowData.video_url.length > 0 && rowData.status === '1') ?
              <Video
                ref={(ref) => { this.player = ref }}
                source={{ uri: rowData.video_url }}
                style={styles.imageView}
                resizeMode='cover'
                autoplay={false}
                paused
              /> :
              <Icon name='video-off' style={styles.emptyVideo} />
            } 

            <View style={styles.subView}>
              <Text style={styles.textTitle}>{rowData.name}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <FontAwesome style={styles.favorite}>{rowData.status ? Icons.star : Icons.starO}</FontAwesome>

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
          contentContainerStyle={styles.listView}
          enableEmptySections
        />
      </View>
    );
  }
}

export default ProductListPage
