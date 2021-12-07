import React, { createRef, useEffect, useState } from 'react'

// next components
import Image from 'next/image'

// styles
import styles from 'components/components/dashboard/message/MessageInput.module.scss'

// images
import SendIcon from 'assets/images/send.svg'

import CloseIcon from 'assets/images/close-gray.svg'
import SmileIcon from 'assets/images/smile.svg'
import AttachIcon from 'assets/images/attach.svg'
import SendWhiteIcon from 'assets/images/send-white.svg'

const MessageInput = props => {
  const { message, sendMessage } = props
  const [content, setContent] = useState('')
  const fileRef = createRef()
  const [attachedFile, setAttachedFile] = useState({})

  const handleSetContent = event => {
    setContent(event.target.value)
  }

  // handlers
  const handleAttachFile = event => {
    console.log(event.target.files[0])
    setAttachedFile(event.target.files[0])
  }

  const onClickAttachFile = () => {
    fileRef.current.click()
  }

  const onClickRemoveFile = () => {
    setAttachedFile({})
  }

  const onKeyPress = event => {
    if (event.shiftKey === false && event.key === 'Enter') {
      setContent('')
      sendMessage(content, 'text')
    }
  }

  return (
    <div className={styles.container}>
      {/* input part */}
      <div className={'w-full flex bg-white'}>
        <div className={styles.inputArea}>
          <textarea
            type={'text'}
            value={content}
            placeholder={'Escribe tu mensaje'}
            onChange={event => handleSetContent(event)}
            className={
              'appearance-none bg-white border-none w-full leading-tight focus:outline-none focus ' + styles.input
            }
            onKeyPress={event => onKeyPress(event)}
          />
        </div>
        <div className={styles.iconArea}>
          <button
            className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
            onClick={() => sendMessage(content, 'text')}
          >
            <Image src={SendIcon} alt={''} width={18} height={18} />
          </button>
        </div>
      </div>
      {/* icon part */}
      <div className={'w-full flex justify-between items-center mt-4'}>
        {/* attached file part */}
        <div className={'w-full flex justify-start items-center'}>
          <div>{attachedFile.name}</div>
          {attachedFile.name !== undefined ? (
            <button
              className={'duration-200 hover:bg-gray-300 rounded-full p-2 flex justify-center items-center ml-3'}
              onClick={() => onClickRemoveFile()}
            >
              <Image src={CloseIcon} alt={''} width={14} height={14} />
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className={'w-full flex justify-end'}>
          <button className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}>
            <Image src={SmileIcon} alt={''} width={21} height={21} />
          </button>
          <button
            className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
            onClick={onClickAttachFile}
          >
            <Image src={AttachIcon} alt={''} width={21} height={21} />
          </button>
          <input className={'hidden'} type="file" id="img_frontr" onChange={handleAttachFile} ref={fileRef} />
          <div className={'ml-4'}>
            <button className={styles.enterButton}>
              <div className={'flex items-center mr-3'}>
                <Image src={SendWhiteIcon} alt={''} width={16} height={16} />
              </div>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageInput
