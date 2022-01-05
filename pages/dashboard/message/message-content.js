import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// custom components
import MessageCard01 from 'components/components/dashboard/message/MessageCard01'
import MessageCard02 from 'components/components/dashboard/message/MessageCard02'
import MessageImage01 from 'components/components/dashboard/message/MessageImage01'
import MessageImage02 from 'components/components/dashboard/message/MessageImage02'
import MessageVideo01 from 'components/components/dashboard/message/MessageVideo01'
import MessageVideo02 from 'components/components/dashboard/message/MessageVideo02'
import MessageDownload01 from 'components/components/dashboard/message/MessageDownload01'
import MessageDownload02 from 'components/components/dashboard/message/MessageDownload02'
import MessageInput from 'components/components/dashboard/message/MessageInput'

// images and icons
import ArrowLeftBlackIcon from 'assets/images/arrow-left-black.svg'
import TrashIcon from 'assets/images/trash.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './message-content.module.scss'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const MessageContent = props => {
  // variables
  const router = useRouter()
  const [
    getSubMessagesByDashboard,
    { data: subMessageListData, loading: subMessageListLoading, error: subMessageListError },
  ] = useLazyQuery(graphql.queries.getSubMessagesByDashboard)
  const [subMessageList, setSubMessageList] = useState([])

  const [scrollEl, setScrollEl] = useState()

  // handlers
  const handleGoBack = () => {
    router.push('/dashboard/message')
  }
  useEffect(() => {
    if (router.query.message_id) {
      getSubMessagesByDashboard({
        variables: { message_id: Number(router.query.message_id) },
      })
    }
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
            onClick={id => handleRemoveMessage(id)}
          >
            <Image src={TrashIcon} alt={''} width={9} height={10} />
          </button>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {/* chat area */}
        <div className={styles.chatArea}>
          <PerfectScrollbar
            containerRef={ref => {
              setScrollEl(ref)
            }}
          >
            {/* {newMessageBool ? (
              <></>
            ) : ( */}
            <>
              {subMessageList.map((item, index) =>
                item.to_type === 'user' ? (
                  item.content !== '' ? (
                    <MessageCard01 key={index} message={item} />
                  ) : item.attachment.length !== 0 && item.attachment[0].type.split('/')[0] === 'image' ? (
                    <MessageImage01 key={index} message={item} />
                  ) : item.attachment.length !== 0 && item.attachment[0].type.split('/')[0] === 'video' ? (
                    <MessageVideo01 key={index} message={item} />
                  ) : (
                    item.attachment.length !== 0 && <MessageDownload01 key={index} message={item} />
                  )
                ) : item.content !== '' ? (
                  <MessageCard02 key={index} message={item} />
                ) : item.attachment.length !== 0 && item.attachment[0].type.split('/')[0] === 'image' ? (
                  <MessageImage02 key={index} message={item} />
                ) : item.attachment.length !== 0 && item.attachment[0].type.split('/')[0] === 'video' ? (
                  <MessageVideo02 key={index} message={item} />
                ) : (
                  item.attachment.length !== 0 && <MessageDownload02 key={index} message={item} />
                )
              )}
            </>
            {/* )} */}
          </PerfectScrollbar>
        </div>
        {/* message input area */}
        <div className={styles.messageSendArea}>
          <div className={'my-5 mx-7 flex justify-end'}>
            <MessageInput sendMessage={(content, attachedFile) => handleSendMessage(content, attachedFile)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageContent
