import React from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'

// custom components
import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from './message.module.scss'

const Message = () => {
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
    </div>
  )
}
export default Message

Message.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
