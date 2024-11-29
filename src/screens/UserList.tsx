import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {useGetUsers} from '../hooks/useGetUsers';
import {debounce} from 'lodash';

export const UserList = () => {
  const [users, setUsers] = useState();
  const [text, setText] = useState('');

  const {data, isLoading, error} = useGetUsers();

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, []);

  const handleInput = (input: string) => {
    const actualData = data.filter((user: any) => user.name.includes(input));
    setUsers(actualData);
  };

  const debouncedHandleInput = useCallback(debounce(handleInput, 300), []);

  const onChangeText = (input: string) => {
    setText(input);
    debouncedHandleInput(input);
  };
  return (
    <View>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder="Busca usuarios"
      />
      {!!users && (
        <FlatList
          data={users}
          renderItem={({item}) => (
            <View>
              <Text>{`${item.name} --> ${item.email}`}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};
