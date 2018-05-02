import React, { Component } from 'react';
import {
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class KeyboardScrollView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior="padding" 
          keyboardVerticalOffset={this.props.isKeyboardVerticalOffset ? 75 : 0}
        >
          <ScrollView>
            {this.props.children}
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }

    return (
      <KeyboardAwareScrollView>
        {this.props.children}
      </KeyboardAwareScrollView>
    );
  }
}

KeyboardScrollView.propTypes = {
	isKeyboardVerticalOffset: PropTypes.bool,
}

KeyboardScrollView.defaultProps = {
  isKeyboardVerticalOffset: true,
}

export default KeyboardScrollView;
