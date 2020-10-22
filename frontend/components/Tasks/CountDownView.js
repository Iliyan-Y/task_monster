import React, { useContext } from 'react';
import CountDown from 'react-native-countdown-component';
import { TasksContext } from '../../context';
import { completeTask } from './taskHelpers';
import { StyleSheet, View, Text } from 'react-native';

const CountDownView = ({ title, expiryTime, id }) => {
  let { setTaskList, user, setScore } = useContext(TasksContext);

  return (
    <View style={styles.rowFront}>
      <Text style={styles.inputViewList}>
        {title}
        <CountDown
          digitStyle={{ backgroundColor: '#003f5c' }}
          digitTxtStyle={{ color: '#fb5b5a' }}
          style={styles.countdown}
          until={expiryTime}
          timetoShow={('H', 'M', 'S')}
          onFinish={() =>
            completeTask(user, id, setTaskList, true, -1, setScore)
          }
          size={12}
        />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#465881',
    borderBottomColor: '#003f5c',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 75,
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
});

export default CountDownView;
