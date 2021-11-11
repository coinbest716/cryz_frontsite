import { createStore } from 'redux'

// json data
import DayOfWeekList from 'assets/data/DayOfWeekListData.json'
import MonthList from 'assets/data/MonthListData.json'

let date = new Date()
date =
  DayOfWeekList[date.getDay()].day +
  ', ' +
  String(date.getDate()).padStart(2, '0') +
  ' de ' +
  MonthList[date.getMonth()].month +
  ' ' +
  date.getFullYear()

const initialState = {
  menu: 'HOME',
  today: date,
  isLoading: false,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
