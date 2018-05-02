import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Container from '@layout/Container';
import MapPage from '../MapPage';
import ProductListPage from '../ProductListPage';
import ButtonPlusComponent from '@components/ButtonPlusComponent';
import MapButtonListComponent from '@components/MapButtonListComponent';
import I18n from '@i18n';

import { styles } from './styles';

class MyLocationPage extends Component {
  constructor(props) {
    super(props);
    watchID:  null;

    this.state ={
      isBtnList: false,
      btnItem: null,
      btnStatus: 'map',
      region: null,
      currentLocation: null,
    }
  }

  componentDidMount() {
    const {myLocation} = this.props;
    
    this.setState({
      region: myLocation.region,
      currentLocation: myLocation.currentLocation
    })
  }

  onSelectItem(index) {
    const {btnStatus} = this.state;
    
    switch(index) {
      case 'plus':
        this.setState({isBtnList: !this.state.isBtnList});
        break;
      case 'list':
        if (btnStatus == 'map')
          this.setState({btnStatus: 'list'});
        else
          this.setState({btnStatus: 'map'});
        break;
      case 'mail':
        break;
      case 'video':
        break;
      default:
        break;
    }
    this.setState({isBtnList: !this.state.isBtnList});
  }

  render() {
    const { region, currentLocation } = this.state;
    const {isBtnList, btnItem, btnStatus} = this.state;
    const title = btnStatus == 'list' ? I18n.t('main.list') : I18n.t('sidebar.my_location');

    if (currentLocation == null || region == null) {
      return null;
    }

    let buildingData = [];
    
    return (
      <Container title={title}>
        <View style={styles.container}>
          {btnStatus === 'list'
          ? <ProductListPage />
          : <MapPage page="mylocation" locationData={buildingData} region={region} />
          }
          {isBtnList && (
            <MapButtonListComponent  onSelectItem={value => this.onSelectItem(value)} />
          )}
          <ButtonPlusComponent isBtnList={isBtnList} onSelectItem={value => this.onSelectItem(value) }/>
        </View>
      </Container>
    );
  }
}

export default connect(state => ({
  myLocation: state.map.myLocation
}),{ })(MyLocationPage);