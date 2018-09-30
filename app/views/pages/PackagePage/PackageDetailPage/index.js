import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import KeyboardScrollView from '@components/KeyboardView'
import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';
import I18n from '@i18n'
import Container from '@layout/Container'
import { styles } from './styles'
import * as commonStyles from '@common/styles/commonStyles'
import * as commonColors from '@common/styles/commonColors'
import { Actions } from 'react-native-router-flux'
import { getTerlWebUrl } from '@redux/Package/actions'
const img_detail = require('@common/assets/images/my_message/picture.png')

class PackageDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      loading: false,
      webUrlInfo: {},
      errorFlag: false,
      errorText: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { packages } = nextProps;

    if (this.props.packages.status === 'GET_WEBURL_REQUEST' && packages.status === 'GET_WEBURL_SUCCESS') {
      this.setState({ loading: false }, () => {
        if (packages.webUrlInfo.status === 200) {
          if (packages.webUrlInfo.message === 'Trial is active') {
            Actions.Package()
          } else {
            Actions.PaymentWebPage({ url: packages.webUrlInfo.order.url })
          }
        } else if (packages.webUrlInfo.status === 107) {
          this.setState({
            errorFlag: true,
            errorText: I18n.t('packages.no_url')
          });
        }
      });
    }
    if (this.props.packages.status === 'GET_WEBURL_REQUEST' && packages.status === 'GET_WEBURL_FAILED') {
      this.setState({
        loading: false,
        errorFlag: true,
        errorText: I18n.t('packages.no_url')
      });
    }
  }

  onSelect = (index, value) => {
    this.setState({ selectedIndex: index })
  }

  onTry() {
    const { selectedIndex } = this.state
    const { data, token, user, getTerlWebUrl } = this.props
    const { customer_id } = user.userInfo.user

    if (selectedIndex === 0) {
      // this.setState({ loading: true });
      getTerlWebUrl(token.tokenInfo.token, { user_id: customer_id, package_id: data.package_id });
    } else {
      Actions.PackageDetailBank({ data: this.props.data });
    }
  }

  render() {
    const { data, packages } = this.props

    return (
      <Container title={data.detail['1'].title} type='detail'>

        <LoadingSpinner visible={this.state.loading } />

        <CustomAlert 
          title={I18n.t('alert.error')}
          message={this.state.errorText}
          visible={this.state.errorFlag}
          closeAlert={() => this.setState({ errorFlag: false })}
        />

        <View style={styles.container}>
          <Image source={img_detail} style={styles.thumbnail} />

          <View style={styles.fieldContainer}>
            <KeyboardScrollView>
              <View style={styles.detailView}>
                <Text style={styles.description}>{data.detail['1'].description}</Text>
              </View>
            </KeyboardScrollView>
          </View>

          {(!packages.isPaidUser || (packages.isPaidUser && packages.myPackageInfo && packages.myPackageInfo.package.price === '$0.00'))
            && data.price !== '$0.00' && (
            <View style={styles.radioButtonView}>
              <RadioGroup
                highlightColor="transparent"
                color="#999"
                activeColor="#88AC40"
                selectedIndex={0}
                onSelect={(index, value) => this.onSelect(index, value)}
              >
                <RadioButton value={'MasterCard'}>
                  <Text>{I18n.t('payment_type.visa')}</Text>
                </RadioButton>
                <RadioButton value={'Bank'}>
                  <Text>{I18n.t('payment_type.bank')}</Text>
                </RadioButton>
              </RadioGroup>
            </View>
          )}

          {(!packages.isPaidUser || (packages.isPaidUser && packages.myPackageInfo && packages.myPackageInfo.package.price === '$0.00' && data.price !== '$0.00')) && (
            <View style={styles.btnView}>
              <TouchableOpacity onPress={() => this.onTry()} activeOpacity={0.5}>
                <View style={styles.btnWrapper}>
                  <Text style={styles.btnText}>{I18n.t('packages.try')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

        </View>
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
  getTerlWebUrl: (token, data) => dispatch(getTerlWebUrl(token, data))
})

PackageDetailPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  packages: PropTypes.objectOf(PropTypes.any),
  getTerlWebUrl: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackageDetailPage)
