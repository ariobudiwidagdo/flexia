import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CImageCircle from '../CImageCircle';
import {colors, fonts, numberWithCommas} from '../../../utils';
class CCardTeacher extends Component {
  render() {
    const {onPress, image, name, categories, price, description} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.profile}>
            <View style={styles.leftProfile}>
              <CImageCircle image={{uri: image}} />
              <View style={styles.desc}>
                <Text style={styles.name}>{name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.lesson}>
                    <Text style={styles.textLesson}>{categories}</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.price}>
              Rp {numberWithCommas(price)} / Hour
            </Text>
          </View>
          <Text style={styles.text}>{description}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CCardTeacher;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    borderTopWidth: 0.2,
    borderColor: colors.gray,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.gray,
  },
  leftProfile: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: fonts.primary.regular,
    fontSize: 15,
  },
  desc: {
    marginLeft: 15,
  },
  lesson: {
    paddingVertical: 1,
    paddingHorizontal: 4,
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginRight: 10,
  },
  textLesson: {
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    color: colors.white,
  },
  price: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.gray,
  },
});
