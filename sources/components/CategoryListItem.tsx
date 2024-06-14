import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const CategoryListItem = ({name, isActive, selectCategory}: 
{name: string, isActive: boolean, selectCategory: 
(name: string) => void}) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          isActive ? styles.activeCategoryText : styles.inActiveCategoryText
        }
        onPress={() => selectCategory(name)}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_YELLOW,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  activeCategoryText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.BALO_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  inActiveCategoryText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    color: Colors.INACTIVE_GREY,
  },
});

export default CategoryListItem;