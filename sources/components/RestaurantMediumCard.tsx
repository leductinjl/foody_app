import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Display from '../utils/Display';
import Images from '../constants/Images';
import StaticImageService from '../services/StaticImageService';

interface RestaurantMediumCardProps {
  id: string;
  name: string;
  images: { poster: string; logo?: string }; // Make the logo property optional
  time: number; // Change the type of time to number
  distance: string;
  tags: string[];
  navigate: () => void;
}

const RestaurantMediumCard: React.FC<RestaurantMediumCardProps> = ({ id, name, images, time, distance, tags, navigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      <View>
      <Image
        source={{ uri: StaticImageService.getLogo(images.logo || '') }} // Provide a fallback value of an empty string ''
        style={styles.posterStyle}
      />

      </View>
      <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{name}</Text>
          <View style={styles.rowAndCenter}>
            
            <Text style={styles.ratingText}>4.2</Text>
            <Text style={styles.reviewsText}>({233})</Text>
          </View>
        </View>
        <Text style={styles.tagsText}>{tags?.join(' • ')}</Text>
        <View style={styles.deliveryDetailsContainer}>
          <View style={styles.rowAndCenter}>
            <Image
              source={Images.DELIVERY_CHARGE}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>Giao hàng miễn phí</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image
              source={Images.DELIVERY_TIME}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>{time} phút</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image style={styles.deliveryDetailsIcon} />
            <Text style={styles.deliveryDetailsText}>{distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    elevation: 1,
    borderRadius: 8,
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
  },
  posterStyle: {
    width: Display.setWidth(20),
    height: Display.setWidth(20),
    borderRadius: 10,
    margin: 5,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.BALO_BOLD,
    color: Colors.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagsText: {
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: Fonts.BALO_MEDIUM,
    color: Colors.DEFAULT_GREY,
    marginBottom: 7,
  },
  deliveryDetailsText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailsIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.BALO_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.BALO_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },
});

export default RestaurantMediumCard;