import React, { useState, useContext, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import { railsServer } from '../../serverAddress'
import { TasksContext } from '../../context'
import { SwipeListView } from 'react-native-swipe-list-view'
import UncompletedButton from './uncompleteTaskButton'
import DeleteButton from './deleteTaskButton'

function CompletedTaskList({ navigation }) {
  let { taskList, setTaskList, user, setScore } = useContext(TasksContext)

  let [taskListView, setTaskListView] = useState([])

  useEffect(() => {
    setTaskListView(
      taskList.map((task) => ({
        key: task.title,
        id: task._id.$oid,
        title: task.title,
        description: task.description,
        completed: task.completed,
        score: parseInt(task.score),
      })),
    )
  }, [taskList])

  return (
    <View style={styles.container}>
      <View>
        <SwipeListView
          data={taskListView.filter((task) => task.completed == true)}
          renderItem={(data, rowMap) => (
            <View
              style={[
                styles.rowFront,
                data.item.score > 0
                  ? { backgroundColor: '#00663C' }
                  : { backgroundColor: '#790000' },
              ]}
            >
              <Text>{data.item.title}</Text>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <View style={[styles.backRightBtn, styles.backLeftBtn]}>
                <UncompletedButton
                  user={user}
                  taskId={data.item.id}
                  setTaskList={setTaskList}
                />
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
          leftOpenValue={75}
          rightOpenValue={-150}
        />

        <TouchableOpacity
          style={styles.uncomBtn}
          onPress={() => navigation.navigate('Task List')}
        >
          <Text style={styles.inputText}>Uncompleted Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003f5c',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#465881',
    borderBottomColor: '#003f5c',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 75,
  },
  rowFrontNotCompleted: {
    alignItems: 'center',
    backgroundColor: 'red',
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
    backgroundColor: '#52B788',
    left: 75,
    left: 0,
  },
  backRightBtnLeft: {
    backgroundColor: '#003f5c',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#fb5b5a',
    right: 0,
  },
  inputText: {
    height: 50,
    color: 'white',
    padding: 17,
  },

  uncomBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
})

export default CompletedTaskList
