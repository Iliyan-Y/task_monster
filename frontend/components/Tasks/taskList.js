import React, { useState, useContext, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';
import { SwipeListView } from 'react-native-swipe-list-view';
import CompletedButton from './completeTaskButton';
import DeleteButton from './deleteTaskButton';
import { calculateExpTime, completeTask } from './taskHelpers';
import CountDown from 'react-native-countdown-component';
import { set } from 'react-native-reanimated';

function TaskList({ navigation }) {
  let { taskList, setTaskList, user, score, setScore } = useContext(

    TasksContext
  );
  let [taskListView, setTaskListView] = useState([]);


  //add time param in the db
  useEffect(() => {
    setTaskListView(
      taskList.map((task) => ({
        key: task.title,
        id: task._id.$oid,
        title: task.title,
        description: task.description,
        completed: task.completed,
        expiryTime: calculateExpTime(task.expiryTime),
      }))
    );
  }, [taskList]);
  return (
    <View style={styles.container}>
      <View>
        <SwipeListView
          data={taskListView.filter((task) => task.completed == false)}
          renderItem={(data, rowMap) =>
            data.item.expiryTime == 0 ? (
              <View style={styles.rowFront}>
                <Text>{data.item.title}</Text>
              </View>
            ) : (
              <View style={styles.rowFront}>
                <Text style={styles.inputViewList}>
                  {data.item.title}
                  <CountDown
                    style={styles.countdown}
                    //duration of countdown in seconds
                    until={data.item.expiryTime}
                    //format to show
                    timetoShow={('H', 'M', 'S')}
                    onFinish={() =>
                      completeTask(
                        user,
                        data.item.id,
                        taskList,
                        setTaskList,
                        true,
                        -1,
                        score,

                        setScore,


                      )
                    }
                    size={15}
                    // color={'white'}
                  />
                </Text>
              </View>
            )
          }
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <View style={[styles.backRightBtn, styles.backLeftBtn]}>
                <CompletedButton
                  user={user}
                  taskId={data.item.id}
                  setTaskList={setTaskList}
                  setScore={setScore}
                />

           
   
                <View
                  style={[
                    styles.backRightBtn,
                    styles.backLeftBtn2,
                    styles.backTextWhite,
                  ]}
                >
                  <Button
                    style={
                      (styles.backTextWhite,
                      styles.backRightBtn,
                      styles.backLeftBtn2)
                    }
                    onPress={() =>
                      completeTask(
                        user,
                        data.item.id,
                        taskList,
                        setTaskList,
                        true,
                        -1,
                        score,

                        setScore,
               

                      )
                    }
                    title="Fail"
                  />
                </View>
              </View>
              <View
                style={[
                  styles.backTextWhite,
                  styles.backRightBtn,
                  styles.backRightBtnLeft,
                ]}
              >
                <Button
                  style={
                    (styles.backTextWhite,
                    styles.backRightBtn,
                    styles.backRightBtnLeft)
                  }
                  onPress={() =>
                    navigation.navigate('Edit Task', {
                      taskTitle: data.item.title,
                      taskDescription: data.item.description,
                      taskId: data.item.id,
                    })
                  }
                  title="Edit"
                />
              </View>
              <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <DeleteButton
                  user={user}
                  taskId={data.item.id}
                  setTaskList={setTaskList}
                  setScore={setScore}
                />
              </View>
            </View>
          )}
          leftOpenValue={150}
          rightOpenValue={-150}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => navigation.navigate('Game')}
          >
            <Image source={require('../../assets/game.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('Add Task')}
          >
            <Image source={require('../../assets/plus.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => navigation.navigate('Completed Task List')}
          >
            <Image source={require('../../assets/done.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003f5c',
    flex: 1,
  },

  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 90,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },


  rowFront: {
    alignItems: 'center',
    backgroundColor: '#465881',
    borderBottomColor: '#003f5c',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 75,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backLeftBtn: {
    width: 75,
    backgroundColor: 'green',
    left: 0,
  },
  backLeftBtn2: {
    backgroundColor: 'yellow',
    left: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  inputText: {
    height: 50,
    color: 'white',
    padding: 17,
  },

  inputViewList: {
    height: 60,
    color: 'white',
    padding: -50,
    left: 10,
    right: 40,
  },

  countdown: {
    color: 'white',
  },
})

export default TaskList;
