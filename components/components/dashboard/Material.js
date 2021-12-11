import React from 'react'

// next components
import Image from 'next/image'

// third party components
import ReactPlayer from 'react-player'

// styles
import styles from './Material.module.scss'

// images and icons
import grayCheckIcon from 'public/images/check-gray.svg'
import greenCheckIcon from 'public/images/check-green.svg'

const Material = props => {
  const { item, selectedVideo, type, onClick } = props
  return (
    <div
      className={
        'flex justify-start items-center py-2 cursor-pointer ' + (item.id === selectedVideo?.id ? styles.active : '')
      }
      onClick={() => onClick(item)}
    >
      <div className="mr-2">
        {type === 'gray' && <Image src={grayCheckIcon} alt="" width={15} height={12} />}
        {type === 'green' && <Image src={greenCheckIcon} alt="" width={15} height={12} />}
      </div>
      <ReactPlayer url={item.link} width="56px" height="56px" className={styles.reactPlayer} controls={false} />
      <div className={'pl-4 flex flex-col justify-around'}>
        <div className={styles.label}>{item?.name}</div>
        <div className={styles.description}>{item?.description}</div>
      </div>
    </div>
  )
}

export default Material
