import React from 'react'
import styles from './Radio.module.scss'

const Radio = props => {
  const { handleChangeType, type, value, label } = props

  return (
    <div className="flex">
      <div>
        <input
          type="radio"
          value={value}
          name={type}
          checked={value === type}
          onChange={handleChangeType}
          className={styles.inputRadio}
        />
      </div>
      <div>
        <p className={'pl-3 ' + styles.creditTitle}>{label}</p>
      </div>
    </div>
  )
}

export default Radio
