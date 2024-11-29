import {useEffect, useState} from 'react';
import {fetchUserData} from '../api/ApiService';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_USERS_KEY} from '../helpers/constants';

export const useGetUsers = () => {
  const [userSaved, setUserSaved] = useState();
  const {data, isLoading, error, isSuccess, refetch} = useQuery({
    queryKey: ['users'],
    queryFn: fetchUserData,
    retry: 3,
  });

  const getUsersSaved = async () => {
    const data = await AsyncStorage.getItem(SAVE_USERS_KEY);
    data && setUserSaved(JSON.parse(data));
  };

  useEffect(() => {
    getUsersSaved();
    if (isSuccess && !userSaved) {
      console.log('paso una vez');
      AsyncStorage.setItem(SAVE_USERS_KEY, JSON.stringify(data));
    }
    console.log('Success:', isSuccess);
  }, [data]);

  return {data, isLoading, error};
};
