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
import PropTypes from 'prop-types';
import { getChatUserList } from '@redux/Message/actions';
import { styles } from './styles';

const icon_list = require('@common/assets/images/map/list.png');
const icon_map = require('@common/assets/images/map/map.png');
const icon_video = require('@common/assets/images/map/add_video.png');
const icon_mail = require('@common/assets/images/map/mailbox.png');

class MapButtonListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageCount: 0,
    }
  }

  componentWillMount() {
    const { token, user, getChatUserList } = this.props;

    this.animatedMapValue = new Animated.Value(170)
    this.animatedListValue = new Animated.Value(0)

    getChatUserList(
      token.tokenInfo.token,
      {
        user_id: user.userInfo.user.customer_id,
      }
    )
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

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;

    if (this.props.message.status === 'GET_CHAT_USER_REQUEST' && message.status === 'GET_CHAT_USER_SUCCESS') {
      if (message.chatUserList.status === 200) {
        this.setState({ messageCount: message.chatUserList.messages.length });
      }
    }
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
                <Text style={styles.badgeText}>{this.state.messageCount}</Text>
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

const mapStateToProps = ({ user, token, message }) => ({
  user,
  token,
  message,
})

const mapDispatchToProps = dispatch => ({
  getChatUserList: (token, data) => dispatch(getChatUserList(token, data)),
})

MapButtonListComponent.defaultProps = {
  message: null,
}

MapButtonListComponent.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  message: PropTypes.objectOf(PropTypes.any),
  getChatUserList: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapButtonListComponent)
