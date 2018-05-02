import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';

const icon_list = require('@common/assets/images/map/list.png');
const icon_map = require('@common/assets/images/map/map.png');
const icon_video = require('@common/assets/images/map/add_video.png');
const icon_mail = require('@common/assets/images/map/mailbox.png');

class MapButtonListComponent extends Component {
  componentWillMount() {
    this.animatedMapValue = new Animated.Value(170)
    this.animatedListValue = new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.animatedMapValue, {
      toValue: 250,
      duration: 1500,
      easing: Easing.bounce,
    }).start()

    Animated.timing(this.animatedListValue, {
      toValue: 70,
      duration: 1500,
      easing: Easing.bounce,
    }).start()
  }

  onNewVideo() {
    // Actions.VideoRecord();
    Actions.PostNewVideo();
  }

  onDirectMessage() {
    Actions.MyMessage();
  }

  render() {
    const { btnStatus, user } = this.props;
    const animatedMapStyle= { bottom: this.animatedMapValue }
    const animatedListStyle= { bottom: this.animatedListValue }

    return (
      <Animated.View style={[styles.btn, btnStatus === 'list' ? animatedListStyle : animatedMapStyle]}>
        <View>
          <TouchableOpacity onPress={() => this.props.onSelectItem('list')} activeOpacity={0.8}>
            <Image source={btnStatus === 'list' ? icon_map: icon_list} style={styles.btnIcon} />
          </TouchableOpacity>
        </View>
        {user.userLogin && (
          <View>
            <TouchableOpacity onPress={() => this.onDirectMessage()}  activeOpacity={0.8}>
              <Image source={icon_mail} style={styles.btnIcon} />
              <View style={styles.badgeView}>
                <Text style={styles.badgeText}>10</Text>
              </View>
            </TouchableOpacity>
          </View>)}
        {user.userLogin && (
          <View>
            <TouchableOpacity onPress={() => this.onNewVideo()} activeOpacity={0.8}>
              <Image source={icon_video} style={styles.btnIcon} />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

export default connect(
  mapStateToProps,
  null,
)(MapButtonListComponent)
