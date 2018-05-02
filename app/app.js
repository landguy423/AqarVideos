import React, { Component } from 'react';
import {
  Linking,
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './common/middlewares/promiseMiddleware';
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, promiseMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import MainPage from './views/pages/MainPage';
import RegisterPage from './views/pages/RegisterPage';
import MyAdsPage from './views/pages/MyAdsPage';
import MyWishListPage from './views/pages/MyWishListPage';
import PackagePage from './views/pages/PackagePage';
import PackageDetailBankPage from './views/pages/PackagePage/PackageDetailBankPage';
import MyPackagePage from './views/pages/MyPackagePage';
import MyPackageDetailPage from './views/pages/MyPackagePage/MyPackageDetailPage';
import ProfileEditPage from './views/pages/ProfileEditPage';
import AreaPage from './views/pages/AreaPage';
import MyLocationPage from './views/pages/MyLocationPage';
import SupportAdvertisementPage from './views/pages/SupportAdvertisementPage';
import ProductListPage from './views/pages/ProductListPage';
import ProductDetailPage from './views/pages/ProductDetailPage';
import PostNewVideoPage from './views/pages/PostNewVideoPage';
import PostNewVideoPreviewPage from './views/pages/PostNewVideoPreviewPage';
import MyMessagePage from './views/pages/MyMessagePage';
import ChatRoomPage from './views/pages/ChatRoomPage';
import DirectMessagePage from './views/pages/DirectMessagePage';
import SearchPage from './views/pages/SearchPage';
import VideoRecordPage from './views/pages/VideoRecordPage';
import PostProductLocationPage from './views/pages/PostProductLocationPage';
import SplashScreenPage from './views/pages/SplashScreenPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
  }

  render() {

    if (this.state.loading) {
      return (
        <SplashScreenPage />
      )
    }

    const scenes = Actions.create(
      <Scene key="root">
        <Scene key="Main" initial component={ MainPage } hideNavBar panHandlers={null}/>
        <Scene key="Register" component={ RegisterPage } hideNavBar panHandlers={null}/>
        <Scene key="MyAds" component={ MyAdsPage } hideNavBar panHandlers={null}/>
        <Scene key="MyWishList" component={ MyWishListPage } hideNavBar panHandlers={null} />
        <Scene key="Package" component={ PackagePage } hideNavBar panHandlers={null}/>
        <Scene key="PackageDetailBank" component={ PackageDetailBankPage } hideNavBar panHandlers={null}/>
        <Scene key="MyPackage" component={ MyPackagePage } hideNavBar panHandlers={null}/>
        {/* <Scene key="PackageDetail" component={ PackageDetailPage } hideNavBar panHandlers={null}/> */}
        <Scene key="ProfileEdit" component={ ProfileEditPage } hideNavBar panHandlers={null}/>
        <Scene key="Area" component={ AreaPage } hideNavBar panHandlers={null}/>
        <Scene key="MyLocation" component={ MyLocationPage } hideNavBar panHandlers={null}/>
        <Scene key="SupportAdvertisement" component={ SupportAdvertisementPage } hideNavBar panHandlers={null}/>
        <Scene key="ProductList" component={ ProductListPage } hideNavBar panHandlers={null}/>
        <Scene key="ProductDetail" component={ ProductDetailPage } hideNavBar panHandlers={null}/>
        <Scene key="PostNewVideo" component={ PostNewVideoPage } hideNavBar panHandlers={null}/>
        <Scene key="PostNewVideoPreview" component={ PostNewVideoPreviewPage } hideNavBar panHandlers={null}/>
        <Scene key="PostProductLocation" component={ PostProductLocationPage } hideNavBar panHandlers={null}/>
        <Scene key="MyMessage" component={ MyMessagePage } hideNavBar panHandlers={null}/>
        <Scene key="ChatRoom" component={ ChatRoomPage } hideNavBar panHandlers={null}/>
        <Scene key="DirectMessage" component={ DirectMessagePage } hideNavBar panHandlers={null}/>
        <Scene key="Search" component={ SearchPage } hideNavBar panHandlers={null}/>
        <Scene key="VideoRecord" component={ VideoRecordPage } hideNavBar panHandlers={null}/>
      </Scene>
    );

    return (
      <Provider store={store}>
        <Router hideNavBar scenes={scenes}/>
      </Provider>
    );
  }
}