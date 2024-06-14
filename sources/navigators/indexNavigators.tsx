import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RegisterPhoneScreen from "../screens/RegisterPhoneScreen";
import VerificationScreen from "../screens/VerificationScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import GeneralAction from "../actions/GeneralAction";
import { useSelector, useDispatch } from "react-redux";
import FoodScreen from "../screens/FoodScreen";
import HomeTabs from './BottomTabs'

const Stack = createNativeStackNavigator();

const Navigators = () => {
  
  const {isAppLoading, token, isFirstTimeUse} = useSelector(
    (state: any) => state?.generalState,
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(GeneralAction.appStart());
  }, []);

  // Define RestaurantScreenComponent here
  const RestaurantScreenComponent = ({ navigation, route }: { navigation: any; route: any }) => (
    <RestaurantScreen 
      navigation={navigation} 
      route={route} 
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            )}
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="RegisterPhone"
              component={RegisterPhoneScreen}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen 
              name="Restaurant" 
              component={RestaurantScreenComponent}
            />
            <Stack.Screen name="Food" component={FoodScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
