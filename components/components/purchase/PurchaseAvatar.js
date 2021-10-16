import React from 'react'
import styles from './PurchaseAvatar.module.scss'

const PurchaseAvatar = props => {
  const { avatar, handleChangeAvatar } = props
  return (
    <div className={'relative ' + styles.avatarSection}>
      <img
        src={avatar === '' ? '/images/default-avatar.svg' : avatar}
        alt=""
        className={styles.defaultAvatar}
        style={{ width: '100px', height: '100px' }}
      />
      <div className="absolute top-16 right-0">
        <div className={styles.edit} onClick={handleChangeAvatar}>
          <img src={'/images/edit.svg'} style={{ width: '14px', height: '14px' }} />
        </div>
      </div>
    </div>
  )
}

export default PurchaseAvatar
