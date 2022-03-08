import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {IconBack} from '../../assets';
import {CImageCircle, CButton, CGap} from '../../components';

export default class TeacherDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTeacher: this.props.route.params,
    };
  }

  render() {
    const {navigation} = this.props;
    const {image, name, price, description, skills} = this.state.dataTeacher;
    const {dataTeacher} = this.state;
    return (
      <ScrollView style={styles.page} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={{marginBottom: 30}}
          onPress={() => {
            navigation.goBack('');
          }}>
          <IconBack />
        </TouchableOpacity>
        <Image source={{uri: image}} style={styles.imageHeader} />
        <CGap height={15} />
        <View style={styles.photoName}>
          <CImageCircle image={{uri: image}} />
          <View style={{marginLeft: 15}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>Jakarta, Indonesia</Text>
          </View>
        </View>
        <View style={styles.rating}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.name}>Rp {numberWithCommas(price)}</Text>
            <Text style={styles.location}>per hour</Text>
          </View>
        </View>
        <View style={styles.border}>
          <CButton
            text="Message me"
            backgroundColor={colors.darkBlue}
            color={colors.lightBlue}
            onPress={() => {
              navigation.navigate('OnChat', dataTeacher);
            }}
          />
        </View>
        <View style={styles.border}>
          <Text style={styles.name}>About Me</Text>
          <Text style={styles.biodata}>{description}</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.name}>My Skill</Text>
          <CGap height={10} />
          {skills.map((value, index) => {
            return (
              <View key={index}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{paddingHorizontal: 10}}>
                    <Text style={styles.skills}>{value.skill}</Text>
                  </View>
                  <View style={styles.wrapperSkill}>
                    <Text style={styles.textSkill}>{value.level}</Text>
                  </View>
                </View>
                <CGap height={5} />
              </View>
            );
          })}
        </View>
        <CButton
          text="Book lesson"
          onPress={() => {
            navigation.navigate('PickDate', dataTeacher);
          }}
        />
        <CGap height={70} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.whiteBlue,
    paddingHorizontal: 17,
    paddingTop: 30,
  },
  imageHeader: {
    width: responsiveWidth(380),
    height: responsiveHeight(246),
  },
  photoName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontFamily: fonts.primary.medium,
    fontSize: 15,
  },
  location: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.gray,
  },
  rating: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.2,
    borderColor: colors.gray,
  },
  textStar: {
    fontFamily: fonts.primary.medium,
    fontSize: 15,
    color: colors.orange,
    marginRight: 2,
  },
  star: {
    width: 13,
    height: 11.7,
    marginTop: -5,
    marginLeft: 3,
  },
  border: {
    paddingVertical: 20,
    borderTopWidth: 0.2,
    borderColor: colors.gray,
  },
  biodata: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.gray,
    marginVertical: 10,
  },
  wrapperSkill: {
    paddingHorizontal: 10,
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  textSkill: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.primary,
  },
  textSkills: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.gray,
  },
});
