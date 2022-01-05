import React, { useEffect, useRef, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import toast from 'react-hot-toast'
import { Auth } from 'aws-amplify'
import moment from 'moment'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import MessageCard01 from 'components/components/dashboard/message/MessageCard01'
import MessageCard02 from 'components/components/dashboard/message/MessageCard02'
import MessageImage01 from 'components/components/dashboard/message/MessageImage01'
import MessageImage02 from 'components/components/dashboard/message/MessageImage02'
import MessageVideo01 from 'components/components/dashboard/message/MessageVideo01'
import MessageVideo02 from 'components/components/dashboard/message/MessageVideo02'
import MessageDownload01 from 'components/components/dashboard/message/MessageDownload01'
import MessageDownload02 from 'components/components/dashboard/message/MessageDownload02'
import MessageInput from 'components/components/dashboard/message/MessageInput'
import ProfessionalCard from 'components/components/dashboard/message/ProfessionalCard'
import SubjectCard from 'components/components/dashboard/message/SubjectCard'
import MessageSelectCard from 'components/components/dashboard/message/MessageSelectCard'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './message.module.scss'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import router from 'next/router'

const Message = props => {
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
  const { viewport } = props
  const [currentPatient, setCurrentPatient] = useState({})
  const today = useSelector(state => state.today)
  const [userList, setUserList] = useState([])
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
  const [newMessageBool, setNewMessageBool] = useState(false)
  const [messageList, setMessageList] = useState([])
  const [subMessageList, setSubMessageList] = useState([])
  const [selectedSubject, setSelectedSubject] = useState({})

  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [getUserForMessage, { data: userListData, loading: userListLoading, error: userListError }] = useLazyQuery(
    graphql.queries.getUserForMessage
  )
  const [getPatientMessageById, { data: messageListData, loading: messageListLoading, error: messageListError }] =
    useLazyQuery(graphql.queries.getPatientMessageById)

  const [
    getSubMessagesByDashboard,
    { data: subMessageListData, loading: subMessageListLoading, error: subMessageListError },
  ] = useLazyQuery(graphql.queries.getSubMessagesByDashboard)

  const [createMessageByDashboard] = useMutation(graphql.mutations.createMessageByDashboard)

  const [dropdownButtonHover, setDropdownButtonHover] = useState(false)

  const [scrollEl, setScrollEl] = useState()

  // handlers
  useEffect(() => {
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
  }, [getPatientByEmail])

  useEffect(() => {
    if (!personalError && personalData && personalData.getPatientByEmail) {
      if (personalData === null) {
        toast.error('Please insert your personal information in Profile page.')
        router.push('/dashboard/profile')
      } else {
        setCurrentPatient(personalData.getPatientByEmail)
        getUserForMessage({
          variables: {
            patient_id: personalData.getPatientByEmail.id,
          },
        })
      }
    }
  }, [getUserForMessage, personalLoading, personalData, personalError])

  useEffect(() => {
    if (JSON.stringify(currentPatient) !== JSON.stringify({})) {
      getPatientMessageById({
        variables: { patient_id: currentPatient.id },
      })
    }
  }, [getPatientMessageById, currentPatient])

  useEffect(() => {
    if (!userListError && userListData && userListData.getUserForMessage) {
      setUserList(userListData.getUserForMessage)
    }
  }, [userListLoading, userListData, userListError])

  useEffect(() => {
    if (!messageListError && messageListData && messageListData.getPatientMessageById) {
      // set all message list
      setMessageList(messageListData.getPatientMessageById)
      // select first message and get first message content
      setSelectedSubject(messageListData.getPatientMessageById[0])
      getSubMessagesByDashboard({
        variables: { message_id: messageListData.getPatientMessageById[0].id },
      })
    }
  }, [messageListLoading, messageListData, messageListError])

  useEffect(() => {
    if (!subMessageListError && subMessageListData && subMessageListData.getSubMessagesByDashboard) {
      setSubMessageList(subMessageListData.getSubMessagesByDashboard)
    }
  }, [subMessageListLoading, subMessageListData, subMessageListError])

  const handleSelectSubject = data => {
    let array = []
    messageList.map((item, index) => {
      if (item.id !== undefined) {
        array.push(item)
      }
    })
    setMessageList(array)
    if (viewport !== 'mobile') {
      setNewMessageBool(false)
      setSelectedSubject(data)
      let object = {}
      object.attachment = []
      object.content = ''
      object.from_email = currentPatient.email
      object.from_id = currentPatient.id
      object.from_name = currentPatient.name + ' ' + currentPatient.lastname
      object.from_type = 'patient'
      object.request_id = data.id
      object.subject = data.subject
      object.to_email = data.from_email
      object.to_id = data.from_id
      object.to_name = data.from_name
      object.to_type = 'user'
      setNewMessage(object)
      getSubMessagesByDashboard({
        variables: { message_id: data.id },
      })
    } else {
      router.push('/dashboard/message/message-content')
    }
  }

  const handleSelectUser = item => {
    let object = {}
    object.attachment = []
    object.content = ''
    object.from_email = currentPatient.email
    object.from_id = currentPatient.id
    object.from_name = currentPatient.name + ' ' + currentPatient.lastname
    object.from_type = 'patient'
    object.request_id = 0
    object.subject = ''
    object.to_email = item.email
    object.to_id = item.id
    object.to_name = item.name + ' ' + item.lastname
    object.to_type = 'user'
    setNewMessage(object)
    let obj = object
    obj.create_date = moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').split('+')[0]
    let temp = messageList
    setMessageList([obj].concat(temp))
    setSelectedSubject({})
    setNewMessageBool(true)
  }

  const handleChangeSubject = value => {
    setNewMessage(newMessage => ({ ...newMessage, subject: value }))
  }

  const handleSendMessage = (content, attachedFile) => {
    let object = newMessage
    if (!newMessageBool) {
      object.request_id = selectedSubject.id
    } else {
      object.request_id = 0
    }
    object.content = content
    if (attachedFile !== '') {
      object.attachment.push(attachedFile)
    }
    createMessageByDashboard({
      variables: object,
    })
      .then(response => {
        getPatientMessageById({
          variables: { patient_id: currentPatient.id },
        })
        getSubMessagesByDashboard({
          variables: { message_id: response.data.createMessageByDashboard.request_id },
        })
      })
      .catch(error => {
        toast.error(error.message)
      })
    setNewMessageBool(false)
  }

  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = Number.MAX_SAFE_INTEGER
    }
  }, [scrollEl, subMessageList])

  return viewport !== 'mobile' ? (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={'block'}>
          <div className={globalStyles.dashTitle}>Mensajes</div>
          <div className={'mt-2 ' + globalStyles.dashDate}>{today}</div>
        </div>
      </div>
      {/* body part */}
      <div className={'w-full flex flex-wrap mt-6 ' + styles.contentBorder}>
        <div className={'w-full md:w-1/2 relative '}>
          {/* professional area */}
          <div className={styles.professionalArea}>
            <ProfessionalCard
              dropdownButtonHover={dropdownButtonHover}
              onClickButton={bool => setDropdownButtonHover(bool)}
              viewport={viewport}
            />
          </div>
          {/* dropdown menu part */}
          {dropdownButtonHover ? (
            <div className={styles.dropMenuArea} onClick={() => setDropdownButtonHover(false)}>
              {userList.length !== 0 ? (
                userList.map((item, index) => {
                  return (
                    <div key={index} className={styles.dropMenuItemArea} onClick={() => handleSelectUser(item)}>
                      {item.name} {item.lastname}
                    </div>
                  )
                })
              ) : (
                <div className={styles.dropMenuItemArea}>There is no trainer</div>
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
                    onClick={() => handleSelectSubject(item)}
                  />
                ))}
            </PerfectScrollbar>
          </div>
        </div>
        <div className={'w-full md:w-1/2 '}>
          {/* message select card area */}
          <div className={styles.subjectTitleArea}>
            <MessageSelectCard
              data={newMessageBool ? newMessage : selectedSubject}
              newMessageBool={newMessageBool}
              onChangeSubject={value => handleChangeSubject(value)}
            />
          </div>
          {/* chat area */}
          <div className={styles.chatArea}>
            <PerfectScrollbar
              containerRef={ref => {
                setScrollEl(ref)
              }}
            >
              {newMessageBool ? (
                <></>
              ) : (
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
              )}
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
    </div>
  ) : (
    <div className={'w-full relative'}>
      {/* mobile view */}
      {/* professional area */}
      <div>
        <ProfessionalCard
          dropdownButtonHover={dropdownButtonHover}
          onClickButton={bool => setDropdownButtonHover(bool)}
          viewport={viewport}
        />
      </div>
      {/* dropdown menu part */}
      {dropdownButtonHover ? (
        <div className={styles.dropMenuArea} onClick={() => setDropdownButtonHover(false)}>
          {userList.length !== 0 ? (
            userList.map((item, index) => {
              return (
                <div key={index} className={styles.dropMenuItemArea} onClick={() => handleSelectUser(item)}>
                  {item.name} {item.lastname}
                </div>
              )
            })
          ) : (
            <div className={styles.dropMenuItemArea}>There is no trainer</div>
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
                onClick={() => handleSelectSubject(item)}
              />
            ))}
        </PerfectScrollbar>
      </div>
    </div>
  )
}
export default Message

Message.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Mensajes">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
