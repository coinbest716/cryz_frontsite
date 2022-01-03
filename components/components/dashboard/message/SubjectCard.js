import React, { useEffect } from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './SubjectCard.module.scss'

// images
import CheckIcon from 'assets/images/check.svg'

const SubjectCard = props => {
  const { data, active, onClick } = props
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  let yyyy = today.getFullYear()
  today = yyyy + '-' + mm + '-' + dd
  let create_date = new Date(new Date(data.create_date) - new Date(data.create_date).getTimezoneOffset() / 60)

  return (
    <div className={styles.container + ' ' + (active === true ? styles.active : '')} onClick={() => onClick(data)}>
      <div className={'flex justify-start'}>
        <div className={'relative mr-4 ' + styles.avatar}>
          {data?.from_type === 'user'
            ? data?.from_name.split(' ')[0].slice(0, 1).toUpperCase()
            : data?.to_name.split(' ')[0].slice(0, 1).toUpperCase()}
          {data?.from_type === 'user'
            ? data?.from_name.split(' ')[1].slice(0, 1).toUpperCase()
            : data?.to_name.split(' ')[1].slice(0, 1).toUpperCase()}
          {data.notification === 'unread' ? (
            <div className={styles.status} style={{ backgroundColor: '#5D51C6' }}></div>
          ) : (
            <></>
          )}
        </div>
        <div className={'inline-grid justify-start items-center'}>
          <div className={styles.title}>{data.subject}</div>
          <div className={'mt-2 ' + styles.text}>{data.content}</div>
        </div>
      </div>
      <div className={'grid justify-center items-center'}>
        <div className={styles.text + ' block text-center'}>
          {today !== data.create_date.split('T')[0] ? (
            <div>
              {create_date.getFullYear()}/{create_date.getMonth() + 1}/{create_date.getDate()}
              <br />
            </div>
          ) : (
            <></>
          )}
          <div>
            {create_date.getHours()}:{create_date.getMinutes()}:{create_date.getSeconds()}
          </div>
        </div>
        <div className={'mt-2 inline-grid'}>
          <Image src={CheckIcon} alt={''} width={26} height={26} />
        </div>
      </div>
    </div>
  )
}

export default SubjectCard
