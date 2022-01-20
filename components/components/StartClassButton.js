import React from 'react'

// next components
import Image from 'next/image'

// images
import StartClassIcon from 'public/images/start-class.svg'

// styles
import styles from './StartClassButton.module.scss'

const StartClassButton = props => {
  const { handleClick, label, visible } = props

  return (
    visible === true && (
      <button className={'flex justify-between items-center px-4 py-2 ' + styles.outlineButton} onClick={handleClick}>
        <p className={'pr-3 ' + styles.outlineLabel}>{label}</p>
        <div className="w-8 h-8 flex justify-center items-center">
          <Image src={StartClassIcon} alt={''} width={30} height={30} className={styles.startClassButtonImage} />
        </div>
      </button>
    )
  )
}

export default StartClassButton
