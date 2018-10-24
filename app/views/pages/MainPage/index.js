import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Container from '@layout/Container';
import TabView from '@layout/TabView';
import ButtonPlusComponent from '@components/ButtonPlusComponent';
import MapButtonListComponent from '@components/MapButtonListComponent';
import I18n from '@i18n';
import { styles } from './styles';

import { connect } from 'react-redux';
import { getToken } from '@redux/Token/actions';
import { changeMenu, setLoginStatus } from '@redux/User/actions';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isBtnList: false,
      tabIndex: 11,
      btnItem: null,
      btnStatus: 'map',
    }
  }

  componentWillMount() {
    const { tokenInfo, userLogin } = this.props;

    //Check the token
    if (!tokenInfo || tokenInfo === undefined) {
      this.props.getToken();
    }

    //Auto login
    if (!userLogin) {
      AsyncStorage.getItem('loginStatus').then((value) => {
        if (value === 'true') {
          this.props.changeMenu(0);
          AsyncStorage.getItem('userInfo').then((value) => {
            this.props.setLoginStatus(JSON.parse(value));
          })
        }
      }).done();
    }
  }

  onSelectItem(index) {
    const { btnStatus, isBtnList } = this.state;

    switch(index) {
      case 'plus':
        this.setState({ isBtnList: !isBtnList });
        break;
      case 'list':
        if (btnStatus === 'map')
          this.setState({ btnStatus: 'list' });
        else
          this.setState({ btnStatus: 'map' });
        break;
      case 'mail':
        break;
      case 'video':
        break;
      default:
        break;
    }
    this.setState({ isBtnList: !isBtnList });
  }

  changeTab(index) {
    this.setState({ tabIndex: index })
    // this.setState({ btnStatus: 'map' })
  }

  render() {
    const { tokenInfo, allProduct } = this.props
    const { tabIndex, isBtnList, btnItem, btnStatus } = this.state;
    const title = btnStatus === 'list' ? I18n.t('main.list') : I18n.t('main.map');
    // console.log('ALL_PRODUCTS: ', allProduct)

    return (
      <Container title={title}>
        <View style={styles.container}>
          {tokenInfo && (
            <TabView btnStatus={btnStatus} changeTab={index => this.changeTab(index)}/>
          )}

          {isBtnList && (
            <MapButtonListComponent onSelectItem={value => this.onSelectItem(value)} btnStatus={btnStatus} />
          )}

          {tokenInfo && allProduct && (
            <ButtonPlusComponent isBtnList={isBtnList} btnStatus={btnStatus} onSelectItem={value => this.onSelectItem(value) }/>
          )}
        </View>
      </Container>
    );
  }
}


export default connect(state => ({
  tokenInfo: state.token.tokenInfo,
  userLogin: state.user.userLogin,
  allProduct: state.products.allProduct
}),{ getToken, changeMenu, setLoginStatus })(MainPage);