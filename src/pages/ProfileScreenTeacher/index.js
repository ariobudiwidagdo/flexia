import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {colors, fonts, responsiveWidth} from '../../utils';
import {dummyMenuTeacher} from '../../data/DummyMenuTeacher';
import {CCardMenu} from '../../components';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {DefaultImage} from '../../assets';

class ProfileScreenTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: dummyMenuTeacher,
    };
  }

  componentDidMount() {
    const {update, dataUser} = this.props;
    firestore()
      .collection('users')
      .doc(dataUser.uid)
      .onSnapshot(res => {
        console.log(res.data());
        update(res.data());
      });
  }

  _navigateMenu = menu => {
    const {navigation, userLogout, dataUser} = this.props;
    if (menu.name === 'Logout') {
      auth()
        .signOut()
        .then(() => {
          userLogout();
          navigation.replace('Login');
        });
    } else {
      navigation.navigate(menu.page, dataUser);
    }
  };

  render() {
    const {menu} = this.state;
    const {dataUser} = this.props;
    return (
      <View style={styles.pages}>
        <View style={styles.wrapperImage}>
          <View style={styles.circle}>
            <Image
              source={dataUser.image ? {uri: dataUser.image} : DefaultImage}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.name}>{dataUser.name}</Text>
            <Text style={styles.location}>{dataUser.email}</Text>
          </View>
        </View>
        <Text style={styles.account}>Account Setting</Text>
        {menu.map(menu => {
          return (
            <CCardMenu
              menu={menu}
              key={menu.id}
              onPress={() => this._navigateMenu(menu)}
            />
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataUser: state.userReducer.dataUser,
  };
};

const mapDispatchToProps = send => {
  return {
    userLogout: data =>
      send({
        type: 'USER-LOGOUT',
        payload: data,
      }),
    update: data =>
      send({
        type: 'GET_USER',
        payload: data,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreenTeacher);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.whiteBlue,
    paddingHorizontal: 17,
    paddingTop: 30,
  },
  wrapperImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: responsiveWidth(70),
    height: responsiveWidth(70),
    backgroundColor: 'black',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 15,
  },
  image: {
    width: responsiveWidth(70),
    height: responsiveWidth(70),
  },
  name: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 20,
  },
  location: {
    fontFamily: fonts.primary.regular,
    fontSize: 15,
    color: colors.gray,
  },
  account: {
    fontFamily: fonts.primary.regular,
    fontSize: 15,
    marginVertical: 20,
  },
});
