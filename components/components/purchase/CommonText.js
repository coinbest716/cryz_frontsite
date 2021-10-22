import React from 'react'
import styles from './CommonText.module.scss'

const CommonText = props => {
  const { handleChange, value, label, placeholder, type, list } = props
  return (
    <div className="max-w-lg">
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
          // id={`${placeholder}`}
          autoComplete={type === 'password' ? 'new-password' : 'off'}
          type={type}
          className={'w-full flex justify-between items-center ' + styles.input}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}

export default CommonText
