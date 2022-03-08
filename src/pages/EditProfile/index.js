import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {DefaultImage, IconBack} from '../../assets';
import {colors, fonts, responsiveWidth, toastAndroidCenter} from '../../utils';
import {CButton, CGap, CImageCircle, CTextInput} from '../../components';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    const {name} = this.props.dataUser;
    this.state = {
      fullName: name,
      address: '',
      phone: '',
      image: '',
      isLoading: false,
      imagePick: '',
    };
  }

  componentDidMount() {
    const {dataUser} = this.props;
    firestore()
      .collection('users')
      .doc(dataUser.uid)
      .onSnapshot(data => {
        this.setState({
          fullName: data.data().name,
          address: data.data().address,
          phone: data.data().phone,
          image: data.data().image,
        });
      });
  }

  _save = async () => {
    const {fullName, address, phone, imagePick} = this.state;
    const {dataUser} = this.props;
    this.setState({isLoading: true});
    let urlImage;
    if (imagePick !== '') {
      await storage()
        .ref(`users/${dataUser.uid}/profile.jpg`)
        .putFile(imagePick);
      await storage()
        .ref(`users/${dataUser.uid}/profile.jpg`)
        .getDownloadURL()
        .then(res => (urlImage = res));
      await firestore()
        .collection('users')
        .doc(dataUser.uid)
        .update({
          name: fullName,
          phone: phone,
          address: address,
          image: urlImage,
        })
        .then(() => {
          this.setState({isLoading: false});
          toastAndroidCenter('Profile has update');
        });
    } else {
      firestore()
        .collection('users')
        .doc(dataUser.uid)
        .update({
          name: fullName,
          phone: phone,
          address: address,
        })
        .then(() => {
          this.setState({isLoading: false});
          toastAndroidCenter('Profile has update');
        });
    }
  };

  _pickImage = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({imagePick: image.path});
    });
  };

  render() {
    const {navigation} = this.props;
    const {fullName, address, phone, image, isLoading, imagePick} = this.state;
    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('');
            }}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.wrapperHeader}>
            <Text style={styles.title}>Edit Profile</Text>
            <TouchableOpacity onPress={() => this._pickImage()}>
              <CImageCircle
                width={responsiveWidth(80)}
                height={responsiveWidth(80)}
                image={
                  imagePick
                    ? {uri: imagePick}
                    : image
                    ? {uri: image}
                    : DefaultImage
                }
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Full name</Text>
          <CTextInput
            placeholder="Edit your full name"
            value={fullName}
            onChangeText={fullName => {
              this.setState({fullName});
            }}
          />
          <CGap height={15} />
          <Text style={styles.text}>Address</Text>
          <CTextInput
            placeholder="Add your address"
            value={address}
            onChangeText={address => {
              this.setState({address});
            }}
          />
          <CGap height={15} />
          <Text style={styles.text}>Phone</Text>
          <CTextInput
            placeholder="Edit your phone number"
            value={phone}
            onChangeText={phone => {
              this.setState({phone});
            }}
          />
        </ScrollView>
        <CGap height={100} />
        <TouchableOpacity style={styles.wrapperButton}>
          <CButton text="Save" onPress={this._save} isLoading={isLoading} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStatetoProps = state => ({
  dataUser: state.userReducer.dataUser,
});

export default connect(mapStatetoProps)(EditProfile);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    paddingHorizontal: 17,
    paddingTop: 30,
    backgroundColor: colors.whiteBlue,
  },
  title: {
    fontFamily: fonts.primary.medium,
    fontSize: 20,
    marginBottom: 20,
  },
  wrapperHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.gray,
    marginBottom: 5,
  },
  wrapperButton: {
    position: 'absolute',
    bottom: 0,
    width: responsiveWidth(380),
    marginLeft: 17,
    marginBottom: 30,
  },
  textTitle: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    marginBottom: 5,
  },
  wrapperInput: {
    marginBottom: 15,
  },
});
