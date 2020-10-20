import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { railsServer } from './serverAddress';

export const TasksContext = createContext();

export const TasksProvider = (props) => {
  let [taskList, setTaskList] = useState([]);
  let [user, setUser] = useState('');
  let [score, setScore] = useState();

  useEffect(() => {
    let count = 0;

    let headers = {
      headers: {
        email: user.email,
        authentication_token: user.authentication_token,
      },
    };

    axios
      .get(railsServer + '/tasks', headers)
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((err) => console.log(err.message));
    
    taskList.map((task) => 
      (count = count + task.score)
      
  )
    
    setScore(count);
    console.log("count")
    console.log(count)
    console.log('score');
    console.log(score)
  }, [user]);

  return (
    <TasksContext.Provider value={{ taskList, setTaskList, user, setUser, score, setScore }}>
      {props.children}
    </TasksContext.Provider>
  );
};
