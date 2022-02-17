import React from 'react'

// styles
import styles from './Selecter.module.scss'

const Selecter = props => {
  const { title, list, value, onChange } = props
  return (
    <select
      name="select"
      onChange={event => onChange(event)}
      value={value}
      className={'cursor-pointer flex justify-start items-center ' + styles.select}
    >
      {list.map((item, index) => (
        <option key={index} value={item.id}>
          {item.label}
        </option>
      ))}
    </select>
  )
}

export default Selecter
