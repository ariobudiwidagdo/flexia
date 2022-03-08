import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, responsiveWidth} from '../../../utils';
import {IconLanguage, IconProgramming, IconPsychology} from '../../../assets';

const CCircleCategories = props => {
  const Icon = () => {
    if (icon === 'Programming') {
      return <IconProgramming />;
    } else if (icon === 'Language') {
      return <IconLanguage />;
    } else return <IconPsychology />;
  };

  const {backgroundColor, icon, categories, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle(backgroundColor)}>
        <Icon />
      </View>
      <Text style={styles.text}>{categories}</Text>
    </TouchableOpacity>
  );
};

export default CCircleCategories;

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
  circle: backgroundColor => ({
    width: responsiveWidth(60),
    height: responsiveWidth(60),
    borderRadius: 50,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  text: {
    fontFamily: fonts.primary.medium,
    fontSize: 10,
    color: colors.gray,
  },
});
