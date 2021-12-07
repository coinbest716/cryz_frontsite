import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import toast from 'react-hot-toast'
import { Auth } from 'aws-amplify'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
// import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import MessageCard01 from 'components/components/dashboard/message/MessageCard01'
import MessageCard02 from 'components/components/dashboard/message/MessageCard02'
import MessageImage01 from 'components/components/dashboard/message/MessageImage01'
import MessageImage02 from 'components/components/dashboard/message/MessageImage02'
import MessageVideo01 from 'components/components/dashboard/message/MessageVideo01'
import MessageVideo02 from 'components/components/dashboard/message/MessageVideo02'
import MessageInput from 'components/components/dashboard/message/MessageInput'
import ProfessionalCard from 'components/components/dashboard/message/ProfessionalCard'
import SubjectCard from 'components/components/dashboard/message/SubjectCard'
import MessageSelectCard from 'components/components/dashboard/message/MessageSelectCard'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './message.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import router from 'next/router'

const Message = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const [patientId, setPatientId] = useState(0)
  const today = useSelector(state => state.today)
  const [userForMessage, setUserForMessage] = useState([])
  const [patientMessageById, setPatientMessageById] = useState([])

  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [getUserForMessage, { data: userForMessageData, loading: userForMessageLoading, error: userForMessageError }] =
    useLazyQuery(graphql.queries.getUserForMessage)
  const [
    getPatientMessageById,
    { data: patientMessageByIdData, loading: patientMessageByIdLoading, error: patientMessageByIdError },
  ] = useLazyQuery(graphql.queries.getPatientMessageById)

  const messageContent = {
    content: 'Sayang, besok kamu ada acara keluar ga?',
    time: '10:56 AM',
  }
  const messageImage = {
    thumbnail: '/images/01.png',
    url: '/images/01.png',
  }
  const messageVideo = {
    thumbnail: '/images/01.png',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  }
  const [messageInput, setMessageInput] = useState('')

  const [dropdownButtonHover, setDropdownButtonHover] = useState(false)

  const [selectedUserID, setSelectedUserID] = useState(0)

  // handlers
  useEffect(() => {
    getUserForMessage()
    Auth.currentAuthenticatedUser()
      .then(response => {
        if (response?.attributes?.email) {
          getPatientByEmail({
            variables: {
              email: response.attributes.email,
            },
          })
        }
      })
      .catch(error => {
        toast.error(error.message)
        router.push('/')
      })
  }, [getUserForMessage, getPatientByEmail])

  useEffect(() => {
    getPatientMessageById({
      variables: { patient_id: patientId },
    })
  }, [getPatientMessageById, patientId])

  useEffect(() => {
    if (!personalError && personalData && personalData.getPatientByEmail) {
      setPatientId(personalData.getPatientByEmail.id)
    }
  }, [personalLoading, personalData, personalError])

  useEffect(() => {
    if (!userForMessageError && userForMessageData && userForMessageData.getUserForMessage) {
      setUserForMessage(userForMessageData.getUserForMessage)
    }
  }, [userForMessageLoading, userForMessageData, userForMessageError])

  useEffect(() => {
    if (!patientMessageByIdError && patientMessageByIdData && patientMessageByIdData.getPatientMessageById) {
      setPatientMessageById(patientMessageByIdData.getPatientMessageById)
    }
  }, [patientMessageByIdLoading, patientMessageByIdData, patientMessageByIdError])

  const handleSendMessage = (content, type) => {
    switch (type) {
      case 'text':
        setMessageInput(content)
        break
      default:
        break
    }
  }

  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={'block'}>
          <div className={globalStyles.dashTitle}>Mensajes</div>
          <div className={'mt-2 ' + globalStyles.dashDate}>{today}</div>
        </div>
        <div className={'flex justify-end'}>
          <NotificationButton />
          {/* <Profile /> */}
        </div>
      </div>
      {/* body part */}
      <div className={'w-full flex flex-wrap mt-6 ' + styles.contentBorder}>
        <div className={'w-full md:w-1/2 relative '}>
          {/* professional area */}
          <div className={styles.professionalArea}>
            <ProfessionalCard
              data={userForMessage}
              dropdownButtonHover={dropdownButtonHover}
              onClickButton={bool => setDropdownButtonHover(bool)}
            />
          </div>
          {/* dropdown menu part */}
          {dropdownButtonHover ? (
            <div className={styles.dropMenuArea} onClick={() => setDropdownButtonHover(false)}>
              {userForMessage.length !== 0 ? (
                userForMessage.map((item, index) => {
                  return (
                    <div key={index} className={styles.dropMenuItemArea} onClick={() => setSelectedUserID(item.id)}>
                      {item.name}
                    </div>
                  )
                })
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}

          {/* message area */}
          <div className={styles.subjectArea}>
            <PerfectScrollbar>
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </PerfectScrollbar>
          </div>
        </div>
        <div className={'w-full md:w-1/2 '}>
          {/* message select card area */}
          <div className={styles.subjectTitleArea}>
            <MessageSelectCard />
          </div>
          {/* chat area */}
          <div className={styles.chatArea}>
            <PerfectScrollbar>
              <MessageCard01 message={messageContent} />
              <MessageCard02 message={messageContent} />
              <MessageCard01 message={messageContent} />
              <MessageImage01 message={messageImage} />
              <MessageImage02 message={messageImage} />
              <MessageVideo01 message={messageVideo} />
              <MessageVideo02 message={messageVideo} />
            </PerfectScrollbar>
          </div>
          {/* message input area */}
          <div className={styles.messageSendArea}>
            <div className={'my-5 mx-7 flex justify-end'}>
              <MessageInput message={messageInput} sendMessage={(content, type) => handleSendMessage(content, type)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Message

Message.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
