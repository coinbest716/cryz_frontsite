import React from 'react'
import styles from './Radio.module.scss'

const Check = props => {
  const { handleChangeType, type, value, label } = props

  return (
    <div className={'flex'}>
      <input
        type="checkbox"
        value={type}
        name={type}
        checked={value}
        onChange={handleChangeType}
        className={styles.inputRadio}
      />
      <div>
        {type > -1 ? (
          <p className={'pl-3 ' + styles.billAddress}>{label}</p>
        ) : (
          <p className={'pl-3 ' + styles.creditTitle}>{label}</p>
        )}
      </div>
    </div>
  )
}

export default Check
