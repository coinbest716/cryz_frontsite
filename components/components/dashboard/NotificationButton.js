import React from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// styles
import styles from 'components/components/dashboard/NotificationButton.module.scss'

// images
import ChatIcon from 'assets/images/chat.svg'
import ChatNotifyIcon from 'assets/images/chat-notify.svg'

const NotificationButton = () => {
  const router = useRouter()
  return (
    <div className={styles.container} onClick={() => router.push('/dashboard/message')}>
      <Image src={ChatIcon} alt="" width={52} height={52} />
      {/* <Image src={ChatNotifyIcon} alt="" width={52} height={52} /> */}
    </div>
  )
}

export default NotificationButton
