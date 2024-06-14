import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import Display from '../utils/Display';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import BookmarkScreen from '../screens/BookmarkScreen';

const BottomTabs = createBottomTabNavigator();

export default () => (
  <BottomTabs.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: Display.setHeight(8),
        backgroundColor: Colors.DEFAULT_WHITE,
        borderTopWidth: 0,
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.DEFAULT_GREEN,
      tabBarInactiveTintColor: Colors.INACTIVE_GREY,
    }}
    >
    <BottomTabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="home-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Bookmark"
      component={BookmarkScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="bookmark-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="cart-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="person-outline" size={23} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);