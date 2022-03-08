import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IconBack} from '../../assets';
import {CButton, CGap, CTextInput} from '../../components';
import {colors, fonts, responsiveWidth} from '../../utils';

export default class ChangePassword extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('');
            }}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.wrapperHeader}>
            <Text style={styles.title}>Edit Profile</Text>
          </View>
          <Text style={styles.text}>Old Password</Text>
          <CTextInput placeholder="Your old password" />
          <CGap height={15} />
          <Text style={styles.text}>New Password</Text>
          <CTextInput placeholder="Your old password" />
          <CGap height={15} />
          <Text style={styles.text}>Confirm Password</Text>
          <CTextInput placeholder="Your old password" />
        </ScrollView>
        <CGap height={100} />
        <TouchableOpacity style={styles.wrapperButton}>
          <CButton
            text="Change Password"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.whiteBlue,
    paddingHorizontal: 17,
    paddingTop: 30,
  },
  title: {
    fontFamily: fonts.primary.medium,
    fontSize: 20,
    marginBottom: 20,
  },
  wrapperHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.gray,
    marginBottom: 5,
  },
  wrapperButton: {
    position: 'absolute',
    bottom: 0,
    width: responsiveWidth(380),
    marginLeft: 17,
    marginBottom: 30,
  },
});
