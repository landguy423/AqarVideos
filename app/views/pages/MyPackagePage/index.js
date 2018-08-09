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

import PropTypes from 'prop-types';
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
import { getMyPackage } from '@redux/Package/actions';

class MyPackagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isMyPackage: false,
    }
  }

  componentWillMount() {
    const { user, token, getMyPackage } = this.props;

    this.setState({ loading: true })
    getMyPackage(
      token.tokenInfo.token,
      {
        user_id: user.userInfo.user.customer_id,
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    const { packages } = nextProps;

    if (this.props.packages.status === 'GET_MY_PACKAGE_REQUEST' && packages.status === 'GET_MY_PACKAGE_SUCCESS') {
      console.log('GET_MY_PACKAGE: ', packages.myPackageInfo);
      this.setState({ loading: false })
      if (packages.myPackageInfo.status === 200) {
        this.setState({ isMyPackage: true });
        // this.setState({ data: package.myPackageInfo });
      } else if (packages.myPackageInfo.status === 107) {
        this.setState({ isMyPackage: false });
      }
    }
  }

  onRenew() {
    // Actions.MyPackageDetail({data: rowData});
  }

  render() {
    const { loading, isMyPackage } = this.state

    return (
      <Container title={I18n.t('sidebar.my_packages')}>
        <LoadingSpinner visible={loading } />

        {isMyPackage ?
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
          </View> :
          <View style={styles.container}>
            {!loading && (
              <Text>There is no package available</Text>
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