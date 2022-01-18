import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import StartclassButton from 'components/components/StartClassButton'
import AcademyTable from 'components/components/dashboard/academy/AcademyTable'

// third party components
import moment from 'moment'
import 'react-calendar/dist/Calendar.css'
const MonthCalendar = dynamic(() => import('react-calendar'), { ssr: false })

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './id.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const AcademyDetail = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const { viewport } = props
  const router = useRouter()

  const [getAcademyWithPlazasById, { data: courseData, loading: courseLoading, error: courseError }] = useLazyQuery(
    graphql.queries.getAcademyWithPlazasById
  )
  const [getSessionsByDashboard, { data: sessionData, loading: sessionLoading, error: sessionError }] = useLazyQuery(
    graphql.queries.getSessionsByDashboard
  )
  const [academyData, setAcademyData] = useState({})
  const [markDate, setMarkDate] = useState([])
  const [events, setEvents] = useState([])
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })

  const [calendarValue, setCalendarValue] = useState(new Date())

  // handlers
  useEffect(() => {
    getSessionsByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
  }, [getSessionsByDashboard])

  useEffect(() => {
    if (router.query.id !== undefined) {
      getAcademyWithPlazasById({ variables: { id: Number(router.query.id) } })
    }
  }, [getAcademyWithPlazasById, router.query])

  useEffect(() => {
    if (!sessionError && sessionData && sessionData.getSessionsByDashboard) {
      const sessionArr = sessionData.getSessionsByDashboard
      const _events = []
      const _markDate = []
      sessionArr.map(item => {
        const _eventItem = {
          id: item.id,
          title: item.purchase.item_web_name,
          start: item.start_time,
          end: item.end_time,
          backgroundColor: item.location.color,
          textColor: '#ffffff',
          label: item.location.name,
          streaming: item.stream_event,
        }
        _markDate.push(moment(item.start_time).format('DD-MM-YYYY'))
        _events.push(_eventItem)
      })
      setEvents(_events)
      setMarkDate(_markDate)
    }
  }, [sessionLoading, sessionData, sessionError])

  useEffect(() => {
    setAvailableEvent()
    let classInterval = setInterval(() => {
      setAvailableEvent()
    }, 10000)
    return () => {
      clearInterval(classInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  const setAvailableEvent = () => {
    const currentTime = moment(new Date())
    let count = 0
    events.map(item => {
      const startTime = moment(item.start)
      const endTime = moment(item.end)
      const diffTime = startTime.diff(endTime, 'minutes')
      if (startTime.diff(currentTime, 'minutes') >= diffTime && startTime.diff(currentTime, 'minutes') <= 30) {
        setStreamingEvent({ id: item.id, start: item.start, toggle: item.streaming })
        count++
      } else {
        if (count === 0) {
          setStreamingEvent({ id: -1, start: '', toggle: false })
        }
      }
    })
  }

  useEffect(() => {
    if (!courseError && courseData && courseData.getAcademyWithPlazasById) {
      setAcademyData(courseData.getAcademyWithPlazasById)
    }
  }, [courseLoading, courseData, courseError])

  const handleClickStartButton = () => {
    router.push({
      pathname: '/dashboard/live-streaming',
      query: { id: streamingEvent.id },
    })
  }

  const handleChangeDate = value => {
    setCalendarValue(value)
    const eventDate = moment(value).format('YYYY-MM-DD')
    markDate.map(item => {
      if (item === moment(value).format('DD-MM-YYYY')) {
        router.push({
          pathname: '/dashboard/calendar',
          query: {
            eventDate: eventDate,
          },
        })
      }
    })
  }

  return viewport !== 'mobile' ? (
    <div className={globalStyles.dashContainer}>
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>{academyData.name}</div>
        <div className={'flex justify-end'}>
          <StartclassButton
            handleClick={() => handleClickStartButton()}
            label={'Comenzar clase'}
            visible={streamingEvent.toggle}
          />
          <NotificationButton />
        </div>
      </div>
      <div className={'flex mt-8'}>
        <div className={'flex flex-1 w-full mr-8'}>
          {academyData.list !== undefined && <AcademyTable data={academyData.list} viewport={viewport} />}
        </div>
        <div className={styles.calendarArea + ' calendarWrapper'}>
          <MonthCalendar
            className={styles.calendar}
            onChange={handleChangeDate}
            value={calendarValue}
            locale="es-MX"
            tileClassName={({ date, view }) => {
              if (markDate.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                return 'highlight'
              }
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <>Mobile View</>
  )
}

export default AcademyDetail

AcademyDetail.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Academy">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
