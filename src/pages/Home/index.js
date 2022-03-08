import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {IconArrowRight, IconSearch} from '../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {
  BannerSlider,
  CCardTeacher,
  CCircleCategories,
  CGap,
} from '../../components';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
// import {getUser} from '../../actions/UserAction';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataTeacher: [],
      dataFilter: [],
    };
  }

  componentDidMount() {
    firestore()
      .collection('users')
      .where('role', '==', 'teacher')
      .onSnapshot(value => {
        this.setState({
          dataTeacher: value.docs.map(result => {
            return result.data();
          }),
        });
      });
  }

  _category = categories => {
    this.setState(prevState => ({
      dataFilter: prevState.dataTeacher.filter(
        value => value.categories === categories,
      ),
    }));
  };

  render() {
    const {navigation, dataUser} = this.props;
    const {dataTeacher, dataFilter} = this.state;
    return (
      <ScrollView style={styles.page}>
        <View style={styles.header}>
          <IconSearch />
          <TextInput placeholder="Search keywords" style={styles.textInput} />
        </View>
        <CGap height={10} />
        <BannerSlider />
        <View style={styles.textCategoriesWrapper}>
          <Text style={styles.textCategories}>Categories</Text>
          <TouchableOpacity style={styles.arrowRight}>
            <IconArrowRight />
          </TouchableOpacity>
        </View>
        <View style={styles.circleCategories}>
          <CCircleCategories
            icon="Programming"
            backgroundColor={colors.lightBlue}
            categories="Programming"
            onPress={() => this._category('Programming')}
          />
          <CCircleCategories
            icon="Language"
            backgroundColor={colors.lightYellow}
            categories="Language"
            onPress={() => this._category('Language')}
          />
          <CCircleCategories
            backgroundColor={colors.lightGreen}
            categories="Psychology"
            onPress={() => this._category('Psychology')}
          />
        </View>
        {dataFilter.length > 0
          ? dataFilter.map((value, index) => {
              return (
                <CCardTeacher
                  key={index}
                  onPress={() => {
                    navigation.navigate('TeacherDetail', value);
                  }}
                  name={value.name}
                  image={value.image}
                  categories={value.categories}
                  price={value.price}
                  description={value.description}
                />
              );
            })
          : dataTeacher.map((value, index) => {
              return (
                <CCardTeacher
                  key={index}
                  onPress={() => {
                    navigation.navigate('TeacherDetail', value);
                  }}
                  name={value.name}
                  image={value.image}
                  categories={value.categories}
                  price={value.price}
                  description={value.description}
                />
              );
            })}
        <CGap height={70} />
      </ScrollView>
    );
  }
}

const mapStatetoProps = state => ({
  dataUser: state.userReducer.dataUser,
});

export default connect(mapStatetoProps)(Home);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: colors.whiteBlue,
  },
  header: {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  textInput: {
    color: colors.black,
    fontFamily: fonts.primary.regular,
    width: '100%',
    marginLeft: 15,
    fontSize: 14,
  },
  textCategoriesWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textCategories: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 17,
    color: colors.black,
  },
  arrowRight: {
    width: responsiveWidth(30),
    height: responsiveHeight(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCategories: {
    flexDirection: 'row',
    marginBottom: 15,
  },
});
