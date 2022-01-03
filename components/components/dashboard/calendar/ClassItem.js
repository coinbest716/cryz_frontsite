import React from 'react'

import moment from 'moment'
// styles
import styles from './ClassItem.module.scss'

const ClassItem = props => {
  const { event } = props
  return (
    <div className={styles.eventItem + ' flex items-center p-3'}>
      <div
        className={styles.eventMonth + ' flex-col flex justify-center items-center '}
        style={{ width: '64px', height: '64px', backgroundColor: event.backgroundColor, borderRadius: '8px' }}
      >
        <div>{moment(event.start).locale('es').format('MMM')}</div>
        <div>{moment(event.start).locale('es').format('DD')}</div>
      </div>
      <div className={styles.description + ' ml-2'}>
        <div>{event.title}</div>
        <div>
          {moment(event.start).format('LT')} - {moment(event.end).format('LT')}
        </div>
      </div>
    </div>
  )
}

export default ClassItem
