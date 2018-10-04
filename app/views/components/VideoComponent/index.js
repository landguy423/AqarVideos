import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import PropTypes from 'prop-types';
import Video from 'react-native-video';

import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles'

class VideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1
    }
  }

  onLoadStart = () => {
    this.setState({ opacity: 1 }, () => {
      this.player.presentFullscreenPlayer
    })
  }

  onLoad = () => {
    this.setState({ opacity: 0 })
  }

  onBuffer = ({ isBuffering }) => {
    this.setState({ opacity: isBuffering ? 1 : 0 })
  }

  render() {
    const { rowData, user, offsetY, offsetX, size, full } = this.props
    
    if (!!rowData.video_url && rowData.video_url.length > 0) {
      return (
        <View style={styles.video}>
          <Video
            ref={(ref) => { this.player = ref }}
            source={{ uri: rowData.video_url }}
            style={styles.video}
            resizeMode='cover'
            autoplay={false}
            paused
            onBuffer={this.onBuffer}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
          />
          <ActivityIndicator
            animating
            size={full ? "large" : "small"}
            color="#fff"
            style={{
              opacity: this.state.opacity,
              position: 'absolute',
              top: offsetY,
              left: offsetX,
            }}
          />
        </View>
      )
    } else {
      return <Icon name='video-off' size={size} color="#fff" style={full ? { marginBottom: 20 } : ''}/>
    }
  }
}

VideoComponent.defaultProps = {
  rowData: {},
  offsetX: 50,
  offsetY: 40,
  size: 30,
  full: false
}

VideoComponent.propTypes = {
  rowData: PropTypes.objectOf(PropTypes.any),
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  size: PropTypes.number,
  full: PropTypes.bool
}

export default VideoComponent
