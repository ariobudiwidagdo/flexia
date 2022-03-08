import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {CNotification} from '../../components';
import {colors, fonts, toastAndroidCenter} from '../../utils';
import firestore from '@react-native-firebase/firestore';
import {convertDate, convertTime} from '../../utils/util/date';

class NotifScreenTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const {dataUser} = this.props;
    firestore()
      .collection('orders')
      .where('idTeacher', '==', dataUser.uid)
      .onSnapshot(res => {
        let data = res.docs.map(getData => {
          return getData.data();
        });
        this.setState({
          orders: data,
        });
      });
  }

  _finish = data => {
    this.setState({isLoading: true});
    firestore()
      .collection('orders')
      .doc(data.ordersID)
      .update({
        isDone: true,
      })
      .then(() => {
        this.setState({isLoading: false});
        toastAndroidCenter('Class finished');
      });
  };

  render() {
    const {orders, isLoading} = this.state;
    return (
      <ScrollView style={styles.pages}>
        <Text style={styles.text}> Notification </Text>
        {orders.map((value, index) => {
          return (
            <CNotification
              name={value.user}
              image={value.paymentImage}
              time={convertTime(value.dateLesson.toDate())}
              onPress={() => this._finish(value)}
              key={index}
              isDone={value.isDone}
              isLoading={isLoading}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataUser: state.userReducer.dataUser,
  };
};

export default connect(mapStateToProps)(NotifScreenTeacher);

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
