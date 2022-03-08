import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {Slider1, Slider2} from '../../../assets';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';

export default class BannerSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [Slider1, Slider2],
    };
  }

  render() {
    const {images} = this.state;
    return (
      <View style={styles.container}>
        <SliderBox
          images={images}
          autoplay
          circleLoop
          sliderBoxHeight={responsiveHeight(246)}
          ImageComponentStyle={styles.slider}
          dotStyle={styles.dotStyle}
          dotColor={colors.primary}
          imageLoadingColor={colors.primary}
          parentWidth={responsiveWidth(380)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(380),
  },
  slider: {
    borderRadius: 10,
  },
  dotStyle: {
    width: 10,
    height: 5,
    borderRadius: 5,
  },
});
