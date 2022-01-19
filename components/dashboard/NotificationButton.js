import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// styles
import styles from 'components/dashboard/NotificationButton.module.scss'

// images
import ChatIcon from 'assets/images/chat.svg'
import ChatNotifyIcon from 'assets/images/chat-notify.svg'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const NotificationButton = () => {
  // variables
  const router = useRouter()
  const [getPatientMessageById, { data: messageListData, loading: messageListLoading, error: messageListError }] =
    useLazyQuery(graphql.queries.getPatientMessageById)
  const [message, setMessage] = useState([])

  // handlers
  useEffect(() => {
    getPatientMessageById({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
  }, [getPatientMessageById])
  useEffect(() => {
    if (!messageListError && messageListData && messageListData.getPatientMessageById) {
      const data = messageListData.getPatientMessageById
      setMessage(data)
    }
  }, [messageListLoading, messageListData, messageListError])
  return (
    <div className={styles.container} onClick={() => router.push('/dashboard/message')}>
      {message.length !== 0 ? (
        <Image src={ChatNotifyIcon} alt="" width={52} height={52} />
      ) : (
        <Image src={ChatIcon} alt="" width={52} height={52} />
      )}
    </div>
  )
}

export default NotificationButton
