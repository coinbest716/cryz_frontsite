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
      <option value="" style={{ display: 'none' }}>
        {title}
      </option>
      {list.map((item, index) => (
        <option key={index} value={item.id}>
          {item.label}
        </option>
      ))}
    </select>
  )
}

export default Selecter
