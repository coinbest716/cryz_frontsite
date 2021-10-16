import React from 'react'
import Image from 'next/image'
import backGrayIcon from 'public/images/arrow-left-gray.svg'
import styles from './Radio.module.scss'

const Radio = props => {
  const { handleChangeType, type, value, label } = props

  return (
    <div>
      <div className="relative flex justify-start items-center">
        <input
          type="radio"
          value={value}
          name={type}
          checked={value === type}
          onChange={handleChangeType}
          className={styles.inputRadio}
        />
        <p className={'pl-3 ' + styles.creditTitle}>{label}</p>
      </div>
    </div>
  )
}

export default Radio
