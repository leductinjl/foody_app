import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Images from '../constants/Images';

interface CategoryMenuItemProps {
  name: string;
  logo: keyof typeof Images;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({ name, logo, activeCategory, setActiveCategory }) => {
  const isActive = activeCategory === name;

  return (
    <TouchableOpacity onPress={() => setActiveCategory(name)} style={styles.category}>
      <Image source={Images[logo]} style={[styles.categoryIcon, { opacity: isActive ? 1 : 0.5 }]} />
      <Text style={[styles.categoryText, { opacity: isActive ? 1 : 0.5 }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    marginTop: 0,
  } as ViewStyle,
  categoryIcon: {
    height: 30,
    width: 30,
  } as ImageStyle,
  categoryText: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: Fonts.BALO_MEDIUM,
    color: Colors.DEFAULT_WHITE,
    marginTop: 5,
  } as TextStyle,
});

export default CategoryMenuItem;
