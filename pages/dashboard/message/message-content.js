import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import toast from 'react-hot-toast'

// custom components
import MobileMessageCard01 from 'components/components/dashboard/message/MobileMessageCard01'
import MobileMessageCard02 from 'components/components/dashboard/message/MobileMessageCard02'
import MobileMessageImage01 from 'components/components/dashboard/message/MobileMessageImage01'
import MobileMessageImage02 from 'components/components/dashboard/message/MobileMessageImage02'
import MobileMessageVideo01 from 'components/components/dashboard/message/MobileMessageVideo01'
import MobileMessageVideo02 from 'components/components/dashboard/message/MobileMessageVideo02'
import MobileMessageDownload01 from 'components/components/dashboard/message/MobileMessageDownload01'
import MobileMessageDownload02 from 'components/components/dashboard/message/MobileMessageDownload02'
import MobileMessageInput from 'components/components/dashboard/message/MobileMessageInput'

// images and icons
import ArrowLeftBlackIcon from 'assets/images/arrow-left-black.svg'
import TrashIcon from 'assets/images/trash.svg'

// styles
import styles from './message-content.module.scss'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const MessageContent = props => {
  // variables
  const { viewport } = props
  const router = useRouter()
  const [newMessage, setNewMessage] = useState({
    attachment: [],
    content: '',
    from_email: '',
    from_id: 0,
    from_name: '',
    from_type: 'patient',
    request_id: 0,
    subject: '',
    to_email: '',
    to_id: 0,
    to_name: '',
    to_type: 'user',
  })
  const [requestID, setRequestID] = useState(0)
  const [newMessageBool, setNewMessageBool] = useState(false)
  const [
    getSubMessagesByDashboard,
    { data: subMessageListData, loading: subMessageListLoading, error: subMessageListError },
  ] = useLazyQuery(graphql.queries.getSubMessagesByDashboard)
  const [subMessageList, setSubMessageList] = useState([])
  const [createMessageByDashboard] = useMutation(graphql.mutations.createMessageByDashboard)
  const [deleteMessageByDashboard] = useMutation(graphql.mutations.deleteMessageByDashboard)

  const [scrollEl, setScrollEl] = useState()

  // handlers
  useEffect(() => {
    if (viewport !== 'mobile') {
      router.push('/dashboard/message')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport])

  const handleGoBack = () => {
    router.push('/dashboard/message?success=true')
  }
  useEffect(() => {
    setNewMessageBool(Boolean(router.query.new_message_bool))
    setNewMessage(newMessage => ({ ...newMessage, content: router.query.content }))
    setNewMessage(newMessage => ({ ...newMessage, from_email: router.query.from_email }))
    setNewMessage(newMessage => ({ ...newMessage, from_id: Number(router.query.from_id) }))
    setNewMessage(newMessage => ({ ...newMessage, from_name: router.query.from_name }))
    setNewMessage(newMessage => ({ ...newMessage, from_type: router.query.from_type }))
    setNewMessage(newMessage => ({ ...newMessage, request_id: Number(router.query.request_id) }))
    setNewMessage(newMessage => ({ ...newMessage, subject: router.query.subject }))
    setNewMessage(newMessage => ({ ...newMessage, to_email: router.query.to_email }))
    setNewMessage(newMessage => ({ ...newMessage, to_id: Number(router.query.to_id) }))
    setNewMessage(newMessage => ({ ...newMessage, to_name: router.query.to_name }))
    setNewMessage(newMessage => ({ ...newMessage, to_type: router.query.to_type }))
    if (router.query.message_id) {
      getSubMessagesByDashboard({
        variables: { message_id: Number(router.query.message_id) },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (!subMessageListError && subMessageListData && subMessageListData.getSubMessagesByDashboard) {
      setSubMessageList(subMessageListData.getSubMessagesByDashboard)
    }
  }, [subMessageListLoading, subMessageListData, subMessageListError])

  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = Number.MAX_SAFE_INTEGER
    }
  }, [scrollEl, subMessageList])

  const handleRemoveMessage = () => {
    let array = []
    array.push(Number(router.query.message_id))
    deleteMessageByDashboard({
      variables: { ids: array },
    })
      .then(response => {
        if (response.data.deleteMessageByDashboard === true) {
          toast.success('Selected message was deleted successfully!')
          router.push('/dashboard/message?success=true')
        }
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  const handleChangeSubject = event => {
    setNewMessage(newMessage => ({ ...newMessage, subject: event.target.value }))
  }

  const handleSendMessage = (content, attachedFile) => {
    let object = newMessage
    object.request_id = requestID
    object.content = content
    if (attachedFile !== '') {
      object.attachment.push(attachedFile)
    }
    createMessageByDashboard({
      variables: object,
    })
      .then(response => {
        if (requestID === 0) {
          setRequestID(response.data.createMessageByDashboard.id)
        }
        getSubMessagesByDashboard({
          variables: { message_id: response.data.createMessageByDashboard.id },
        })
      })
      .catch(error => {
        toast.error(error.message)
      })
    setNewMessageBool(false)
  }

  return (
    <div className={styles.container}>
      <div className={'w-full flex justify-between items-center ' + styles.headerContainer}>
        <div className={'flex cursor'} onClick={() => handleGoBack()}>
          <Image src={ArrowLeftBlackIcon} alt={''} width={14} height={14} />
          <p className={styles.headerTitle}>Mensajes</p>
        </div>
        <div>
          <button
            className={
              'w-8 h-8 duration-200 hover:bg-gray-200 border-2 border-gray-400 rounded-full flex justify-center items-center'
            }
            onClick={() => handleRemoveMessage()}
          >
            <Image src={TrashIcon} alt={''} width={9} height={10} />
          </button>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {/* subject part */}
        <div className={styles.subjectArea}>
          <div className={styles.name}>{newMessageBool ? router.query.to_name : router.query.from_name}</div>
          <div className={styles.subject}>
            {router.query.subject !== '' ? (
              router.query.subject
            ) : (
              <input
                type="text"
                autoComplete="new-password"
                placeholder="Haz click aquí y escribe el título de tu mensaje"
                className={'w-full h-full bg-transparent py-1 px-2 text-black ' + styles.input}
                value={newMessage.subject}
                onChange={event => handleChangeSubject(event)}
              />
            )}
          </div>
        </div>
        {/* chat area */}
        <div className={styles.chatArea}>
          <PerfectScrollbar
            containerRef={ref => {
              setScrollEl(ref)
            }}
          >
            <>
              {subMessageList.map((item, index) =>
                item.to_type === 'user' ? (
                  item.content !== '' ? (
                    <MobileMessageCard01 key={index} message={item} />
                  ) : item.attachment.length !== 0 && item.attachment[0].type.split('/')[0] === 'image' ? (
                    <MobileMessageImage01 key={index} message={item} />
                  ) : item.attachment.length !== 0 && item.attachment[0].type.split('/')[0] === 'video' ? (
                    <MobileMessageVideo01 key={index} message={item} />
                  ) : (
                    item.attachment.length !== 0 && <MobileMessageDownload01 key={index} message={item} />
                  )
                ) : item.content !== '' ? (
                  <MobileMessageCard02 key={index} message={item} />
                ) : item.attachment.length !== 0 && item.attachment[0].type.split('/')[0] === 'image' ? (
                  <MobileMessageImage02 key={index} message={item} />
                ) : item.attachment.length !== 0 && item.attachment[0].type.split('/')[0] === 'video' ? (
                  <MobileMessageVideo02 key={index} message={item} />
                ) : (
                  item.attachment.length !== 0 && <MobileMessageDownload02 key={index} message={item} />
                )
              )}
            </>
            {/* )} */}
          </PerfectScrollbar>
        </div>
      </div>
      {/* message input area */}
      <div className={styles.messageSendContainer}>
        <MobileMessageInput sendMessage={(content, attachedFile) => handleSendMessage(content, attachedFile)} />
      </div>
    </div>
  )
}

export default MessageContent
