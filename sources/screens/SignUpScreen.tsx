import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Display from '../utils/Display';
import Images from '../constants/Images';
import Separator from '../components/Separator';
import AuthenticationService from '../services/AuthenticationService';

interface SignUpScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

type InputState = 'valid' | 'invalid' | 'default';

const inputStyle = (state: InputState) => {
  switch (state) {
    case 'valid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.SECONDARY_GREEN,
      };
    case 'invalid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_RED,
      };
    default:
      return styles.inputContainer;
  }
};

const showMarker = (state: InputState) => {
  switch (state) {
    case 'valid':
      return (
        <AntDesign
          name="checkcircleo"
          color={Colors.SECONDARY_GREEN}
          size={18}
          style={{ marginLeft: 5 }}
        />
      );
    case 'invalid':
      return (
        <AntDesign
          name="closecircleo"
          color={Colors.DEFAULT_RED}
          size={18}
          style={{ marginLeft: 5 }}
        />
      );
    default:
      return null;
  }
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [retypePasswordErrorMessage, setRetypePasswordErrorMessage] = useState('');
  const [emailState, setEmailState] = useState<InputState>('default');
  const [usernameState, setUsernameState] = useState<InputState>('default');
  const [retypePasswordState, setRetypePasswordState] = useState<InputState>('default');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const register = () => {
    let user = {
      username,
      email,
      password,
    };
    setIsLoading(true);
    AuthenticationService.register(user).then(response => {
      setIsLoading(false);
      if (response?.status) {
        setIsModalVisible(true);
      } else {
        setErrorMessage(response?.message);
      }
    });
    // navigation.navigate('RegisterPhone')
  };

  const checkUserExist = async (type: string, value: string) => {
    if (value?.length > 0) {
      AuthenticationService.checkUserExist(type, value).then(response => {
        if (response?.status) {
          type === 'email' && emailErrorMessage
            ? setEmailErrorMessage('')
            : null;

          type === 'username' && usernameErrorMessage
            ? setUsernameErrorMessage('')
            : null;
          type === 'email' ? setEmailState('valid') : null;
          type === 'username' ? setUsernameState('valid') : null;
        } else {
          type === 'email' ? setEmailErrorMessage(response?.message) : null;
          type === 'username'
            ? setUsernameErrorMessage(response?.message)
            : null;
          type === 'email' ? setEmailState('invalid') : null;
          type === 'username' ? setUsernameState('invalid') : null;
        }
      });
    }
  };

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
      <Text style={styles.title}>Tạo tài khoản mới</Text>
      <Text style={styles.content}>
        Nhập tên khoản, email và mật khẩu.
      </Text>
      <View style={inputStyle(usernameState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Nhập tên tài khoản"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setUsername(text)}
          />
          {showMarker(usernameState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{usernameErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Nhập địa chỉ email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            secureTextEntry={!isPasswordShow}
            placeholder="Nhập mật khẩu"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setPassword(text)}
          />
          <Feather
            name={isPasswordShow ? 'eye' : 'eye-off'}
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <View style={inputStyle(retypePasswordState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            secureTextEntry={!isPasswordShow}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setRetypePassword(text)}
          />
          <Feather
            name={isPasswordShow ? 'eye' : 'eye-off'}
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>{retypePasswordErrorMessage}</Text>
      <TouchableOpacity style={styles.signinButton} onPress={() => register()}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.DEFAULT_WHITE} />
        ) : (
          <Text style={styles.signupButtonText}>Đăng ký</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.orText}>Hoặc</Text>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialsignupButtonText}>
            Đăng ký bằng Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialsignupButtonText}>Đăng ký bằng Google</Text>
        </View>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Đăng ký thành công!</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate('SignIn'); // Change 'Home' to your desired screen
              }}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 22,
    fontFamily: Fonts.BALO_BOLD,
    lineHeight: 22 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK,
    textAlign: 'center'
  },
  content: {
    fontSize: 18,
    fontFamily: Fonts.BALO_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 15,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signupButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.BALO_MEDIUM,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.BALO_MEDIUM,
    marginLeft: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: Colors.FABEBOOK_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialsignupButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: Fonts.BALO_MEDIUM,
  },
  signinButtonLogoContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  errorMessage: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.BALO_MEDIUM,
    marginHorizontal: 20,
    marginVertical: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontFamily: Fonts.BALO_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  okButtonText: {
    fontSize: 16,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.BALO_MEDIUM,
  },
});

export default SignUpScreen;
