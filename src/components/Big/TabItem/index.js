import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  IconHome,
  IconHomeActive,
  IconProfile,
  IconProfileActive,
  IconChat,
  IconChatActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? <IconHomeActive /> : <IconHome />;
    }
    if (label === 'Chat') {
      return isFocused ? <IconChatActive /> : <IconChat />;
    }
    if (label === 'Profile') {
      return isFocused ? <IconProfileActive /> : <IconProfile />;
    }

    return <IconHome />;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: isFocused => ({
    color: isFocused ? colors.white : colors.secondary,
    fontSize: 11,
    marginTop: 4,
    fontFamily: fonts.primary.bold,
  }),
});
