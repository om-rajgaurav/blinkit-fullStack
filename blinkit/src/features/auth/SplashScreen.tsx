import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {Colors} from '@utils/Constants';
import Logo from '@assets/images/splash_logo.jpeg';
import {screenHeight, screenWidth} from '@utils/Scaling';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import { tokenStorage } from '@state/storage';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});


const tokenCheck = async () => {
    const access_token = tokenStorage.getString("access_token") as string;
    const refresh_token = tokenStorage.getString("refresh_token") as string;
    if (access_token && refresh_token) {
      return true
    }
    return false
}

const SplashScreen: React.FC = () => {
  const {user, setUser} = useAuthStore();
  const fetchUserLocation = async (): Promise<void> => {
    try {
      const status = await GeoLocation.requestAuthorization();
      console.log(status);
    } catch (error) {
      Alert.alert(
        'Error',
        'Sorry, we need location services to provide you with a better experience.',
      );
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUserLocation();
    }, 1000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});
