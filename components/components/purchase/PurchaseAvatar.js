import React, { useState } from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './PurchaseAvatar.module.scss'

const PurchaseAvatar = props => {
  const { avatar, handleChangeAvatar } = props

  return (
    <div className={'relative ' + styles.avatarSection}>
      <Image
        src={avatar === '' ? '/images/default-avatar.svg' : avatar}
        alt=""
        width={100}
        height={100}
        className={styles.defaultAvatar}
      />
      <div className={'absolute top-16 right-0 cursor-pointer'}>
        <div className={styles.edit}>
          <input
            id="contained-button-file"
            accept="image/*"
            style={{ display: 'none', cursor: 'pointer' }}
            type="file"
            onChange={handleChangeAvatar}
          />
          <label htmlFor="contained-button-file" className="cursor-pointer">
            <Image src={'/images/edit.svg'} alt="" width={14} height={14} />
          </label>
        </div>
      </div>
    </div>
  )
}

export default PurchaseAvatar
