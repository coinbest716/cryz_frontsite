import React from 'react'
import Image from 'next/image'

// images
import googleIcon from 'public/images/google.svg'
import facebookIcon from 'public/images/facebook.svg'

// styles
import styles from './CommonButton.module.scss'

const CommonButton = props => {
  const { handleClick, label, type } = props
  return (
    <>
      {(type === 'login' || type === 'enter') && (
        <button className={'flex justify-between items-center ' + styles.loginButton} onClick={handleClick}>
          <p className={styles.loginLabel}>{label}</p>
        </button>
      )}
      {type === 'register' && (
        <button className={'flex justify-between items-center ' + styles.registerButton} onClick={handleClick}>
          <p className={styles.registerLabel}>{label}</p>
        </button>
      )}
      {type === 'google' && (
        <button className={'flex justify-between items-center ' + styles.googleButton} onClick={handleClick}>
          <div className={styles.googleImage}>
            <Image src={googleIcon} alt="" width={24} height={24} />
          </div>
          <div className={'flex justify-center items-center ' + styles.googleLabel}>
            <p>{label}</p>
          </div>
        </button>
      )}
      {type === 'facebook' && (
        <button className={'flex justify-between items-center ' + styles.facebookButton} onClick={handleClick}>
          <div className={styles.facebookImage}>
            <Image src={facebookIcon} alt="" width={24} height={24} />
          </div>
          <div className={'flex justify-center items-center ' + styles.facebookLabel}>
            <p>{label}</p>
          </div>
        </button>
      )}
    </>
  )
}

export default CommonButton
