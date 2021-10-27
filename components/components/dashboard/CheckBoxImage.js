import React from 'react'
import styles from './CheckBoxImage.module.scss'

const CheckBoxImage = props => {
  const { label, color } = props

  return (
    <div className="flex justify-start">
      <div
        style={{ width: '24px', height: '24px', backgroundColor: color, borderRadius: '6px', color: 'white' }}
        className="flex items-center justify-center"
      >
        <img src="/images/check.svg" alt="" style={{ width: '12px', height: '12px' }} />
      </div>
      <div className={'pl-4 ' + styles.subTitle}>{label}</div>
    </div>
  )
}

export default CheckBoxImage
