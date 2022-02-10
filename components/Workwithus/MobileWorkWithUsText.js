import React from 'react'
import styles from './MobileWorkWithUsText.module.scss'

const MobileWorkWithUsText = props => {
  const { handleChange, value, label, placeholder, disabled, type } = props
  return (
    <>
      {type === 'textarea' ? (
        <div className={'max-w-sm'}>
          {label && (
            <div className={styles.label + ' pb-1'}>
              <p>{label}</p>
            </div>
          )}
          <textarea
            type={'text'}
            rows="3"
            className={'w-full flex justify-between items-center ' + styles.textarea}
            value={value}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className={'max-w-sm'}>
          {label && (
            <div className={styles.label + ' pb-1'}>
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
            disabled={disabled}
          />
        </div>
      )}
    </>
  )
}

export default MobileWorkWithUsText
