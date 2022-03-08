import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {colors, fonts, responsiveHeight, toastAndroidCenter} from '../../utils';
import {CGap, CTextInput} from '../../components';
import {CButton} from '../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  _login = () => {
    const {email, password} = this.state;
    const {navigation, userLogin} = this.props;
    this.setState({isLoading: true});
    let user;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        firestore()
          .collection('users')
          .doc(res.user.uid)
          .onSnapshot(value => {
            user = value.data();
            userLogin(user);
            this.setState({isLoading: false});
            if (user.role === 'teacher') {
              navigation.replace('TeacherMainApp');
            } else {
              navigation.replace('MainApp');
            }
          });
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          toastAndroidCenter('User Not Found');
        } else if (error.code === 'auth/wrong-password') {
          toastAndroidCenter('Wrong Password!');
        } else if (error.code === 'auth/invalid-email') {
          toastAndroidCenter('Email address is invalid!');
        }
      });
  };

  render() {
    const {navigation} = this.props;
    const {email, password, isLoading} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.pages}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../../assets/images/LoginImage.png')}
                style={styles.image}></ImageBackground>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.title}>Welcome Back !</Text>
              <Text style={styles.subTitle}>Login to your account</Text>
              <CGap height={5} />
              <CTextInput
                placeholder="Email"
                value={email}
                onChangeText={email => {
                  this.setState({email});
                }}
              />
              <CGap height={10} />
              <CTextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={password => {
                  this.setState({password});
                }}
              />
              <CGap height={10} />
              <CButton
                text="Login"
                isLoading={isLoading}
                onPress={() => {
                  this._login();
                }}
              />
              <View style={styles.bottomText}>
                <Text style={styles.textLigth}>
                  Don't have an account?
                  <Text
                    style={styles.textMedium}
                    onPress={() => {
                      navigation.navigate('Register');
                    }}>
                    {' '}
                    Sign up
                  </Text>
                </Text>
                <Text style={styles.textLigth}>
                  Want to become a tutor?
                  <Text
                    style={styles.textMedium}
                    onPress={() => {
                      navigation.navigate('RegisterTeacher');
                    }}>
                    {' '}
                    Sign up as Tutor
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = send => {
  return {
    userLogin: data =>
      send({
        type: 'USER-LOGIN',
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: responsiveHeight(448),
  },
  image: {
    flex: 1,
    paddingHorizontal: 17,
    paddingTop: 10,
  },
  bottom: {
    width: '100%',
    height: responsiveHeight(471),
    zIndex: 1,
    marginTop: responsiveHeight(-60),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.whiteBlue,
    paddingTop: 15,
    paddingHorizontal: 17,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary.semiBold,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: fonts.primary.regular,
    color: colors.gray,
  },
  bottomText: {
    alignItems: 'center',
    marginTop: 10,
  },
  textLigth: {
    fontSize: 14,
    fontFamily: fonts.primary.light,
    color: colors.gray,
    marginTop: 5,
  },
  textMedium: {
    color: colors.black,
    fontFamily: fonts.primary.medium,
  },
});
