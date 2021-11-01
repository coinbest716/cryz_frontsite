import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './MessageSelectCard.module.scss'

// images
import TrashIcon from 'assets/images/trash.svg'

const MessageSelectCard = () => {
  return (
    <div className={styles.container}>
      <div className={'flex justify-start'}>
        <div className={'relative mr-4 ' + styles.avatar}>CS</div>
        <div className={'inline-grid justify-start items-center'}>
          <div className={styles.title}>Entrenamiento de resistencia</div>
          <div className={'mt-2 ' + styles.text}>Marcus Donegan</div>
        </div>
      </div>
      <div className={'grid justify-center items-center'}>
        <Image src={TrashIcon} alt={''} width={31} height={31} />
      </div>
    </div>
  )
}

export default MessageSelectCard
