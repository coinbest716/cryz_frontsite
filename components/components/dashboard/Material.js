import React from 'react'
import styles from './Material.module.scss'
import Image from 'next/image'
import grayCheckIcon from 'public/images/check-gray.svg'
import greenCheckIcon from 'public/images/check-green.svg'

const Material = props => {
  const { item, type } = props
  return (
    <div className="flex justify-start items-center py-2 cursor-pointer">
      {type === 'gray' && <Image src={grayCheckIcon} alt="" width={15} height={12} />}
      {type === 'green' && <Image src={greenCheckIcon} alt="" width={15} height={12} />}
      <img
        src={item.url}
        alt=""
        style={{
          marginLeft: '8px',
          width: '56px',
          height: '56px',
          borderRadius: '10px',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.6,
        }}
      />
      <div className="pl-4 flex flex-col justify-around">
        <div className={styles.label}>{item.label}</div>
        <div className={styles.description}>{item.description}</div>
      </div>
    </div>
  )
}

export default Material
