import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import I18n from '@i18n';

import Modal from 'react-native-modal';
import { styles } from './styles';

import IconSocial from 'react-native-vector-icons/Ionicons';
import IconTwitter from 'react-native-vector-icons/MaterialCommunityIcons';
export default class ModalShare extends Component {
  constructor(props) {
    super(props);
  }

  onFacebook() {

  }

  onTwitter() {

  }

  onWhatsapp() {

  }

  onLinkedin() {

  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent
        isVisible={this.props.showShareModal}
        backdropColor='rgba(0, 0, 0, 0.3)'
        onBackdropPress={() => this.props.hideShareModal()}
      >
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>{I18n.t('category.complete_action')}</Text>
          </View>
          <View style={styles.iconList}>
            <View style={styles.iconView}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.onFacebook()}>
                <IconSocial name='logo-facebook' style={[styles.icon, styles.iconFacebook]} />
              </TouchableOpacity>
              <Text style={styles.socialText}>{I18n.t('category.facebook')}</Text>
            </View>
            <View style={styles.iconView}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.onTwitter()}>
                <IconTwitter name='twitter-circle' style={[styles.icon, styles.iconTwitter]} />
              </TouchableOpacity>
              <Text style={styles.socialText}>Twitter</Text>
            </View>
          </View>
          <View style={styles.iconList}>
            <View style={styles.iconView}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.onWhatsapp()}>
                <IconSocial name='logo-whatsapp' style={[styles.icon, styles.iconWhatsapp]} />
              </TouchableOpacity>
              <Text style={styles.socialText}>{I18n.t('category.whatsapp')}</Text>
            </View>
            <View style={styles.iconView}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.onLinkedin()}>
                <IconSocial name='logo-linkedin' style={[styles.icon, styles.iconLinkedin]} />
              </TouchableOpacity>
              <Text style={styles.socialText}>{I18n.t('category.linkedin')}</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}