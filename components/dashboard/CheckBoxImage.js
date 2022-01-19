import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './CheckBoxImage.module.scss'

const CheckBoxImage = props => {
  const { label, color } = props

  return (
    <div className={'flex justify-start'}>
      <div
        style={{ width: '24px', height: '24px', backgroundColor: color, borderRadius: '6px', color: 'white' }}
        className={'flex items-center justify-center'}
      >
        <Image src={'/images/check-white.svg'} alt={''} width={12} height={12} />
      </div>
      <div className={'pl-4 ' + styles.subTitle}>{label}</div>
    </div>
  )
}

export default CheckBoxImage
