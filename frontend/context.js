import React, { createContext, useState } from 'react'

export const TasksContext = createContext();


export const TasksProvider = (props) => {
    let [taskList, setTaskList] = useState([]);

    let [user, setUser] = useState('')

    return (
        <TasksContext.Provider
        value={{taskList, setTaskList, user, setUser
        }}
        >
            {props.children}
        </TasksContext.Provider>
    )
}


