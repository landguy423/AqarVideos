import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'

class CustomCheckbox extends PureComponent {
    state = {
        checked: false
    }

    componentDidMount() {
        this.setState({ checked: this.props.checked })
    }

    render() {
        const { checked } = this.state
        const {
            labelBefore,
            containerStyle,
            checkedComponent,
            uncheckedComponent,
            checkedImage,
            uncheckedImage,
            checkboxStyle,
            labelStyle,
            numberOfLabelLines,
            label
        } = this.props

        return (
            <TouchableOpacity
                style={[styles.container, containerStyle]}
                onPress={this.handleToggleChecked}
            >
                {labelBefore ? (
                    <Label
                        labelStyle={labelStyle}
                        numberOfLabelLines={numberOfLabelLines}
                        label={label}
                    />
                ) : null}

                {checkedComponent && uncheckedComponent ? checked ? (
                    checkedComponent
                ) : (
                    uncheckedComponent
                ) : (
                    <Image
                        style={[styles.checkbox, checkboxStyle]}
                        source={checked ? checkedImage : uncheckedImage}
                    />
                )}

                {!labelBefore && (
                    <Label
                        labelStyle={labelStyle}
                        numberOfLabelLines={numberOfLabelLines}
                        label={label}
                    />
                )}
            </TouchableOpacity>
        )
    }

    handleToggleChecked = () => {
        const { label } = this.props
        const checked = !this.state.checked

        this.setState({ checked })
        this.props.onChange && this.props.onChange({ label, checked })
    }
}

const Label = ({ labelStyle, numberOfLabelLines, label }) => (
    <View style={styles.labelContainer}>
        {label}
    </View>
)

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        width: 30,
        height: 30
    },
    labelContainer: {
        marginLeft: 0,
        marginRight: 5
    },
    label: {
        fontSize: 14,
        color: '#222'
    }
})

CustomCheckbox.defaultProps = {
    custom: false,
    label: 'Label',
    numberOfLabelLines: 1,
    labelBefore: false,
    checked: false,
    checkedImage: require('./checked.png'),
    uncheckedImage: require('./unchecked.png'),
    checkedComponent: null,
    uncheckedComponent: null
}

CustomCheckbox.propTypes = {
    checkedComponent: PropTypes.element,
    uncheckedComponent: PropTypes.element,
    checked: PropTypes.bool,
    checkboxStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    label: PropTypes.element,
    labelBefore: PropTypes.bool,
    labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    numberOfLabelLines: PropTypes.number,
    onChange: PropTypes.func
}

export default CustomCheckbox
