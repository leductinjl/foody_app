import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RegisterPhoneScreen from "../screens/RegisterPhoneScreen";
import VerificationScreen from "../screens/VerificationScreen";

const Stack = createNativeStackNavigator();

const Navigators = () => {
  
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
          <Stack.Screen 
              name="Verification" 
              component={VerificationScreen} 
              initialParams={{ phoneNumber: '' }} 
          />
      </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
export default Navigators;