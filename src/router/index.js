import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  Splash,
  Profile,
  Chat,
  OnboardingScreen,
  Login,
  Register,
  TeacherDetail,
  OnChat,
  PickDate,
  Payment,
  RegisterTeacher,
  RegisterTeacherSkill,
  ChatScreenTeacher,
  NotifScreenTeacher,
  ProfileScreenTeacher,
  EditProfile,
  ChangePassword,
  TermCondition,
  EditProfileTeacher,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator, TeacherBottomNavigator} from '../components/Big';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Chat" component={Chat} options={{headerShown: false}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const TeacherMainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <TeacherBottomNavigator {...props} />}>
      <Tab.Screen name="Chat" component={Chat} options={{headerShown: false}} />
      <Tab.Screen
        name="NotifScreenTeacher"
        component={NotifScreenTeacher}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ProfileScreenTeacher"
        component={ProfileScreenTeacher}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TeacherDetail"
        component={TeacherDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnChat"
        component={OnChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PickDate"
        component={PickDate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterTeacher"
        component={RegisterTeacher}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterTeacherSkill"
        component={RegisterTeacherSkill}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TeacherMainApp"
        component={TeacherMainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermCondition"
        component={TermCondition}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileTeacher"
        component={EditProfileTeacher}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
