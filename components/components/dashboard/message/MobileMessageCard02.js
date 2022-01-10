import React from 'react'

// custom components
import MessageImage02 from 'components/components/dashboard/message/MessageImage02'
import MessageVideo02 from 'components/components/dashboard/message/MessageVideo02'
import MessageDownload02 from 'components/components/dashboard/message/MessageDownload02'

// styles
import styles from 'components/components/dashboard/message/MobileMessageCard02.module.scss'

const MobileMessageCard02 = props => {
  const { message } = props
  console.log(message)
  return (
    <div>
      <div className={'w-full pt-5 flex justify-start'}>
        <div className={styles.container}>
          <div className={styles.content}>{message.content}</div>
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
        </div>
      </div>
      {/* avatar part */}
      <div className={'w-full pb-5 flex justify-start'}>
        <div className={styles.avatarContainer}>
          <div className={'relative mr-4 ' + styles.avatar}>
            {message.from_type === 'user'
              ? message.from_name.split(' ')[0].slice(0, 1).toUpperCase()
              : message.to_name.split(' ')[0].slice(0, 1).toUpperCase()}
            {message.from_type === 'user'
              ? message.from_name.split(' ')[1].slice(0, 1).toUpperCase()
              : message.to_name.split(' ')[1].slice(0, 1).toUpperCase()}
            {message.notification === 'unread' ? (
              <div className={styles.status} style={{ backgroundColor: '#5D51C6' }}></div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className={styles.content}>{message.from_name}</div>
            <div className={'mt-4 flex justify-start items-center'}>
              <div className={styles.time}>{message.create_date.slice(11, 16)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMessageCard02
