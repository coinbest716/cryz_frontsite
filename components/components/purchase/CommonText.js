import React from 'react'
import styles from './CommonText.module.scss'

const CommonText = props => {
  const { handleChange, value, label, placeholder, type } = props
  return (
    <div>
      <div className={styles.label + ' pb-2'}>
        <p>{label}</p>
      </div>
      <input
        type={type}
        className={'w-full flex justify-between items-center ' + styles.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default CommonText
