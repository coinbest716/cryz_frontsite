import React, { createRef, useState } from 'react'

// next components
import Image from 'next/image'

// images
import SendIcon from 'assets/images/send.svg'
import CloseIcon from 'assets/images/close-gray.svg'
import AttachIcon from 'assets/images/attach.svg'

// styles
import styles from 'components/components/dashboard/message/MobileMessageInput.module.scss'

const MobileMessageInput = props => {
  const { sendMessage } = props
  const [content, setContent] = useState('')
  const fileRef = createRef()
  const [attachedFile, setAttachedFile] = useState('')

  const handleSetContent = (event, type) => {
    switch (type) {
      case 'common':
        if (event.target.value !== '\n') {
          setContent(event.target.value)
        }
        break
      case 'enter':
        setContent('')
        break
    }
  }

  // handlers
  const handleAttachFile = event => {
    setAttachedFile(event.target.files[0])
  }

  const onClickAttachFile = () => {
    fileRef.current.click()
  }

  const onClickRemoveFile = () => {
    setAttachedFile('')
  }

  const handleTextareaOnKeyPress = event => {
    if (event.shiftKey === false && event.key === 'Enter') {
      sendMessage(content, attachedFile)
      handleSetContent(event, 'enter')
      setAttachedFile('')
    }
  }

  const handleSendMessage = () => {
    sendMessage(content, attachedFile)
    setContent('')
    setAttachedFile('')
  }

  return (
    <div className={styles.container}>
      {/* input part */}
      <div className={'w-full flex bg-white justify-between'}>
        <div className={styles.inputArea}>
          <textarea
            type={'text'}
            value={content}
            placeholder={'Escribe tu mensaje'}
            onChange={event => handleSetContent(event, 'common')}
            className={
              'appearance-none bg-white border-none w-full leading-tight focus:outline-none focus ' + styles.input
            }
            onKeyPress={event => handleTextareaOnKeyPress(event)}
          />
        </div>
        <div className={'flex justify-end items-center'}>
          <button
            className={'duration-200 hover:bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center'}
            onClick={onClickAttachFile}
          >
            <Image src={AttachIcon} alt={''} width={21} height={21} />
          </button>
          <input className={'hidden'} type="file" id="img_frontr" onChange={handleAttachFile} ref={fileRef} />
          <button
            className={'duration-200 hover:bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center ml-2'}
            onClick={() => handleSendMessage()}
          >
            <Image src={SendIcon} alt={''} width={21} height={21} />
          </button>
        </div>
      </div>
      {/* icon part */}
      {/* attached file part */}
      {/* <div className={'w-full flex justify-between items-center'}>
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
      </div> */}
    </div>
  )
}

export default MobileMessageInput
