import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from 'components/components/dashboard/message/MessageDownload02.module.scss'

// images and icons
import DownloadIcon from 'assets/images/download-gray.svg'

const MessageDownload02 = props => {
  const { message } = props

  const download = (fileUrl, fileName) => {
    var a = document.createElement('a')
    a.href = fileUrl
    a.setAttribute('download', fileName)
    a.click()
  }

  return (
    <div className={'w-full py-5 px-7 flex justify-start'}>
      <div className={'relative inline-grid'}>
        <div className={styles.container}>{message.attachment[0].name}</div>
        <div className={styles.download}>
          <button
            className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
            onClick={() => download(message.attachment[0].path, message.attachment[0].name)}
          >
            <Image src={DownloadIcon} alt={''} width={18} height={22} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageDownload02
