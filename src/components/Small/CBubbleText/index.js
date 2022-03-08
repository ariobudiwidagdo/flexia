import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {getHour} from '../../../utils/util/date';

export default class CBubbleText extends Component {
  render() {
    const {isMe, text, time} = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            backgroundColor: isMe ? colors.lightBlue : colors.lightYellow,
          },
        ]}>
        <Text style={styles.text}> {text} </Text>
        <Text style={styles.time}>{getHour(time)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 4,
    marginBottom: 20,
    borderRadius: 10,
    maxWidth: '80%',
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 15,
  },
  time: {
    fontSize: 10,
    fontFamily: fonts.primary.light,
  },
});
