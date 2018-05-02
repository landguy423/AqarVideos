import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Button
} from 'react-native'
import debounce from '../vendor/throttle-debounce/debounce'
import { version } from 'react-native/package.json'
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

export default class AutoSuggest extends Component {
  static propTypes = {
    containerStyles: PropTypes.object,
    clearBtnStyles: PropTypes.object,
    clearBtnVisibility: PropTypes.bool,
    otherTextInputProps: PropTypes.object,
    placeholder: PropTypes.string, // textInput
    placeholderTextColor: PropTypes.string,
    onChangeText: PropTypes.func,
    onChangeTextDebounce: PropTypes.number,
    onItemPress: PropTypes.func,
    rowTextStyles: PropTypes.object,
    rowWrapperStyles: PropTypes.object,
    textInputStyles: PropTypes.object,
    terms: PropTypes.array

  }

  static defaultProps = {
    terms: [],
    clearBtnVisibility: false,
    placeholder: '',
    textInputStyles: {},
    otherTextInputProps: {},
    onChangeTextDebounce: 200
  }
  getInitialStyles () {
    const { textInputStyles } = this.props
    return {
      rowWrapperStyles: {
        width: '100%',
        height: 40,
        zIndex: 100,
        paddingLeft: 5,
        paddingRight: 5,
        opacity: 0.8,
      },
      rowTextStyles: {
        paddingTop: 10,
        textAlign: 'right',
        width: '100%',
        height: '100%',
        fontSize: 12,
        color: '#424242',
      },
      containerStyles: {
        zIndex: 99,
        width: '100%',
        backgroundColor: 'white'
      },
      textInputStyles: { // textInput Styles
        textAlign: 'right',
        fontSize: 12,
        width: '100%',
        paddingHorizontal: 5,
        height: 40,
        color: '#424242',
        zIndex: 99,
      }
    }
  }
  constructor (props) {
    super(props)
    this.clearTerms = this.clearTerms.bind(this)
    this.searchTerms = this.searchTerms.bind(this)
    this.setCurrentInput = this.setCurrentInput.bind(this)
    this.onItemPress = this.onItemPress.bind(this)
    this.state = {
      TIWidth: null,
      results: [],
      currentInput: null
    }
  }
  componentDidMount () {
    // when user hits the return button, clear the terms
    Keyboard.addListener('keyboardDidHide', () => this.clearTerms())
  }

  getAndSetWidth () {
    this.refs.TI.measure((ox, oy, width, ...rest) => {
      this.setState({ TIWidth: width })
    })
  }
  setCurrentInput (currentInput) {
    this.setState({currentInput})
  }

  clearInputAndTerms () {
    this.refs.TI.clear()
    this.clearTerms()
  }
  clearTerms () { this.setState({results: []}) }
  addAllTerms () { this.setState({results: this.props.terms}) }
  searchTerms (currentInput) {
    this.setState({ currentInput })
    debounce(300, () => {
      this.getAndSetWidth()
      const findMatch = (term1, term2) => term1.toLowerCase().indexOf(term2.toLowerCase()) > -1
      const results = this.props.terms.filter(eachTerm => {
        if (findMatch(eachTerm, currentInput)) return eachTerm
      })

      const inputIsEmpty = !!(currentInput.length <= 0)
      this.setState({results: inputIsEmpty ? [] : results}) // if input is empty don't show any results
    })()
  }

  // copy the value back to the input
  onItemPress (currentInput) {
    this.props.onSelect(currentInput)
    this.setCurrentInput(currentInput)
    this.clearTerms()
  }
  getCombinedStyles (styleName) {
    let styleObj
    if (typeof this.props.styleName !== 'object') { // this is if its a stylesheet reference
      styleObj = StyleSheet.flatten([this.getInitialStyles()[styleName], this.props[styleName]])
    } else {
      // combine the  initial i.e default styles into one object.
      styleObj = { ...this.getInitialStyles()[styleName], ...this.props[styleName] }
    }
    return styleObj
  }

  _renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <TouchableOpacity
      activeOpacity={0.5 /* when you touch it the text color grimaces */}
      onPress={() => {
        this.onItemPress(rowData)
        if (onItemPress) onItemPress(rowData)
      }}
    >
      <View
        style={this.getCombinedStyles('rowWrapperStyles')}
      >
        <Text style={this.getCombinedStyles('rowTextStyles')}>{rowData}</Text>
      </View>
    </TouchableOpacity>
  )

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{ height: 1, backgroundColor: 'lightgrey', flex:1}}
      />
    );
} 

  render () {
    const {
      otherTextInputProps,
      placeholder,
      placeholderTextColor,
      clearBtn,
      clearBtnVisibility,
      onChangeTextDebounce,
      onItemPress
    } = this.props
    return (
      <View style={this.getCombinedStyles('containerStyles')}>
        <View
          ref="TIContainer"
          style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
        >
          <TextInput
            {...otherTextInputProps}
            placeholderTextColor='grey'
            ref="TI"
            spellCheck={false}
            defaultValue={this.state.currentInput}
            onChangeText={(el) => {
              this.searchTerms(el)
              debounce(onChangeTextDebounce, this.props.onChangeText(el))
            }}
            placeholder={placeholder}
            style={this.getCombinedStyles('textInputStyles')}
          />
        </View>
        {this.state.results.length > 0 && (
          <ListView
            style={{
              width: this.state.TIWidth, 
              backgroundColor: 'white', 
              zIndex: 999,
              borderColor: 'darkgrey',
              borderWidth: 1,
            }}
            enableEmptySections
            dataSource={ds.cloneWithRows(this.state.results)}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeparator}
          />
        )}
      </View>

    )
  }
}