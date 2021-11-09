import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from 'components/components/dashboard/message/MessageImage01.module.scss'

// images and icons
import DownloadIcon from 'assets/images/download.svg'

const MessageImage01 = props => {
  const { message } = props
  return (
    <div className={'relative inline-grid'}>
      <Image src={message.thumbnail} alt={''} width={125} height={101} className={styles.container} />
      <div className={styles.download}>
        <button className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}>
          <Image src={DownloadIcon} alt={''} width={18} height={22} />
        </button>
      </div>
    </div>
  )
}

export default MessageImage01
