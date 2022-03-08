import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {IconBack, IconBCA} from '../../assets';
import {CButton, CGap} from '../../components';
import {
  colors,
  fonts,
  getUniqueCode,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
  toastAndroidCenter,
} from '../../utils';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.route.params,
      image: '',
      isLoading: false,
    };
  }

  _donePayment = async () => {
    const {data, image, isLoading} = this.state;
    const {price, teacher, idTeacher, dateLesson} = data;
    this.setState({isLoading: true});
    const {dataUser, navigation} = this.props;
    let idMix = `${dataUser.uid.substr(24)}${data.idTeacher.substr(24)}`;
    const ordersID = getUniqueCode(new Date(), idMix);
    let urlImage;
    await storage().ref(`orders/${ordersID}/payment.jpg`).putFile(image);
    await storage()
      .ref(`orders/${ordersID}/payment.jpg`)
      .getDownloadURL()
      .then(res => (urlImage = res));
    await firestore()
      .collection('orders')
      .doc(ordersID)
      .set({
        paymentImage: urlImage,
        price: price,
        teacher: teacher,
        idUser: dataUser.uid,
        idTeacher: idTeacher,
        user: dataUser.name,
        isDone: false,
        isPaid: true,
        dateOrder: new Date(),
        dateLesson: dateLesson,
        ordersID: ordersID,
      })
      .then(() => {
        toastAndroidCenter('Order success');
        navigation.replace('MainApp');
      });
  };

  _pickImage = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({image: image.path});
    });
  };

  render() {
    const {navigation} = this.props;
    const {data, image, isLoading} = this.state;
    return (
      <ScrollView style={styles.pages}>
        <View>
          <TouchableOpacity
            style={{marginBottom: 30}}
            onPress={() => {
              navigation.goBack('');
            }}>
            <IconBack />
          </TouchableOpacity>
          <Text style={styles.textMedium}>Please transfer to </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textMedium}>Charisma Kurniawan Aji</Text>
            <IconBCA />
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.textNumber}>497 108 7425</Text>
          </View>
          <Text style={styles.textMedium}>Amount Pay</Text>
          <View style={styles.wrapper}>
            <Text style={styles.textNumber}>
              Rp. {numberWithCommas(data.price)}
            </Text>
          </View>
        </View>
        <CGap height={30} />
        <TouchableOpacity
          style={styles.wrapperImage}
          onPress={() => this._pickImage()}>
          <Image
            source={
              image
                ? {uri: image}
                : require('../../assets/images/DefaultImage.png')
            }
            style={{width: '100%', height: '100%'}}
          />
        </TouchableOpacity>
        <CGap height={40} />
        <CButton
          text="I Have Complited Payment"
          fontFamily={fonts.primary.regular}
          onPress={() => this._donePayment()}
          isLoading={isLoading}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataUser: state.userReducer.dataUser,
  };
};

export default connect(mapStateToProps)(Payment);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    paddingHorizontal: 17,
    paddingTop: 30,
    backgroundColor: colors.whiteBlue,
  },
  textMedium: {
    fontFamily: fonts.primary.medium,
    fontSize: 15,
    marginBottom: 5,
  },
  textNumber: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 15,
  },
  wrapper: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  wrapperImage: {
    height: responsiveHeight(250),
    width: responsiveWidth(360),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2,
  },
});
