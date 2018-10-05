import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '@components/LoadingSpinner';
import CountDown from 'react-native-countdown-component';

import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { getMyPackage } from '@redux/Package/actions';

class MyPackagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isMyPackage: false,
      myPackageInfo: {}
    }
  }

  componentWillMount() {
    const { user, token, packages } = this.props;

    if (packages.myPackageInfo.status === 200) {
      this.setState({ isMyPackage: true, myPackageInfo: packages.myPackageInfo.package });
    } else {
      this.setState({ isMyPackage: false });
    }
  }

  render() {
    const { loading, isMyPackage, myPackageInfo } = this.state

    return (
      <Container title={I18n.t('sidebar.my_packages')}>
        <LoadingSpinner visible={loading } />

        {isMyPackage ?
          <View style={styles.container}>
            <View style={styles.packageView}>
              <Text style={styles.title}>{myPackageInfo.detail.title}</Text>
            </View>

            <View style={styles.countdownView}>
              <CountDown
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 25,
                  borderRadius: 5,
                  backgroundColor: '#eee'
                }}
                digitBgColor={COMMON_COLORS.PINK_COLOR}
                digitTxtColor="#fff"
                timeTxtColor="#888"
                until={myPackageInfo.remaining_days}
                size={28}
              />
            </View>
          </View> :
          <View style={styles.emptyContainer}>
            {!loading && (
              <Text style={styles.noPackgeText}>{I18n.t('packages.empty_package')}</Text>
            )}
          </View>
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ user, token, packages }) => ({
  user,
  token,
  packages
})

const mapDispatchToProps = dispatch => ({
  getMyPackage: (token, data) => dispatch(getMyPackage(token, data)),
})

MyPackagePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  packages: PropTypes.objectOf(PropTypes.any),
  getMyPackage: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPackagePage)