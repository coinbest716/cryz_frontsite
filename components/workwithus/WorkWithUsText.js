import React from 'react'
import styles from './WorkWithUsText.module.scss'

const WorkWithUsText = props => {
  const { handleChange, value, label, placeholder } = props
  return (
    <div className={'max-w-sm'}>
      {label && (
        <div className={styles.label + ' pb-2'}>
          <p>{label}</p>
        </div>
      )}
      <input
        autoComplete="new-password"
        type="text"
        className={'w-full flex justify-between items-center ' + styles.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default WorkWithUsText
