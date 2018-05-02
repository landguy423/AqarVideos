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
import { Actions } from 'react-native-router-flux';
import LoadingSpinner from '@components/LoadingSpinner';
import PercentageCircle from 'react-native-percentage-circle';
import CountDown from 'react-native-countdown-component';

import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { getPackages } from '@redux/Package/actions';

class MyPackagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  onRenew() {
    // Actions.MyPackageDetail({data: rowData});
  }

  render() {
    const { loading } = this.state

    return (
      <Container title={I18n.t('sidebar.my_packages')}>
        <LoadingSpinner visible={loading } />

        <View style={styles.container}>

          <View style={styles.packageView}>
            <Text style={styles.title}>365</Text>
          </View>

          <View style={styles.countdownView}>
            <CountDown
              style={{
                paddingVertical: 15,
                paddingHorizontal: 25,
                borderRadius: 5,
                backgroundColor: '#eee'
              }}
              digitBgColor={commonColors.pinkColor}
              digitTxtColor="#fff"
              timeTxtColor="#888"
              until={99000}
              size={28}
            />
          </View>

        </View>
      </Container>
    );
  }
}

export default MyPackagePage;
