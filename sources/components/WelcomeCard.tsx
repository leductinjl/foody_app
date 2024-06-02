import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Display from '../utils/Display';
import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import Colors from '../constants/Colors';

interface WelcomeCardProps {
  title: string;
  content: string;
  image: keyof typeof Images; 
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ title, content, image }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Images[image]} resizeMode="contain" />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(100),
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    fontSize: 22,
    fontFamily: Fonts.BALO_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  contentText: {
    fontSize: 18,
    fontFamily: Fonts.BALO_REGULAR,
    textAlign: 'center',
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK,
  },
});

export default WelcomeCard;
