import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from 'components/components/dashboard/message/MessageInput.module.scss'

// images
import SendIcon from 'assets/images/send.svg'

const MessageInput = props => {
  const { message, sendMessage } = props
  const [content, setContent] = React.useState('')

  React.useEffect(() => {
    setContent(message)
  }, [message])

  const handleSetContent = event => {
    setContent(event.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <input
          type={'text'}
          value={content}
          placeholder={'Escribe tu mensaje'}
          onChange={event => handleSetContent(event)}
          className={
            'appearance-none bg-white border-none w-full leading-tight focus:outline-none focus ' + styles.input
          }
        />
      </div>
      <div className={styles.iconArea}>
        <button
          className="duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center"
          onClick={() => sendMessage(content, 'text')}
        >
          <Image src={SendIcon} alt={''} width={18} height={18} />
        </button>
      </div>
    </div>
  )
}

export default MessageInput
