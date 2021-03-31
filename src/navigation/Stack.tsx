import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { navigationRef } from '../services/navigation';
import { Routes } from './routes';
import { AssociatedProfile } from '../interface/types';

import Discover from '../screens/Discover';
import PartnerProfile from '../screens/PartnerProfile';
import Options from '../screens/Options';

export type MainStackParamList = {
  PartnerProfile: { profile: AssociatedProfile };
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainScreens() {
  return (
    <MainStack.Navigator
      screenOptions={{
        stackPresentation: 'push',
        gestureEnabled: true,
      }}>
      <MainStack.Screen
        name="Tabs"
        component={TabScreens}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={Routes.PartnerProfile}
        component={PartnerProfile}
        options={{
          title: 'Partner Profile',
        }}
      />
    </MainStack.Navigator>
  );
}

const DiscoverStack = createNativeStackNavigator();

function DiscoverStackScreens() {
  return (
    <DiscoverStack.Navigator
      screenOptions={{
        stackPresentation: 'push',
        gestureEnabled: true,
      }}>
      <DiscoverStack.Screen
        name={Routes.Discover}
        component={Discover}
        options={{
          headerLargeTitle: true,
          title: 'Discover',
        }}
      />
    </DiscoverStack.Navigator>
  );
}

const OptionsStack = createNativeStackNavigator();

function OptionsStackScreens() {
  return (
    <OptionsStack.Navigator
      initialRouteName={Routes.Options}
      screenOptions={{
        stackPresentation: 'push',
        gestureEnabled: true,
      }}>
      <OptionsStack.Screen
        name={Routes.Options}
        component={Options}
        options={{
          headerLargeTitle: true,
          title: 'Options',
        }}
      />
    </OptionsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === Routes.Discover) {
            iconName = `animation${focused ? '' : '-outline'}`;
          } else if (route.name === Routes.Options) {
            iconName = 'dots-horizontal';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}>
      <Tab.Screen
        name={Routes.Discover}
        component={DiscoverStackScreens}
        options={{
          title: 'Discover',
        }}
      />
      <Tab.Screen
        name={Routes.Options}
        component={OptionsStackScreens}
        options={{
          title: 'Options',
        }}
      />
    </Tab.Navigator>
  );
}

export type RootStackParamList = {
  Root: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function NavigationStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          stackPresentation: 'modal',
        }}>
        <RootStack.Screen name="Root" component={MainScreens} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationStack;
