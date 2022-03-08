import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, responsiveWidth} from '../../../utils';
import {IconArrowRight} from '../../../assets';

const CCardMenu = ({menu, navigation, onPress}) => {
  return (
    <TouchableOpacity style={styles.setting} onPress={onPress}>
      <View style={styles.iconText}>
        <View style={styles.wrapperIcon}>{menu.image}</View>
        <Text style={styles.text}>{menu.name}</Text>
      </View>
      <IconArrowRight />
    </TouchableOpacity>
  );
};

export default CCardMenu;

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 13,
    marginVertical: 2,
  },
  wrapperIcon: {
    width: responsiveWidth(35),
    height: responsiveWidth(35),
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
});
