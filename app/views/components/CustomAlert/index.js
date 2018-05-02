import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

export default class CustomAlert extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const {message, visible, title} = this.props;
    return (
      <AwesomeAlert
          show={visible}
          showProgress={false}
          title={title}
          message={message}
          closeOnTouchOutside
          closeOnHardwareBackPress={false}
          showCancelButton
          cancelText="OK"
          cancelButtonColor="#DD6B55"
          alertContainerStyle={{zIndex: 100}}
          // overlayStyle={{opacity: 0.2}}
          onCancelPressed={() => {
            this.props.closeAlert();
          }}
        />
      );
  }
}