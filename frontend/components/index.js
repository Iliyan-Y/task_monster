import 'react-native-gesture-handler'
import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SignUp from './Auth/signUp'
import LogIn from './Auth/logIn'
import AddTask from './Tasks/addTask'
import EditTask from './Tasks/editTask'
import { TasksProvider } from '../context'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TaskList from './Tasks/taskList'
import CompletedTaskList from './Tasks/completedTaskList'
import Game from './Game/game'

const Stack = createStackNavigator()
const Index = () => {
  return (
    <View style={styles.container}>
      <TasksProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Log In"
              component={LogIn}
              options={{
                headerStyle: {
                  backgroundColor: '#fb5b5a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 12,
                  top: '15%',
                },
              }}
            />
            <Stack.Screen
              name="Game"
              component={Game}
              options={{
                headerStyle: {
                  backgroundColor: '#fb5b5a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 12,
                  top: '15%',
                },
              }}
            />
            <Stack.Screen
              name="Sign Up"
              component={SignUp}
              options={{
                headerStyle: {
                  backgroundColor: '#fb5b5a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 12,
                  top: '15%',
                },
              }}
            />
            <Stack.Screen
              name="Add Task"
              component={AddTask}
              options={{
                headerStyle: {
                  backgroundColor: '#fb5b5a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 12,
                  top: '15%',
                },
              }}
            />
            <Stack.Screen
              name="Task List"
              component={TaskList}
              options={{
                headerStyle: {
                  backgroundColor: '#fb5b5a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 12,
                  top: '15%',
                },
              }}
            />
            <Stack.Screen
              name="Edit Task"
              component={EditTask}
              options={{
                headerStyle: {
                  backgroundColor: '#fb5b5a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 12,
                  top: '15%',
                },
              }}
            />
            <Stack.Screen
              name="Completed Task List"
              component={CompletedTaskList}
              options={{
                headerStyle: {
                  backgroundColor: '#fb5b5a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 12,
                  top: '15%',
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TasksProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },
})

export default Index
