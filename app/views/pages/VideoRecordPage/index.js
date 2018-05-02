import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

import { styles } from './styles';
import Container from '@layout/Container';
import I18n from '@i18n';

export default class VideoRecordPage extends Component {
  constructor(props) {
    super(props);
    this.camera = null;

    this.state = {
      flashMode: 'auto',
      type: 'back',
      captureTarget: Camera.constants.CaptureTarget.cameraRoll,
      aspect: Camera.constants.Aspect.fill,
      orientation: Camera.constants.Orientation.auto,
      isRecording: false,
      isStart: false,

      recordTime: '',
    }
  }
  
  startRecording = () => {
    this.setState({isStart: true});

    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
          .then((data) => {
            console.log('captured_data', data)
            Actions.PostNewVideo({videoData: data});
          })
          .catch(err => console.error(err));

      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording = () => {
    this.setState({isStart: false});

    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  handleTimerComplete(time) {
    this.setState({recordTime: time})
  }

  render() {
    const {isStart} = this.state;
    return (
      <Container title='VIDEO'>
        <View style={styles.videoContainer}>
          <View style={styles.timeView}>
            <Stopwatch laps start={this.state.isStart}
              // reset={!this.state.isStart}
              options={styles}
              handleFinish={() => this.handleTimerComplete()}
            />
          </View>
          <View style={styles.btnView}>
            {isStart ?
              <TouchableOpacity onPress={() => this.stopRecording()} style={styles.btnRecordView}>
                <View style={styles.btnRecord}>
                  <View style={styles.btnRecordInnerStop} />
                </View>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => this.startRecording()} style={styles.btnRecordView}>
                <View style={styles.btnRecord}>
                  <View style={styles.btnRecordInnerStart} />
                </View>
              </TouchableOpacity>
            }
          </View>
          <Camera
            ref={cam => this.camera = cam}
            style={styles.preview}
            aspect={this.state.aspect}
            captureTarget={this.state.captureTarget}
            type={this.state.type}
            flashMode={this.state.flashMode}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            defaultTouchToFocus
            mirrorImage={false}
          >
          </Camera>
        </View>
      </Container>
    )
  }
}