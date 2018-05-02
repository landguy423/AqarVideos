'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ListView,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import I18n from '@i18n';
import { styles } from './styles';
import { userSignOut, changeMenu } from '@redux/User/actions';

const icon_login = require('@common/assets/images/menu/login_signup.png');
const icon_offer = require('@common/assets/images/menu/special_offer.png');
const icon_package = require('@common/assets/images/menu/package.png');
const icon_support = require('@common/assets/images/menu/advertising_support.png');
const icon_area = require('@common/assets/images/menu/area.png');
const icon_message = require('@common/assets/images/menu/messages.png');
const icon_location = require('@common/assets/images/menu/my_location.png');
const icon_myad = require('@common/assets/images/menu/my_ads.png');
const icon_newad = require('@common/assets/images/menu/post_new_ad.png');
const icon_signout = require('@common/assets/images/menu/sign_out.png');
const icon_pen = require('@common/assets/images/menu/pen.png');
const icon_wishlist = require('@common/assets/images/menu/my_wishlist.png');

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {userLogin} = this.props;
    this.setState({userLogin: userLogin});
  }

  onItemSelect(data, rowID) {
    if (this.state.userLogin) {
      this.props.changeMenu(rowID);
      switch(rowID) {
        case '0':
          Actions.Main();
          break;
        case '1':
          Actions.MyAds();
          break;
        case '2':
          Actions.MyWishList();
          break;
        case '3':
          // Actions.VideoRecord();
          Actions.PostNewVideo();
          break;
        case '4':
          Actions.MyMessage();
          break;
        // case '5':
        //   Actions.MyLocation();
        //   break;
        case '5':
          Actions.Package();
          break;
        case '6':
          Actions.MyPackage();
          break;
        case '7':
          Actions.ProfileEdit();
          break;
        case '8':
          Actions.SupportAdvertisement();
          break;
        case '9':
          this.props.userSignOut();
          AsyncStorage.removeItem('loginStatus');
          this.props.changeMenu(0);
          Actions.Main();
          this.props.menuState();
        default: 
          break;
      }
    }
    else {
      switch(rowID) {
        case '0':
          Actions.Main();
          this.props.changeMenu(0);
          break;
        case '1':
          Actions.Register();
          this.props.menuState();
          break;
        case '2':
          this.props.changeMenu(2);
          Actions.Package();
          break;
        case '3':
          this.props.changeMenu(3);
          Actions.SupportAdvertisement();
          break;
        default: 
          break;
      }
    }
  }

 _renderRow (rowData, sectionID, rowID, highlightRow) {
   const { menuSelectedID } = this.props;
    return (
      <TouchableOpacity onPress={() => {highlightRow(sectionID, rowID); this.onItemSelect(rowData, rowID)}}>
        <View style={this.props.menuIndex == rowID ? styles.selectedMenuItem : styles.menuItem}>
          <Text style={styles.menuItemTitle}>{rowData.title}</Text>
          <View style={styles.iconView}>
            <Image source={rowData.icon} style={styles.menuItemIcon} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
      return (
        <View
          key={`${sectionID}-${rowID}`}
          style={{ height: 1, backgroundColor: '#C3C3C3', flex:1}}
        />
      );
  }

  render() {
    let menuItems = [];
    let adsCount = 3;
    let wishlistCount = 5;

    if (this.state.userLogin) {
      menuItems = [
        {
          title: I18n.t('sidebar.home'),
          icon: icon_area
        },
        {
          title: I18n.t('sidebar.my_ads') + ' (' + adsCount + ')',
          icon: icon_myad
        },
        {
          title: I18n.t('sidebar.my_wishlist') + ' (' + wishlistCount + ')',
          icon: icon_wishlist
        },
        {
          title: I18n.t('sidebar.post_new_ads'),
          icon: icon_newad
        },
        {
          title: I18n.t('sidebar.my_messages'),
          icon: icon_message
        },
        // {
        //   title: I18n.t('sidebar.my_location'),
        //   icon: icon_location
        // },
        {
          title: I18n.t('sidebar.packages'),
          icon: icon_package
        },
        {
          title: I18n.t('sidebar.my_packages'),
          icon: icon_package
        },
        {
          title: I18n.t('sidebar.my_profile'),
          icon: icon_pen
        },
        {
          title: I18n.t('sidebar.support_advertisement'),
          icon: icon_support
        },
        {
          title: I18n.t('sidebar.signout'),
          icon: icon_signout
        },
      ];
    }
    else {
      menuItems = [
        {
          title: I18n.t('sidebar.home'),
          icon: icon_area
        },
        {
          title: I18n.t('sidebar.login_signup'),
          icon: icon_login
        },
        // {
        //   title: 'Special offers',
        //   icon: icon_offer
        // },
        {
          title: I18n.t('sidebar.packages'),
          icon: icon_package
        },
        {
          title: I18n.t('sidebar.support_advertisement'),
          icon: icon_support
        },
      ];
    }

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(menuItems);
    return (
      <View style={styles.container}>
        <View
          style={{ height: 1, backgroundColor: '#C3C3C3'}}
        />
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          enableEmptySections
        />
      </View>
    );
  }
}

export default connect(state => ({
  userLogin: state.user.userLogin,
  menuIndex: state.user.menuIndex,
}),{ userSignOut, changeMenu })(Sidebar);