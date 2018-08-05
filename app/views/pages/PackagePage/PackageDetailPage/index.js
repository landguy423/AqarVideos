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
// import * as TELR_PAYMENT from '@common/payment_telr/telr_payment'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import KeyboardScrollView from '@components/KeyboardView'
const img_detail = require('@common/assets/images/my_message/picture.png')

import I18n from '@i18n'
import Container from '@layout/Container'
import { styles } from './styles'
import * as commonStyles from '@common/styles/commonStyles'
import * as commonColors from '@common/styles/commonColors'
import { Actions } from 'react-native-router-flux'
import { getTerlWebUrl } from '@redux/Package/actions'

class PackageDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

  onSelect = (index, value) => {
    this.setState({ selectedIndex: index })
  }

  onTry() {
    const { selectedIndex } = this.state
    const { data, token, user } = this.props
    const { customer_id } = user.userInfo.user

    if (selectedIndex === 0) {
      getTerlWebUrl(token.tokenInfo.token, { user_id: customer_id, package_id: data.package_id });
    } else {
      Actions.PackageDetailBank({ data: this.props.data });
    }
  }

  render() {
    const { data } = this.props

    return (
      <Container title={data.detail['1'].title} type='detail'>
        <View style={styles.container}>
          <Image source={img_detail} style={styles.thumbnail} />

          <View style={styles.fieldContainer}>
            <KeyboardScrollView>
              <View style={styles.detailView}>
                <Text style={styles.description}>{data.detail['1'].description}</Text>
              </View>
            </KeyboardScrollView>
          </View>

          <View style={styles.radioButtonView}>
            <RadioGroup
              highlightColor="transparent"
              color="#999"
              activeColor="#88AC40"
              selectedIndex={0}
              onSelect={(index, value) => this.onSelect(index, value)}
            >
              <RadioButton value={'MasterCard'}>
                <Text>Master Card</Text>
              </RadioButton>
              <RadioButton value={'Bank'}>
                <Text>Bank</Text>
              </RadioButton>
            </RadioGroup>
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity onPress={() => this.onTry()} activeOpacity={0.5}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>{I18n.t('packages.try')}</Text>
              </View>
            </TouchableOpacity>
          </View>

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
  getTerlWebUrl: token => dispatch(getTerlWebUrl(token))
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
