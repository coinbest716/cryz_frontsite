import React from 'react'

// custom components
import MessageImage02 from 'components/Dashboard/message/MessageImage02'
import MessageVideo02 from 'components/Dashboard/message/MessageVideo02'
import MessageDownload02 from 'components/Dashboard/message/MessageDownload02'

// styles
import styles from 'components/Dashboard/message/MessageCard02.module.scss'

const MessageCard02 = props => {
  const { message } = props
  return (
    <div className={'w-full py-5 px-7 flex justify-start'}>
      <div className={styles.container}>
        <div className={styles.content}>{message.content}</div>
        <div className={'mt-4 flex justify-end items-center'}>
          <div className={styles.time}>{message.create_date.slice(11, 16)}</div>
        </div>
        {message.attachment.length !== 0 ? (
          message.attachment[0].type.split('/')[0] === 'image' ? (
            <MessageImage02 message={message} />
          ) : message.attachment[0].type.split('/')[0] === 'video' ? (
            <MessageVideo02 message={message} />
          ) : (
            <MessageDownload02 message={message} />
          )
        ) : (
          <></>
        )}
        <div className={styles.triangle}></div>
      </div>
    </div>
  )
}

export default MessageCard02
