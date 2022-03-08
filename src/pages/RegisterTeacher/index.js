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
  Alert,
} from 'react-native';
import {colors, fonts, responsiveHeight} from '../../utils';
import {CGap, CTextInput} from '../../components';
import {CButton} from '../../components';

export default class RegisterTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  _onContinue = () => {
    const {name, email, password} = this.state;
    const {navigation} = this.props;
    if (name && email && password) {
      navigation.navigate('RegisterTeacherSkill', this.state);
    } else {
      Alert.alert(
        'Error',
        'Please input your name, email, phone number, and password',
      );
    }
  };

  render() {
    const {navigation} = this.props;
    const {name, email, password} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.pages}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../../assets/images/RegisterTeacherImage.png')}
                style={styles.image}></ImageBackground>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.title}>Create account</Text>
              <Text style={styles.subTitle}>Create account as tutors</Text>
              <CTextInput
                placeholder="Full Name"
                value={name}
                onChangeText={name => this.setState({name})}
              />
              <View style={{marginVertical: 10}}>
                <CTextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={email => this.setState({email})}
                />
              </View>
              <CTextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={password => this.setState({password})}
              />
              <CGap height={10} />
              <CButton
                text="Next"
                onPress={() => {
                  this._onContinue();
                }}
              />
              <View style={styles.bottomText}>
                <Text style={styles.textLigth}>
                  Already have an account?
                  <Text
                    style={styles.textMedium}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    {' '}
                    Sign in
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
  forgot: {
    fontSize: 13,
    color: colors.red,
    marginVertical: 10,
    alignSelf: 'flex-end',
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
