import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import KeyboardScrollView from '@components/KeyboardView';
import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';
import { getBankDetail, sendBankDetail } from '@redux/Package/actions'
import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import * as COMMON_COLORS from '@common/styles/commonColors';
const img_detail = require('@common/assets/images/my_message/picture.png')

class PackageDetailBankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankInfo: [],
      bankData: {},
      loading: false,
      sendBankResult: null,
      selectIndex: 1
    }
  }

  componentWillMount() {
    const { token } = this.props
    this.setState({ loading: true })
    this.props.getBankDetail(token.tokenInfo.token)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.packages.status === 'GET_BANK_DETAIL_REQUEST' && nextProps.packages.status === 'GET_BANK_DETAIL_SUCCESS') {
      const { bankInfo } = nextProps.packages
      this.setState({ loading: false })
      this.setState({ bankInfo, bankData: bankInfo.length > 0 ? bankInfo[this.state.selectIndex] : {} })
    }

    if (this.props.packages.status === 'SEND_BANK_DETAIL_REQUEST' && nextProps.packages.status === 'SEND_BANK_DETAIL_SUCCESS') {
      this.setState({
        loading: false,
        isSendResult: true,
        sendBankResult: nextProps.packages.sendBankResult
      })
    }

    if (nextProps.packages.status === 'GET_BANK_DETAIL_FAILED' || nextProps.packages.status === 'SEND_BANK_DETAIL_FAILED') {
      this.setState({ loading: false })
    }
  }

  onTry = () => {
    const { user, token } = this.props
    const { bankData: { bank_id } } = this.state
    const user_id = user.userInfo.user.customer_id
    const param = {
      user_id,
      bank_id
    }

    this.setState({ loading: true })
    this.props.sendBankDetail(token.tokenInfo.token, param)
  }

  onChange = (index) => {
    const { bankInfo } = this.state
		this.setState({ selectIndex: index, bankData: bankInfo[index] });
  }

  closeSendResultModal = () => {
    this.setState({ isSendResult: false })
    Actions.Package()
  }

  render() {
    const { data } = this.props
    const { bankInfo, bankData, sendBankResult, selectIndex } = this.state

    
    return (
      <Container title={data.detail['1'].title} type='detail'>
        <View style={styles.container}>
          <LoadingSpinner visible={this.state.loading } />

          <Image source={img_detail} style={styles.thumbnail} />
          
          <View style={styles.logoContainer}>
            {bankInfo.map((item, index) => (
              <TouchableOpacity
                key={index} onPress={() => this.onChange(index)}
                style={[styles.logoView, index === selectIndex ? { borderColor: COMMON_COLORS.GREEN_COLOR } : { borderColor: '#e2e2e2' }]}
                activeOpacity={0.8}
              >
                <Image source={{ uri: item.image }} style={styles.logo} />
              </TouchableOpacity>
            ))}
          </View>

          {!_.isEmpty(bankData) && (
            <View style={styles.fieldContainer}>
              <KeyboardScrollView>
                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('packages.company_name')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {bankData.company_name}
                    </Text>
                  </View>
                  
                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('packages.bank_number')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {bankData.iban}
                    </Text>
                  </View>

                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('packages.account_number')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {bankData.account_no}
                    </Text>
                  </View>

                  <View style={styles.titleView}>
                    <Text style={styles.textTitle}>
                      {I18n.t('post_video.location')}
                    </Text>
                    <Text style={styles.textDescription}>
                      {bankData.address}
                    </Text>
                  </View>
              </KeyboardScrollView>
            </View>
          )}

          <View style={styles.btnView}>
            <TouchableOpacity onPress={() => this.onTry()} activeOpacity={0.5}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>{I18n.t('packages.try')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {sendBankResult && (
          <CustomAlert 
            title={sendBankResult.status === 200 ? I18n.t('alert.success') : I18n.t('alert.error')}
            message={sendBankResult.status === 200 ? I18n.t('alert.bank_success') : I18n.t('alert.bank_failed')} 
            visible={this.state.isSendResult} 
            closeAlert={() => this.closeSendResultModal() }
          />
        )}
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
  getBankDetail: (token) => dispatch(getBankDetail(token)),
  sendBankDetail: (token, data) => dispatch(sendBankDetail(token, data))
})

PackageDetailBankPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  packages: PropTypes.objectOf(PropTypes.any),
  getBankDetail: PropTypes.func.isRequired,
  sendBankDetail: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackageDetailBankPage)
