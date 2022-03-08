import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {connect} from 'react-redux';
import {DefaultImage, IconBack} from '../../assets';
import {CButton, CGap, CTextInput} from '../../components';
import {colors, fonts, responsiveHeight} from '../../utils';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

class RegisterTeacherSkill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: 'Select Category',
      image: '',
      specialization: '',
      pricePerHour: '',
      skills: [
        {
          skill: '',
          level: 'Junior',
        },
      ],
      description: '',
      isLoading: false,
    };
  }

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

  _submit = () => {
    const {
      categories,
      image,
      specialization,
      pricePerHour,
      skills,
      description,
    } = this.state;
    const {name, email, password} = this.props.route.params;
    this.setState({isLoading: true});
    let urlImage;
    if (categories && specialization && pricePerHour && skills && description) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async res => {
          await storage()
            .ref(`users/${res.user.uid}/profile.jpg`)
            .putFile(image);
          await storage()
            .ref(`users/${res.user.uid}/profile.jpg`)
            .getDownloadURL()
            .then(res => (urlImage = res));
          await firestore()
            .collection('users')
            .doc(res.user.uid)
            .set({
              name: name,
              email: email,
              uid: res.user.uid,
              image: urlImage,
              categories: categories,
              specialization: specialization,
              price: Number(pricePerHour),
              skills: skills,
              description: description,
              role: 'teacher',
            });
        })
        .then(() => alert('Registrer success'))
        .finally(() => {
          this.setState({isLoading: false});
          this.props.navigation.replace('Login');
        });
    } else {
      Alert.alert('Error', 'You need to input all of them');
    }
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
    const {
      categories,
      image,
      specialization,
      pricePerHour,
      skills,
      description,
      isLoading,
    } = this.state;
    let index = 0;
    const data = [
      {key: index++, label: 'Programming'},
      {key: index++, label: 'Language'},
      {key: index++, label: 'Psychology'},
    ];
    const skill = [
      {key: index++, label: 'Junior'},
      {key: index++, label: 'Medium'},
      {key: index++, label: 'Senior'},
    ];
    return (
      <ScrollView style={styles.pages}>
        <TouchableOpacity
          style={{marginBottom: 30}}
          onPress={() => {
            navigation.goBack('');
          }}>
          <IconBack />
        </TouchableOpacity>
        <Text style={styles.textAddImage}>Add Image</Text>
        <TouchableOpacity
          style={styles.wrapperUpload}
          onPress={() => this._pickImage()}>
          <Image
            source={image ? {uri: image} : DefaultImage}
            style={{width: '100%', height: '100%'}}
          />
        </TouchableOpacity>
        <CGap height={25} />
        <View style={styles.wrapperInput}>
          <Text style={styles.textTitle}>Specialization</Text>
          <CTextInput
            borderWidth={0.2}
            placeholder="Psychology, English Teacher, ect"
            value={specialization}
            onChangeText={specialization => {
              this.setState({specialization});
            }}
          />
        </View>
        <View style={styles.wrapperInput}>
          <Text style={styles.textTitle}>Price per hour</Text>
          <CTextInput
            borderWidth={0.2}
            placeholder="Rp. X00.000"
            type="numeric"
            value={pricePerHour}
            onChangeText={pricePerHour => {
              this.setState({pricePerHour: pricePerHour});
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.wrapperInput}>
          <Text style={styles.textTitle}>Pick Categories</Text>
          <ModalSelector
            data={data}
            initValue={categories}
            onChange={op => {
              this.setState({categories: op.label});
            }}
            overlayStyle={styles.input}
          />
        </View>
        <View style={styles.wrapperInput}>
          <Text style={styles.textTitle}>Input Skills</Text>
          {skills.map((value, key) => {
            return (
              <View key={key}>
                <CTextInput
                  borderWidth={0.2}
                  placeholder="React, Psychology, ect"
                  onChangeText={e => this._inputHandler(e, 'skill', key)}
                />
                <CGap height={5} />
                <ModalSelector
                  data={skill}
                  initValue={skills[key].level}
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
        <CTextInput
          textarea
          width={'100%'}
          height={responsiveHeight(500)}
          placeholder="Description"
          value={description}
          onChangeText={description => {
            this.setState({description});
          }}
        />
        <CGap height={25} />
        <CButton
          text="Register"
          isLoading={isLoading}
          onPress={() => {
            this._submit();
          }}
        />
        <CGap height={70} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    teacherData: state.teacherData,
  };
};

const mapDispatchToProps = send => {
  return {
    addTeacherData: data =>
      send({
        type: 'ADD-TEACHER-DATA',
        payload: data,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterTeacherSkill);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.whiteBlue,
    paddingHorizontal: 17,
    paddingTop: 30,
  },
  wrapperUpload: {
    height: responsiveHeight(250),
    width: '100%',
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAddImage: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 17,
  },
  textTitle: {
    fontFamily: fonts.primary.regular,
    fontSize: 15,
    marginBottom: 5,
  },
  wrapperInput: {
    marginBottom: 15,
  },
});
