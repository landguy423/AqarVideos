import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';
import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { getPackages, getTerlWebUrl } from '@redux/Package/actions';

const COLORS = [
  '#88AC40', '#2A90B6', '#F19100', commonColors.pinkColor, 
  '#88AC40', '#2A90B6', '#F19100', commonColors.pinkColor
];

class PackagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      packageList: [],
    }
  }

  componentWillMount() {
    const { token, getPackages, getTerlWebUrl } = this.props;

    this.setState({ loading: true });
    getPackages(token.tokenInfo.token);
  }

  componentWillReceiveProps(nextProps) {
    const { packages } = nextProps;

    if (this.props.packages.status === 'GET_PACKAGE_REQUEST' && packages.status === 'GET_PACKAGE_SUCCESS') {
      this.setState({ loading: false });
      if (packages.packageInfo.status === 200) {
        this.setState({ packageList: packages.packageInfo.package})
      }
    }
  }

  onItemSelect(rowData, rowID) {
    console.log('ROWDTA: ', rowData)
    Actions.PackageDetail({ data: rowData });
  }

  _renderRow (rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity 
        activeOpacity={0.6}
        onPress={() => this.onItemSelect(rowData)}
      >
        <View style={styles.listItem}>
          <View style={styles.imageView}>
            <View style={[styles.roundContent, { backgroundColor: COLORS[rowID] }]}>
                <Text style={styles.number}>{rowData.detail['1'].title}</Text>
                <Text style={styles.day}>{rowData.duration}{I18n.t('packages.days')}</Text>
            </View>
          </View>
          <View style={styles.footerView}>
            <Text style={styles.textTitle}>{rowData.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
          key={rowID}
          style={{ height: 15, backgroundColor: 'transparent', flex:1 }}
      />
    );
  }

  render() {
    const { loading, packageList } = this.state
    const { packages: { packageInfo }} = this.props;

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    dataSource = ds.cloneWithRows(packageList);

    return (
      <Container title={I18n.t('sidebar.packages')}>
        <LoadingSpinner visible={loading } />

        <View style={styles.container}>
          <ListView
            ref='listview'
            dataSource={dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeparator}
            contentContainerStyle={styles.listView}
            enableEmptySections={true}
          />
        </View>
      </Container>
    );
  }
}


const mapStateToProps = ({ user, token, packages }) => ({
  user,
  token,
  packages
})

const mapDispatchToProps = dispatch => ({
  getPackages: token => dispatch(getPackages(token)),
  getTerlWebUrl: token => dispatch(getTerlWebUrl(token))
})

PackagePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  packages: PropTypes.objectOf(PropTypes.any),
  getPackages: PropTypes.func.isRequired,
  getTerlWebUrl: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackagePage)
