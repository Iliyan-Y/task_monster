import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { railsServer } from './serverAddress';

export const TasksContext = createContext();

export const TasksProvider = (props) => {
  let [taskList, setTaskList] = useState([]);
  let [user, setUser] = useState('');
  let [score, setScore] = useState();

  useEffect(() => {
    let headers = {
      headers: {
        email: user.email,
        authentication_token: user.authentication_token,
      },
    };

    axios
      .get(railsServer + '/tasks', headers)
      .then(async (res) => {
        await setTaskList(res.data);
        let scoreArray = res.data.map((task) => task.score);
        setScore(scoreArray.reduce((a, b) => a + b, 0));
      })
      .catch((err) => console.log(err.message));
  }, [user]);

  return (
    <TasksContext.Provider
      value={{ taskList, setTaskList, user, setUser, score, setScore }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
