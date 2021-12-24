import React from 'react'

// next components
import Image from 'next/image'

// images
import User from 'assets/images/team-member-01.png'
import RightGrayIcon from 'public/images/right_gray.svg'

// styles
import styles from './ProfileItem.module.scss'

const ProfileItem = props => {
  const { image, title, index } = props
  return (
    <div>
      <div
        className={
          styles.container +
          ' flex items-center w-full ' +
          (index === 0 && styles.itemTopRadius) +
          ' ' +
          (index === 3 && styles.itemBottomRadius)
        }
      >
        <div>
          <Image src={image} alt="" width={16} height={16} />
        </div>
        <div className="flex justify-between items-center ml-4 w-full">
          <div className={styles.name}>{title}</div>
          <div>
            <Image src={RightGrayIcon} alt="" width={7} height={12} />
          </div>
        </div>
      </div>
      {index !== 3 ? <div className={styles.divider}></div> : <></>}
    </div>
  )
}

export default ProfileItem
