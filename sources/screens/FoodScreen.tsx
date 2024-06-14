import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import ApiContants from '../constants/ApiContants';
import Images from '../constants/Images';
import StaticImageService from '../services/StaticImageService';
import Display from '../utils/Display';
import Separator from '../components/Separator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import CartAction from '../actions/CartAction';
import FoodService from '../services/FoodService';


interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  ingredients?: string;
}

const FoodScreen = ({
  navigation,
  route: {
    params: { foodId },
  },
}: any) => {
  const [food, setFood] = useState<Food | null>(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState('Details');

  const dispatch = useDispatch();

  const itemCount = useSelector(
    (state: any) =>
      state?.cartState?.cart?.cartItems?.find(
        (item: any) => item?.foodId === foodId
      )?.count
  );

  useEffect(() => {
    FoodService.getOneFoodById(foodId).then(response => {
      console.log(response?.data);
      setFood(response?.data);
    });
  }, []);

  const addToCart = (foodId: string) => dispatch<any>(CartAction.addToCart({ foodId }));
  const removeFromCart = (foodId: string) =>
    dispatch<any>(CartAction.removeFromCart({ foodId }));

  const setStyle = (isActive: boolean) =>
    isActive
      ? styles.subMenuButtonText
      : {...styles.subMenuButtonText, color: Colors.DEFAULT_GREY};

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      {food && (
        <Image
          style={styles.image}
          source={{
            uri: StaticImageService.getGalleryImage(
              food.image,
              ApiContants.STATIC_IMAGE.SIZE.SQUARE
            ),
          }}
        />
      )}
      <ScrollView>
        <Separator height={Display.setWidth(100)} />
        <View style={styles.mainContainer}>
          <View style={styles.titleHeaderContainer}>
            <Text style={styles.titleText}>{food?.name}</Text>
            <Text style={styles.priceText}>{food?.price} đ</Text>
          </View>
          <View style={styles.subHeaderContainer}>
            <View style={styles.rowAndCenter}>
              <FontAwesome name="star" size={20} color={Colors.DEFAULT_YELLOW} />
              <Text style={styles.ratingText}>4.2</Text>
              <Text style={styles.reviewsText}>(255)</Text>
            </View>
            <View style={styles.rowAndCenter}>
              <Image style={styles.iconImage} source={Images.DELIVERY_TIME} />
              <Text style={styles.deliveryText}>20 phút</Text>
            </View>
            <View style={styles.rowAndCenter}>
              <Image style={styles.iconImage} source={Images.DELIVERY_CHARGE} />
              <Text style={styles.deliveryText}>Miễn phí giao hàng</Text>
            </View>
          </View>
          <View style={styles.subMenuContainer}>
            <TouchableOpacity
              style={styles.subMenuButtonContainer}
              onPress={() => setSelectedSubMenu('Details')}
            >
              <Text style={setStyle(selectedSubMenu === 'Details')}>Thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subMenuButtonContainer}
              onPress={() => setSelectedSubMenu('Reviews')}
            >
              <Text style={setStyle(selectedSubMenu === 'Reviews')}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            {food?.description && (
              <>
                <Text style={styles.detailHeader}>Mô tả</Text>
                <Text style={styles.detailContent}>{food?.description}</Text>
              </>
            )}
            {food?.ingredients && (
              <>
                <Text style={styles.detailHeader}>Thành phần</Text>
                <Text style={styles.detailContent}>{food?.ingredients}</Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <View style={styles.itemAddContainer}>
          <AntDesign
            name="minus"
            color={Colors.DEFAULT_YELLOW}
            size={18}
            onPress={() => removeFromCart(foodId)}
          />
          <Text style={styles.itemCountText}>{itemCount ? itemCount : 0}</Text>
          <AntDesign
            name="plus"
            color={Colors.DEFAULT_YELLOW}
            size={18}
            onPress={() => addToCart(foodId)}
          />
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.8}
        >
          <Text style={styles.cartButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  image: {
    position: 'absolute',
    height: Display.setWidth(100),
    width: Display.setWidth(100),
    top: 0,
  },
  mainContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  titleText: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  priceText: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    color: Colors.DEFAULT_YELLOW,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.BALO_BOLD,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
  },
  reviewsText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.BALO_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
  },
  iconImage: {
    height: 20,
    width: 20,
  },
  deliveryText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.BALO_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 3,
  },
  subMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    marginTop: 20,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: 'space-evenly',
  },
  subMenuButtonContainer: {
    paddingVertical: 15,
    width: Display.setWidth(30),
    alignItems: 'center',
  },
  subMenuButtonText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailHeader: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
    marginTop: 10,
    marginBottom: 2,
  },
  detailContent: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    color: Colors.INACTIVE_GREY,
    textAlign: 'justify',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: Display.setWidth(5),
    justifyContent: 'space-between',
    backgroundColor: Colors.DEFAULT_WHITE,
    width: Display.setWidth(100),
    paddingVertical: Display.setWidth(2.5),
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    height: Display.setHeight(6),
    width: Display.setWidth(30),
    justifyContent: 'center',
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    marginHorizontal: 8,
  },
  cartButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: Display.setHeight(6),
    width: Display.setWidth(58),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cartButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.BALO_MEDIUM,
  },
});

export default FoodScreen;
