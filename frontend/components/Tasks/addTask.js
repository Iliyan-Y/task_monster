import React, { useState, useContext } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';

function AddTask({ navigation }) {
  let { setTaskList, user } = useContext(TasksContext);
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [expiryDay, setExpiryDay] = useState(0);
  let [expiryMonth, setExpiryMonth] = useState(0);
  let [expiryHour, setExpiryHour] = useState(0);

  let submit = () => {
    let body = {
      task: {
        title,
        description,
        completed: false,
        expiryTime: {
          day: expiryDay,
          month: expiryMonth,
          hour: expiryHour,
        },
      },
    };
    let headers = {
      headers: {
        email: user.email,
        authentication_token: user.authentication_token,
      },
    };

    axios
      .post(railsServer + '/tasks', body, headers)
      .then(() => {
        axios.get(railsServer + '/tasks', headers).then((res) => {
          setTaskList(res.data);
          navigation.navigate('Task List');
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View>
      <Text>Add a new Task!</Text>
      <View>
        <TextInput
          onChangeText={(title) => setTitle(title)}
          placeholder="title"
          name="title"
        />
        <TextInput
          onChangeText={(description) => setDescription(description)}
          placeholder="description"
          name="description"
        />
        <Text>Set Target Time in numbers</Text>
        <TextInput
          onChangeText={(e) => setExpiryDay(e)}
          placeholder="Day"
          name="Day"
        />
        <TextInput
          onChangeText={(e) => setExpiryMonth(e)}
          placeholder="Month"
          name="month"
        />
        <TextInput
          onChangeText={(e) => setExpiryHour(e)}
          placeholder="Hour"
          name="Hour"
        />
        <Button onPress={() => submit()} title="Add" />
      </View>
    </View>
  );
}

export default AddTask;
