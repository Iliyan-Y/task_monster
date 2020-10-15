import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './Auth/signUp';
import AddingTask from './Tasks/addingTask';
import { TasksProvider } from '../context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './Tasks/taskList';

const Stack = createStackNavigator();
const Index = () => {
  


  return (
    <TasksProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Add Task" component={AddingTask} /> 
        <Stack.Screen name="Task List" component={TaskList} />
      </Stack.Navigator>
    </NavigationContainer>

  </TasksProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
