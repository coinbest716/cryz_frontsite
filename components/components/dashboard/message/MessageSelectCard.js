import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './MessageSelectCard.module.scss'

// images
import TrashIcon from 'assets/images/trash.svg'

const MessageSelectCard = props => {
  const { data, onChangeSubject, newMessageBool } = props

  const handleChangeSubject = event => {
    console.log('event', event.target.value)
    onChangeSubject(event.target.value)
  }
  return (
    <div className={styles.container}>
      <div className={'flex justify-start w-full'}>
        <div className={'relative mr-4 ' + styles.avatar}>
          {data?.from_name?.split(' ')[0].slice(0, 1).toUpperCase()}
          {data?.from_name?.split(' ')[1].slice(0, 1).toUpperCase()}
        </div>
        <div className={'inline-grid justify-start items-center'}>
          {!newMessageBool ? (
            <div className={styles.title}>{data.subject}</div>
          ) : (
            <input
              type="text"
              autoComplete="new-password"
              placeholder="Subject"
              className={'w-full h-full bg-transparent py-1 px-2 text-black ' + styles.input}
              value={data.subject}
              onChange={event => handleChangeSubject(event)}
            />
          )}
          <div className={'mt-2 ' + styles.text}>{data.from_name}</div>
        </div>
      </div>
      <div className={'grid justify-center items-center'}>
        <Image src={TrashIcon} alt={''} width={31} height={31} />
      </div>
    </div>
  )
}

export default MessageSelectCard
