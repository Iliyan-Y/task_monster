import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { railsServer } from './serverAddress'

export const TasksContext = createContext()

export const TasksProvider = (props) => {
  let [taskList, setTaskList] = useState([])
  let [user, setUser] = useState('')

  useEffect(() => {
    let headers = {
      headers: {
        email: user.email,
        authentication_token: user.authentication_token,
      },
    }

    axios
      .get(railsServer + '/tasks', headers)
      .then((res) => {
        console.log(res.status)
        setTaskList(res.data)
      })
      .catch((err) => console.log(err.message))
  }, [user])

  return (
    <TasksContext.Provider value={{ taskList, setTaskList, user, setUser }}>
      {props.children}
    </TasksContext.Provider>
  )
}
