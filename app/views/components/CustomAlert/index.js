import React, { Component } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import I18n from '@i18n';

export default class CustomAlert extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { message, visible, title } = this.props;

    let sTitle = ''
    if (title === 'Error') {
      sTitle = I18n.t('alert.error')
    } else if (title === 'Success') {
      sTitle = I18n.t('alert.success')
    } else {
      sTitle = I18n.t('alert.warning')
    }

    return (
      <AwesomeAlert
        show={visible}
        showProgress={false}
        title={sTitle}
        message={message}
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showCancelButton
        cancelText={I18n.t('alert.ok')}
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