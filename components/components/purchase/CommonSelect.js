import React from 'react'
import styles from './CommonSelect.module.scss'

const CommonSelect = props => {
  const { handleChange, list, value } = props
  return (
    <div className="w-full">
      <select name="select" onChange={handleChange} value={value} className={styles.select}>
        {list.map((item, index) => (
          <option key={index} value={item} className={styles.option}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CommonSelect
