import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CGap from '../CGap';
import {
  IconTask,
  IconTime,
  IconUploadImage,
  IconUserBlue,
} from '../../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import CButton from '../CButton';

export default class CNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
    };
  }

  render() {
    const {name, time, onPress, image, isDone} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <IconTask />
          <Text style={styles.textBold}>New order booking</Text>
        </View>
        <CGap height={15} />
        <View>
          <View style={styles.wrapper}>
            <IconUserBlue />
            <View style={styles.wrapperText}>
              <Text style={styles.textRegular}>From</Text>
              <Text style={styles.textBold}>{name}</Text>
            </View>
          </View>
          <View style={styles.wrapper}>
            <IconTime />
            <View style={styles.wrapperText}>
              <Text style={styles.textRegular}>Time lesson</Text>
              <Text style={styles.textBold}>{time}</Text>
            </View>
          </View>
          <View style={styles.wrapperImage}>
            <Image
              source={
                image
                  ? {uri: image}
                  : require('../../../assets/images/DefaultImage.png')
              }
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <CGap height={10} />
          {isDone ? (
            <CButton text="Class finished" />
          ) : (
            <CButton
              text="click here if class already done"
              onPress={onPress}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRightWidth: 0.3,
    borderBottomWidth: 0.3,
    borderLeftWidth: 0.3,
    borderColor: colors.gray,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  textBold: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 15,
    marginLeft: 20,
  },
  textRegular: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    marginLeft: 20,
    color: colors.gray,
  },
  wrapperImage: {
    height: responsiveHeight(250),
    width: responsiveWidth(360),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2,
  },
});
