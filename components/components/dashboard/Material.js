import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './Material.module.scss'

// images and icons
import grayCheckIcon from 'public/images/check-gray.svg'
import greenCheckIcon from 'public/images/check-green.svg'

const Material = props => {
  const { item, type } = props
  return (
    <div className={'flex justify-start items-center py-2 cursor-pointer'}>
      {type === 'gray' && <Image src={grayCheckIcon} alt="" width={15} height={12} />}
      {type === 'green' && <Image src={greenCheckIcon} alt="" width={15} height={12} />}
      <Image src={item.url} alt="" className={styles.product} width={56} height={56} />
      <div className={'pl-4 flex flex-col justify-around'}>
        <div className={styles.label}>{item.label}</div>
        <div className={styles.description}>{item.description}</div>
      </div>
    </div>
  )
}

export default Material
