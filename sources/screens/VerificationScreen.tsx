import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Display from '../utils/Display';
import Separator from '../components/Separator';

interface VerificationScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase, string>;
}


const VerificationScreen: React.FC<VerificationScreenProps> = ({ navigation, route }) => {
  const firstInput = useRef<TextInput>(null);
  const secondInput = useRef<TextInput>(null);
  const thirdInput = useRef<TextInput>(null);
  const fourthInput = useRef<TextInput>(null);
  const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
          color={Colors.DEFAULT_BLACK}
        />
      </View>
      <Text style={styles.title}>Xác thực số điện thoại</Text>
      <Text style={styles.content}>
        Nhập mã OTP được gửi đến số của bạn: {' '}
        <Text style={styles.phoneNumberText}>
          {(route.params as { phoneNumber: string }).phoneNumber}
        </Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({ ...otp, 1: text });
              text && secondInput.current?.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({ ...otp, 2: text });
              text ? thirdInput.current?.focus() : firstInput.current?.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({ ...otp, 3: text });
              text ? fourthInput.current?.focus() : secondInput.current?.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({ ...otp, 4: text });
              !text && thirdInput.current?.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => console.log(otp)}>
        <Text style={styles.signinButtonText}>Xác thực OTP</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontFamily: Fonts.BALO_BOLD,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.BALO_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK,
  },
  phoneNumberText: {
    fontSize: 18,
    fontFamily: Fonts.BALO_MEDIUM,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_YELLOW,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: Colors.DEFAULT_GREEN,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.BALO_MEDIUM,
  },
});

export default VerificationScreen;
