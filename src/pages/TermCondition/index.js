import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {IconBack} from '../../assets';
import {CGap} from '../../components';
import {colors} from '../../utils';

export default class TermCondition extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack('');
          }}>
          <IconBack />
        </TouchableOpacity>
        <CGap height={30} />
        <Text> TermCondition </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    paddingHorizontal: 17,
    paddingTop: 30,
    backgroundColor: colors.whiteBlue,
  },
});
