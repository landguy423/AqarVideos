import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
// import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { RadioGroup, RadioButton } from '@components/RadioButtonGroup';
import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';
import I18n from '@i18n'
import Container from '@layout/Container'
import { styles } from './styles'
import * as COMMON_STYLES from '@common/styles/commonStyles'
import * as COMMON_COLORS from '@common/styles/commonColors'
import { getTerlWebUrl } from '@redux/Package/actions'
const IMG_PACKAGE = require('@common/assets/images/my_message/picture.png')
const IMG_VISA = require('@common/assets/images/package/visa.png')
const IMG_BANK_SAMB= require('@common/assets/images/package/samba.jpg')
const IMG_BANK_RAJHI = require('@common/assets/images/package/rajhi.png')

class PackageDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      loading: false,
      webUrlInfo: {},
      isError: false,
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
            isError: true,
            errorText: I18n.t('packages.no_url')
          });
        }
      });
    }

    if (this.props.packages.status === 'GET_WEBURL_REQUEST' && packages.status === 'GET_WEBURL_FAILED') {
      this.setState({
        loading: false,
        isError: true,
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
      this.setState({ loading: true });
      getTerlWebUrl(token.tokenInfo.token, { user_id: customer_id, package_id: data.package_id });
    } else {
      Actions.PackageDetailBank({ data: this.props.data });
    }
  }

  render() {
    const { data, packages } = this.props

    return (
      <Container title={`${data.duration}${I18n.t('packages.days')}`} type='detail'>

        <LoadingSpinner visible={this.state.loading } />

        <CustomAlert 
          title={I18n.t('alert.error')}
          message={this.state.errorText}
          visible={this.state.isError}
          closeAlert={() => this.setState({ isError: false })}
        />

        <View style={styles.container}>
          <View style={styles.topView}>
            <Image source={IMG_PACKAGE} style={styles.thumbnail} />

            <View style={styles.titleView}>
              <Text style={styles.title}>{data.duration}{I18n.t('packages.days')}</Text>
              {data.price === '$0.00' && (
                <Text style={styles.trialTitle}>{I18n.t('packages.free_trial')}</Text>
              )}
            </View>
          </View>
          
          <View style={styles.detailView}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.description}>
                {data.detail['1'].description}
              </Text>
            </ScrollView>
          </View>

          {(!packages.isPaidUser || (packages.isPaidUser && packages.myPackageInfo && packages.myPackageInfo.package.price === '$0.00'))
            && data.price !== '$0.00' && (
            <View style={styles.radioButtonView}>
              <RadioGroup 
                color='#7D7D7D' 
                style={styles.radioGroup}
                thickness={2}
                selectedIndex={0}
                onSelect={(index, value) => this.onSelect(index, value)}
              >
                <RadioButton value="MasterCard">
                  <View style={styles.radioItem}>
                    <Text style={styles.radioText}>{I18n.t('payment_type.visa')}</Text>
                    <Image source={IMG_VISA} style={styles.visaImage} />
                  </View>
                </RadioButton>
                <RadioButton value="Bank">
                  <View style={styles.radioItem}>
                    <Text style={styles.radioText}>{I18n.t('payment_type.bank')}</Text>
                    <View style={styles.bankImageView}>
                      <Image source={IMG_BANK_SAMB} style={styles.bankImage} />
                      <Image source={IMG_BANK_RAJHI} style={styles.bankImage} />
                    </View>
                  </View>
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
