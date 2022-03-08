import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Button} from 'react-native';
import {IconBack} from '../../assets';
import {CButton, CGap, CImageCircle} from '../../components';
import {colors, fonts, responsiveWidth, toastAndroidCenter} from '../../utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {convertDate, convertTimestamp} from '../../utils/util/date';

export default class PickDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerVisible: false,
      dataTeacher: this.props.route.params,
      date: '',
    };
  }

  _onContinue = () => {
    const {dataTeacher, date} = this.state;
    const {uid, name, price} = dataTeacher;
    const {navigation} = this.props;
    if (date === '') {
      toastAndroidCenter('You need pick a date');
    } else {
      let data = {
        idTeacher: uid,
        dateLesson: date,
        teacher: name,
        price: price,
      };
      navigation.navigate('Payment', data);
    }
  };

  _showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };

  _hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
    });
  };

  _handleConfirm = date => {
    if (convertTimestamp(date) <= convertTimestamp(new Date())) {
      alert('ga bisa');
    } else {
      this.setState({date: date});
    }
    this._hideDatePicker();
  };

  render() {
    const {navigation} = this.props;
    const {isDatePickerVisible, date} = this.state;
    const {image} = this.state.dataTeacher;
    return (
      <View style={styles.pages}>
        <TouchableOpacity
          style={{marginBottom: 30}}
          onPress={() => {
            navigation.goBack('');
          }}>
          <IconBack />
        </TouchableOpacity>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.textTitle}>1 day lesson</Text>
            <Text style={styles.textSub}>Select a day below</Text>
          </View>
          <CImageCircle image={{uri: image}} />
        </View>
        <CGap height={20} />
        <CButton
          backgroundColor={colors.darkBlue}
          text="Pick Date"
          onPress={this._showDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={this._handleConfirm}
          onCancel={this._hideDatePicker}
        />
        <CGap height={25} />
        <Text style={styles.date}>Pick Date</Text>
        <Text>{date ? convertDate(date) : date}</Text>
        <CGap height={25} />
        <View style={styles.wrapperButton}>
          <CButton text="Continue" onPress={() => this._onContinue()} />
        </View>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 25,
    borderBottomWidth: 0.2,
    borderColor: colors.gray,
  },
  textTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 20,
  },
  textSub: {
    fontFamily: fonts.primary.regular,
    fontSize: 15,
    color: colors.gray,
  },
  date: {
    fontFamily: fonts.primary.medium,
    fontSize: 15,
  },
  wrapperButton: {
    position: 'absolute',
    bottom: 0,
    width: responsiveWidth(380),
    marginLeft: 17,
    marginBottom: 30,
  },
});
