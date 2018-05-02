
import React, { Component } from 'react'
import {
  TextInput,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import AutoSuggest from './AutoSuggest'
import { styles } from './styles';
import * as commonColors from '@common/styles/commonColors';

export default class AutoSuggestComponent extends Component {
  onChange = (text) => {
    this.props.handleChange(text);
    console.log('SELECT:', text)
  }

  render () {
    const {label, value} = this.props;
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.textTitle}>
          {label}
        </Text>
        <AutoSuggest
          otherTextInputProps={{ editable: true }}
          onChangeText={selection => this.onChange(selection)}
          onSelect={selection => this.onChange(selection)}
          terms={[
            'Apple',
            'Banana',
            'Orange',
            'Strawberry',
            'Lemon',
            'Cantaloupe',
            'Peach',
            'Mandarin',
            'Date',
            'Kiwi',
          ]}
          placeholder={label}
          placeholderTextColor='darkgrey'
        />
      </View>
    )
  }
}