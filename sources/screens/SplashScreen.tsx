import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Display from '../utils/Display';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Fonts from '../constants/Fonts';

interface SplashScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Image source={Images.BIBIMBAP} resizeMode="contain" style={styles.image} />
      <Text style={styles.titleText}>Foody</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 32,
    fontFamily: Fonts.BALO_BOLD,
  },
});

export default SplashScreen;
