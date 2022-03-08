import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? '#00CCFF' : '#EBF0FF';

  return (
    <View
      style={{
        width: 12,
        height: 6,
        marginHorizontal: 3,
        borderRadius: 5,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 17}} {...props}>
    <Text style={styles.textButton}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 17}} {...props}>
    <Text style={styles.textButton}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 17}} {...props}>
    <Text style={styles.textButton}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      titleStyles={styles.title}
      subTitleStyles={styles.subTitle}
      containerStyles={styles.container}
      bottomBarColor={colors.whiteBlue}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: colors.whiteBlue,
          image: (
            <Image
              source={require('../../assets/images/Onboarding1.png')}
              style={styles.image}
            />
          ),
          title: 'Learn with the best tutors',
          subtitle:
            'Take personalized lessons with expert\nand professional tutors',
        },
        {
          backgroundColor: colors.whiteBlue,
          image: (
            <Image
              source={require('../../assets/images/Onboarding2.png')}
              style={styles.image}
            />
          ),
          title: 'Explore your knowlage',
          subtitle:
            'Choose course what you want and\nchoose totors whatever you want!',
        },
        {
          backgroundColor: colors.whiteBlue,
          image: (
            <Image
              source={require('../../assets/images/Onboarding3.png')}
              style={styles.image}
            />
          ),
          title: 'Study anytime, Learn anywhere!',
          subtitle:
            'You can choose time what you\nwant and you can study anywhere',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary.medium,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.primary.regular,
  },
  image: {
    width: responsiveWidth(380),
  },
  textButton: {
    fontFamily: fonts.primary.regular,
    fontSize: 15,
    color: colors.gray,
  },
});
