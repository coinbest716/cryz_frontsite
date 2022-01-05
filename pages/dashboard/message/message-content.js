import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

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
        {/* subject part */}
        <div className={styles.subjectArea}></div>
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
      <div className={styles.messageSendContainer}></div>
    </div>
  )
}

export default MessageContent
