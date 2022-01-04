import React from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// images and icons
import ArrowLeftBlackIcon from 'assets/images/arrow-left-black.svg'
import TrashIcon from 'assets/images/trash.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './message-content.module.scss'

const MessageContent = props => {
  // variables
  const router = useRouter()

  // handlers
  const handleGoBack = () => {
    router.push('/dashboard/message')
  }
  return (
    <div className={styles.container}>
      <div className={'w-full flex justify-between items-center ' + styles.headerContainer}>
        <div className={'flex cursor'} onClick={() => handleGoBack()}>
          <Image src={ArrowLeftBlackIcon} alt={''} width={14} height={14} />
          <p className={styles.headerTitle}>Mensajes</p>
        </div>
        <div>
          <Image src={TrashIcon} alt={''} width={9} height={10} />
        </div>
      </div>
      <div className={styles.cardContainer}></div>
    </div>
  )
}

export default MessageContent
