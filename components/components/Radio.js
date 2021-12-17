import React from 'react'
import styles from './Radio.module.scss'

const Radio = props => {
  const { handleChangeType, name, value, label } = props

  return (
    <div className={'flex'}>
      <input type="radio" value={value} name={name} onChange={handleChangeType} className={styles.inputRadio} />
      <div>
        <p className={'pl-3 ' + styles.title}>{label}</p>
      </div>
    </div>
  )
}

export default Radio
