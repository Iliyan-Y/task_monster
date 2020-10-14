import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';


const AddingTask = () => {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [completed, setCompleted] = useState(false);

  let submit = () => {
    let body = {
      task: {
        title,
        description,
        completed,
      },
    };

    axios
      .post(railsServer + '/tasks', body)
      .then((res) => console.log(res.status))
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
        <Button onPress={() => submit()} title="Add" />
      </View>
    </View>
     );
}
 
export default AddingTask;