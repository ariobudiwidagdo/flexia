import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {colors, responsiveHeight, responsiveWidth} from '../../utils';

class Splash extends Component {
  componentDidMount() {
    const {navigation, dataUser} = this.props;
    setTimeout(() => {
      if (dataUser.isLogin === true) {
        if (dataUser.dataUser.role === 'teacher') {
          navigation.replace('TeacherMainApp');
        } else {
          navigation.replace('MainApp');
        }
      } else {
        navigation.replace('Login');
      }
    }, 3000);
  }
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.image}>
          <Image source={require('../../assets/images/Logo.png')} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataUser: state.userReducer,
  };
};

export default connect(mapStateToProps)(Splash);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  image: {
    width: responsiveWidth(238),
    height: responsiveHeight(210),
  },
});
