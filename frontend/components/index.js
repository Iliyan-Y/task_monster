import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './Auth/signUp';
import LogIn from './Auth/logIn';
import AddTask from './Tasks/addTask';
import EditTask from './Tasks/editTask';
import { TasksProvider } from '../context';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './Tasks/taskList';
import CompletedTaskList from './Tasks/completedTaskList';
import Game from './Game/game';

const Stack = createStackNavigator();
const Index = () => {
  return (
    <TasksProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Log In" component={LogIn} />
          <Stack.Screen
            name="Game"
            component={Game}
            options={{ unmountInactiveRoutes: true }}
          />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Add Task" component={AddTask} />
          <Stack.Screen name="Task List" component={TaskList} />
          <Stack.Screen name="Edit Task" component={EditTask} />
          <Stack.Screen
            name="Completed Task List"
            component={CompletedTaskList}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fb5b5a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
