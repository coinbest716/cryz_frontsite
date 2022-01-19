import React from 'react'

// styles
import styles from 'components/dashboard/message/MobileMessageVideo02.module.scss'

const MobileMessageVideo02 = props => {
  const { message } = props
  return (
    <div className={'w-full py-5 px-7 flex justify-start'}>
      <div className={styles.container}>
        <video width={167} controls>
          <source src={message.attachment[0].path} type="video/mp4" />
          <source src={message.attachment[0].path} type="video/ogg" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </div>
  )
}

export default MobileMessageVideo02
