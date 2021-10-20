import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from 'components/components/dashboard/NotificationButton.module.scss'

// images
import ChatIcon from 'assets/images/chat.svg'
import ChatNotifyIcon from 'assets/images/chat-notify.svg'

const NotificationButton = () => {
  return (
    <div className={styles.container}>
      <Image src={ChatIcon} alt="" width={52} height={52} />
      {/* <Image src={ChatNotifyIcon} alt="" width={52} height={52} /> */}
    </div>
  )
}

export default NotificationButton
