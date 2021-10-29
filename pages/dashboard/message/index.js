import React from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'

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
      <div>
        <MessageCard01 message={messageContent} />
        <MessageCard02 message={messageContent} />
        <MessageImage01 message={messageImage} />
        <MessageImage02 message={messageImage} />
        <MessageVideo01 message={messageVideo} />
        <MessageVideo02 message={messageVideo} />
        <MessageInput message={messageInput} sendMessage={(content, type) => handleSendMessage(content, type)} />

        <ProfessionalCard />
        <MessageCard />
      </div>
      <div className={'w-full flex flex-wrap ' + styles.contentBorder}>
        <div className={'w-full md:w-1/2 '}>
          {/* professional area */}
          <div className={styles.professionalBorder}>
            <div>Profesionales</div>
            <ProfessionalCard />
            <ProfessionalCard />
            <ProfessionalCard />
            <ProfessionalCard />
            <ProfessionalCard />
          </div>
          {/* message area */}
          <div className={styles.messageBorder}>
            <div className={'flex justify-between'}>
              <div>Mensajes</div>
              <div>Mensajes</div>
            </div>
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
          </div>
        </div>
        <div className={'w-full md:w-1/2 ' + styles.commonBorder}>bbb</div>
      </div>
    </div>
  )
}
export default Message

Message.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
