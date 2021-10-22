import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from 'components/components/dashboard/MessageCard01.module.scss'

// images
import SeenIcon from 'assets/images/seen.svg'

const MessageCard01 = props => {
  const { message } = props
  return (
    <div className={styles.container}>
      <div className={styles.content}>{message.content}</div>
      <div className={'mt-4 flex justify-end items-center'}>
        <div className={styles.time}>{message.time}</div>
        {message.state === 2 ? <Image src={SeenIcon} alt={''} width={29} height={24} /> : ''}
      </div>
      <div className={styles.triangle}></div>
    </div>
  )
}

export default MessageCard01
