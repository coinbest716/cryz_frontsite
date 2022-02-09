import React from 'react'
import styles from './CommonText.module.scss'

const CommonText = props => {
  const { handleChange, value, label, placeholder, type, list, disabled } = props
  return (
    <div className={'max-w-sm'}>
      <div className={styles.label + ' pb-2'}>
        <p>{label}</p>
      </div>
      {type === 'select' ? (
        <select
          name="select"
          onChange={handleChange}
          value={value}
          className={'w-full flex justify-between items-center ' + styles.select}
        >
          {list.map((item, index) => (
            <option key={index} value={item} className={styles.option}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          autoComplete="new-password"
          type={type}
          className={'w-full flex justify-between items-center ' + styles.input}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </div>
  )
}

export default CommonText
