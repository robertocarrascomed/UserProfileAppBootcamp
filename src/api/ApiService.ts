import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SAVE_USERS_KEY} from '../helpers/constants';

export const fetchUserData = async () => {
  const data = await AsyncStorage.getItem(SAVE_USERS_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    try {
      console.log('hago la peticion');
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      return response.data;
    } catch (error) {
      throw new Error('Algo salio mal');
    }
  }
};
