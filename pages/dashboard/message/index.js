import React from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'

// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// next components
import Image from 'next/image'

// custom components
import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import MessageCard01 from 'components/components/dashboard/message/MessageCard01'
import MessageCard02 from 'components/components/dashboard/message/MessageCard02'
import MessageImage01 from 'components/components/dashboard/message/MessageImage01'
import MessageImage02 from 'components/components/dashboard/message/MessageImage02'
import MessageVideo01 from 'components/components/dashboard/message/MessageVideo01'
import MessageVideo02 from 'components/components/dashboard/message/MessageVideo02'
import MessageInput from 'components/components/dashboard/message/MessageInput'

import ProfessionalCard from 'components/components/dashboard/message/ProfessionalCard'
import MessageCard from 'components/components/dashboard/message/MessageCard'
import MessageSelectCard from 'components/components/dashboard/message/MessageSelectCard'

// images
import PlusIcon from 'assets/images/plus.svg'
import TrashIcon from 'assets/images/trash.svg'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from './message.module.scss'

const Message = () => {
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
  const [messageInput, setMessageInput] = React.useState('')

  const handleSendMessage = (content, type) => {
    switch (type) {
      case 'text':
        setMessageInput(content)
        break
      default:
        break
    }
    console.log(content)
    console.log(type)
  }
  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={'block'}>
          <div className={globalStyles.dashTitle}>Mensajes</div>
          <div className={'mt-2 ' + globalStyles.dashDate}>Domingo, 12 de Diciembre 2021</div>
        </div>
        <div className={'flex justify-end'}>
          <div className={'mr-8'}>
            <NotificationButton />
          </div>
          <div>
            <Profile />
          </div>
        </div>
      </div>
      {/* body part */}
      <div className={'w-full flex flex-wrap mt-6 ' + styles.contentBorder}>
        <div className={'w-full md:w-1/2 '}>
          {/* professional area */}
          <div className={styles.professionalBorder + ' ' + styles.professionalArea}>
            <PerfectScrollbar>
              <div className={'mx-6 my-2 ' + styles.messageText}>Profesionales</div>
              <ProfessionalCard />
              <ProfessionalCard />
              <ProfessionalCard />
              <ProfessionalCard />
              <ProfessionalCard />
            </PerfectScrollbar>
          </div>
          {/* message area */}
          <div className={styles.messageBorder + ' ' + styles.messageArea}>
            <PerfectScrollbar>
              <div className={'flex justify-between mx-6 my-6'}>
                <div className={styles.messageText}>Mensajes</div>
                <div className={'flex ' + styles.messageText}>
                  <button className={'flex justify-center items-center mr-4'}>
                    <div className={'flex items-center mr-4'} style={{ fontSize: '24px' }}>
                      +
                    </div>
                    Nuevo mensaje
                  </button>
                  <button className={'grid justify-center items-center'}>
                    <Image src={TrashIcon} alt={''} width={31} height={31} />
                  </button>
                </div>
              </div>
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
            </PerfectScrollbar>
          </div>
        </div>
        <div className={'w-full md:w-1/2 '}>
          {/* message select card area */}
          <div className={styles.commonBorder}>
            <MessageSelectCard />
          </div>
          {/* chat area */}
          <div className={styles.commonBorder + ' ' + styles.chatArea}>
            <PerfectScrollbar>
              <div className={'my-5 mx-7 flex justify-end'}>
                <MessageCard01 message={messageContent} />
              </div>
              <div className={'my-5 mx-7 flex justify-start'}>
                <MessageCard02 message={messageContent} />
              </div>
              <div className={'my-5 mx-7 flex justify-end'}>
                <MessageCard01 message={messageContent} />
              </div>
              <div className={'my-5 mx-7 flex justify-end'}>
                <MessageImage01 message={messageImage} />
              </div>
              <div className={'my-5 mx-7 flex justify-end'}>
                <MessageVideo01 message={messageVideo} />
              </div>
            </PerfectScrollbar>
          </div>
          {/* message input area */}
          <div className={styles.commonBorder}>
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
