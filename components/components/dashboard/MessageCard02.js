import React from 'react'

// styles
import styles from 'components/components/dashboard/MessageCard02.module.scss'

const MessageCard02 = props => {
  const { message } = props
  return (
    <div className={styles.container}>
      <div className={styles.content}>{message.content}</div>
      <div className={'mt-4 flex justify-start items-center'}>
        <div className={styles.time}>{message.time}</div>
      </div>
      <div className={styles.triangle}></div>
    </div>
  )
}

export default MessageCard02
