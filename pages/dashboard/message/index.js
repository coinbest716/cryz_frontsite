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
  const [currentPatient, setCurrentPatient] = useState({})
  const today = useSelector(state => state.today)
  const [userList, setUserForMessage] = useState([])
  const [newMessage, setNewMessage] = useState({})
  const [messageList, setMessageList] = useState([])
  const [selectedSubject, setSelectedSubject] = useState({})

  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [getUserForMessage, { data: userListData, loading: userListLoading, error: userListError }] = useLazyQuery(
    graphql.queries.getUserForMessage
  )
  const [getPatientMessageById, { data: messageListData, loading: messageListLoading, error: messageListError }] =
    useLazyQuery(graphql.queries.getPatientMessageById)

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
    if (!personalError && personalData && personalData.getPatientByEmail) {
      if (personalData === null) {
        toast.error('Please insert your personal information in Profile page.')
        router.push('/dashboard/profile')
      } else {
        setCurrentPatient(personalData.getPatientByEmail)
      }
    }
  }, [personalLoading, personalData, personalError])

  useEffect(() => {
    if (currentPatient.id !== 0) {
      getPatientMessageById({
        variables: { patient_id: currentPatient.id },
      })
    }
  }, [getPatientMessageById, currentPatient])

  useEffect(() => {
    if (!userListError && userListData && userListData.getUserForMessage) {
      setUserForMessage(userListData.getUserForMessage)
    }
  }, [userListLoading, userListData, userListError])

  useEffect(() => {
    if (!messageListError && messageListData && messageListData.getPatientMessageById) {
      setMessageList(messageListData.getPatientMessageById)
    }
  }, [messageListLoading, messageListData, messageListError])

  const handleSelectSubject = data => {
    setSelectedSubject(data)
  }

  const handleSelectUser = item => {
    let object = {}
    object.attachment = []
    object.content = ''
    object.create_date = new Date()
    object.from_email = currentPatient.email
    object.from_id = currentPatient.id
    object.from_name = currentPatient.name
    object.id = 0
    object.notification = 'unread'
    object.request_id = 0
    object.subject = ''
    object.to_email = item.email
    object.to_id = item.id
    object.to_name = item.name
    object.to_type = 'patient'
    setNewMessage(object)
    setSelectedSubject({})
  }

  const handleSendMessage = (content, type) => {
    switch (type) {
      case 'text':
        setMessageInput(content)
        setNewMessage(newMessage => ({ ...newMessage, content: content }))
        break
      case 'file':
        let array = []
        array.push(content)
        setNewMessage(newMessage => ({ ...newMessage, attachment: array }))
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
              data={userList}
              dropdownButtonHover={dropdownButtonHover}
              onClickButton={bool => setDropdownButtonHover(bool)}
            />
          </div>
          {/* dropdown menu part */}
          {dropdownButtonHover ? (
            <div className={styles.dropMenuArea} onClick={() => setDropdownButtonHover(false)}>
              {userList.length !== 0 ? (
                userList.map((item, index) => {
                  return (
                    <div key={index} className={styles.dropMenuItemArea} onClick={() => handleSelectUser(item)}>
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
              {messageList.length !== 0 &&
                messageList.map((item, index) => (
                  <SubjectCard
                    data={item}
                    key={index}
                    active={selectedSubject.id === item.id ? true : false}
                    onClick={data => handleSelectSubject(data)}
                  />
                ))}
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
              {console.log('new message', newMessage)}
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
