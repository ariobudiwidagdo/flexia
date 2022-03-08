import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {CCardChat} from '../../components';
import {colors, fonts} from '../../utils';
import firestore from '@react-native-firebase/firestore';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataChat: [],
    };
  }

  componentDidMount() {
    const {dataUser} = this.props;

    firestore()
      .collection('messages')
      .doc(dataUser.uid)
      .collection('chatWith')
      .onSnapshot(res => {
        const data = res.docs.map(item => {
          return {messages: item.data().messages, ...item.data().lastChat};
        });
        this.setState({dataChat: data});
      });
  }

  render() {
    const {navigation} = this.props;
    const {dataChat} = this.state;
    return (
      <View style={styles.pages}>
        <Text style={styles.text}>Messages</Text>
        {dataChat ? (
          dataChat.map((value, index) => {
            return (
              <View key={index}>
                <CCardChat
                  name={value.name}
                  image={value.image}
                  message={value.messages[value.messages.length - 1].text}
                  onPress={() => {
                    navigation.navigate('OnChat', value);
                  }}
                />
              </View>
            );
          })
        ) : (
          <Text>No messages</Text>
        )}
      </View>
    );
  }
}

// collection message => masuk uid teacher => collection chatWith => get + mapping pake onSnapshot

const mapStateToProps = state => {
  return {
    dataUser: state.userReducer.dataUser,
  };
};

const mapDispatchToProps = send => {
  return {
    chatData: data =>
      send({
        type: 'CHAT-DATA',
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    paddingHorizontal: 17,
    paddingTop: 30,
    backgroundColor: colors.whiteBlue,
  },
  text: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 20,
    marginBottom: 20,
  },
});
