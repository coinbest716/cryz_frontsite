import React from 'react'
import styles from './Radio.module.scss'

const Radio = props => {
  const { handleChangeType, type, value, label } = props

  return (
    <div className={'flex'}>
      <input
        type="radio"
        value={value}
        name={type}
        checked={value === type}
        onChange={handleChangeType}
        className={styles.inputRadio}
      />
      <div>
        <p className={'pl-3 ' + styles.title}>{label}</p>
      </div>
    </div>
  )
}

export default Radio
