import React from 'react'

// custom components
import MobileMessageImage01 from 'components/components/dashboard/message/MobileMessageImage01'
import MobileMessageVideo01 from 'components/components/dashboard/message/MobileMessageVideo01'
import MobileMessageDownload01 from 'components/components/dashboard/message/MobileMessageDownload01'

// styles
import styles from 'components/components/dashboard/message/MobileMessageCard01.module.scss'

const MobileMessageCard01 = props => {
  const { message } = props
  return (
    <div className={'w-full py-5 flex justify-end'}>
      <div className={styles.container}>
        <div className={styles.content}>{message.content}</div>
        <div className={'mt-4 flex justify-end items-center'}>
          <div className={styles.time}>{message.create_date.slice(11, 16)}</div>
        </div>
        {message.attachment.length !== 0 ? (
          message.attachment[0].type.split('/')[0] === 'image' ? (
            <MobileMessageImage01 message={message} />
          ) : message.attachment[0].type.split('/')[0] === 'video' ? (
            <MobileMessageVideo01 message={message} />
          ) : (
            <MobileMessageDownload01 message={message} />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default MobileMessageCard01
