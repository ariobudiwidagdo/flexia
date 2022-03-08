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
import ModalSelector from 'react-native-modal-selector';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

export default class EditProfileTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [
        {
          skill: '',
          level: 'Junior',
        },
      ],
      dataUser: this.props.route.params,
      fullName: '',
      address: '',
      phone: '',
      image: '',
      imagePick: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    const {dataUser} = this.state;
    firestore()
      .collection('users')
      .doc(dataUser.uid)
      .onSnapshot(data => {
        const {skills, name, address, phone, image} = data.data();
        this.setState({
          skills: skills,
          fullName: name,
          address: address ? address : '',
          phone: phone ? phone : '',
          image: image,
        });
      });
  }

  _save = async () => {
    const {fullName, address, phone, imagePick, skills} = this.state;
    const {dataUser} = this.state;
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
          skills: skills,
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
          skills: skills,
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

  _inputHandler = (value, inputType, index) => {
    let input = [...this.state.skills];
    input[index][inputType] = value;
    this.setState({skills: input});
  };

  _addSkill = () => {
    let inputan = {skill: '', level: 'Junior'};
    this.setState(prevState => ({
      skills: [...prevState.skills, inputan],
    }));
  };

  render() {
    const {navigation} = this.props;
    const {skills, fullName, address, phone, imagePick, image, isLoading} =
      this.state;
    let index = 0;
    const skill = [
      {key: index++, label: 'Junior'},
      {key: index++, label: 'Medium'},
      {key: index++, label: 'Senior'},
    ];
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
                backgroundColor={colors.primary}
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
            placeholder="Input your phone number"
            value={phone}
            onChangeText={phone => {
              this.setState({phone});
            }}
          />
          <CGap height={20} />
          <View style={styles.wrapperInput}>
            <Text style={styles.textTitle}>Input Skills</Text>
            {skills.map((value, key) => {
              return (
                <View key={key}>
                  <CTextInput
                    borderWidth={0.2}
                    placeholder="React, Psychology, ect"
                    value={value.skill}
                    onChangeText={e => this._inputHandler(e, 'skill', key)}
                  />
                  <CGap height={5} />
                  <ModalSelector
                    data={skill}
                    initValue={value.level}
                    onChange={op => {
                      this._inputHandler(op.label, 'level', key);
                    }}
                  />
                  <CGap height={10} />
                </View>
              );
            })}
            <CGap height={10} />
            <CButton
              text="Add Other Skills"
              onPress={this._addSkill}
              backgroundColor={colors.darkBlue}
            />
            <CGap height={15} />
          </View>
        </ScrollView>
        <CGap height={100} />
        <TouchableOpacity style={styles.wrapperButton}>
          <CButton
            text="Save"
            onPress={() => this._save()}
            isLoading={isLoading}
          />
        </TouchableOpacity>
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
