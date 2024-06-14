import React from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Separator from '../components/Separator';
import Display from '../utils/Display';
import BookmarkCard from '../components/BookmarkCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { NavigationProp } from '@react-navigation/native'; // Add this import

interface BookmarkScreenProps {
  navigation: NavigationProp<any>; // Adjust the type as per your navigation setup
}

const ListItemSeparator = () => (
  <View
    style={{
      height: 0.8,
      backgroundColor: Colors.DEFAULT_GREY,
      width: '100%',
      marginVertical: 10,
    }}
  />
);

const BookmarkScreen: React.FC<BookmarkScreenProps> = ({ navigation }) => {
  const bookmarks = useSelector((state: any) => state?.bookmarkState?.bookmarks); // Adjust the type as per your Redux state structure
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight || 0} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
          color={Colors.DEFAULT_BLACK}
        />
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>
      <FlatList
        style={styles.bookmarkList}
        data={bookmarks}
        keyExtractor={item => item?.restaurantId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Separator height={10} />}
        ListFooterComponent={() => <Separator height={10} />}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }) => (
          <BookmarkCard
            {...item?.restaurant}
            navigate={restaurantId =>
              navigation.navigate('Restaurant', { restaurantId })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.BALO_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
    color: Colors.DEFAULT_BLACK
  },
  bookmarkList: {
    marginHorizontal: 20,
  },
});

export default BookmarkScreen;
