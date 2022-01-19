import React from 'react'

// custom components
import MessageImage01 from 'components/dashboard/message/MessageImage01'
import MessageVideo01 from 'components/dashboard/message/MessageVideo01'
import MessageDownload01 from 'components/dashboard/message/MessageDownload01'

// styles
import styles from 'components/dashboard/message/MessageCard01.module.scss'

const MessageCard01 = props => {
  const { message } = props
  return (
    <div className={'w-full py-5 px-7 flex justify-end'}>
      <div className={styles.container}>
        <div className={styles.content}>{message.content}</div>
        <div className={'mt-4 flex justify-end items-center'}>
          <div className={styles.time}>{message.create_date.slice(11, 16)}</div>
        </div>
        {message.attachment.length !== 0 ? (
          message.attachment[0].type.split('/')[0] === 'image' ? (
            <MessageImage01 message={message} />
          ) : message.attachment[0].type.split('/')[0] === 'video' ? (
            <MessageVideo01 message={message} />
          ) : (
            <MessageDownload01 message={message} />
          )
        ) : (
          <></>
        )}
        <div className={styles.triangle}></div>
      </div>
    </div>
  )
}

export default MessageCard01
