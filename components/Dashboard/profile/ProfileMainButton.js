import React from 'react'

// next components
import Image from 'next/image'

// images
import logoutIcon from 'public/images/off.svg'

// styles
import styles from './ProfileMainButton.module.scss'

const ProfileMainButton = props => {
  const { type, label, handleClickMainButton } = props
  return (
    <div>
      {type === 'logout' ? (
        <div onClick={handleClickMainButton} className={styles.logout + ' flex justify-center items-center'}>
          <div className="flex items-center">
            <Image src={logoutIcon} alt="" width={24} height={24} />
          </div>
          <div className={styles.logoutLabel + ' ml-4'}>{label}</div>
        </div>
      ) : (
        <></>
      )}
      {type === 'deleteAccount' ? (
        <div onClick={handleClickMainButton} className={styles.deleteButton + ' flex justify-center items-center'}>
          <div className={styles.deleteLabel}>{label}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ProfileMainButton
