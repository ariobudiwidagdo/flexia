import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  IconNotifActive,
  IconNotif,
  IconProfile,
  IconProfileActive,
  IconChat,
  IconChatActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TeacherTabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Chat') {
      return isFocused ? <IconChatActive /> : <IconChat />;
    }
    if (label === 'NotifScreenTeacher') {
      return isFocused ? <IconNotifActive /> : <IconNotif />;
    }
    if (label === 'ProfileScreenTeacher') {
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

export default TeacherTabItem;

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
