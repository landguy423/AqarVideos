import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';

import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';

const icon_close = require('@common/assets/images/product_detail/close.png');
const img_detail = require('@common/assets/images/my_message/picture.png');

export default class MyPackageDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false,
      refreshing: false,
      isSubscribed: true,
      leftDays: 20,
    }
  }

  onTry() {
    this.setState({isSuccess : true});
  }

  onRefresh() {
    this.setState({ refreshing: false });
  }

  render() {
    const {data} = this.props;

    const refreshControl = (
      <RefreshControl onRefresh={() => this.onRefresh()} refreshing={this.state.refreshing} />
    );

    if (this.state.isSuccess) {
      return (
        <Container title={data.detail['1'].title} type='detail'>
          <View style={styles.container}>
            <View style={styles.successTextWrapper}>
              <Text style={styles.textSuccess}>{I18n.t('packages.congratulation')} <Text style={[styles.textSuccess, styles.bold]}>{data.duration + I18n.t('packages.days_free')}</Text> {I18n.t('packages.trial_version')}</Text>
            </View>
            <Image source={icon_close} style={styles.imgClose} />
          </View>
        </Container>
      )
    }
    else {
      return (
        <Container title={data.detail['1'].title} type='detail'>
          <View style={styles.container}>
            <View style={styles.thumbnailView}>
              <Image source={img_detail} style={styles.thumbnail} />
              <View style={styles.titleView}>
                <Text style={styles.remainDay}>تاريخ البدء {data.detail['1']['start_date']}</Text>
                <Text style={styles.remainDay}>تاريخ الانتهاء {data.detail['1']['end_date']}</Text>
                {this.state.isSubscribed && (
                  <Text style={styles.remainDay}>يتم ترك {data.duration} يوما</Text>
                )}
                <Text style={styles.titleDesc}>{data.price}</Text>
              </View>
            </View>
            <View style={styles.description}>
              <ScrollView style={styles.descriptionScrollView} refreshControl={refreshControl}>
                <Text style={styles.textDescription}>{data.detail['1'].description}</Text>
              </ScrollView>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity onPress={() => this.onTry()} activeOpacity={0.5}>
                <View style={styles.btnWrapper}>
                  <Text style={styles.btnText}>{this.state.isSubscribed ? I18n.t('packages.extend') : I18n.t('packages.try')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      );
    }
  }
}