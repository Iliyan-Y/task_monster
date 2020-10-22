import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { withSafeAreaInsets } from 'react-native-safe-area-context'

const DatePicker = ({ setExpiryTime }) => {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setExpiryTime(currentDate)
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }
  return (
    <>
      <View>
        <Button onPress={showDatepicker} title="Set expiry date" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Set expiry time" />
      </View>
      {show && (
        <DateTimePicker
          style={styles.timing}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },

  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    alignSelf: 'center',
  },

  inputText: {
    height: 50,
    color: 'white',
    padding: 17,
  },
  timing: {
    color: 'white',
  },
})
export default DatePicker
