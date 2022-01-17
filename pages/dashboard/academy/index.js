import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import AcademyDashboardCard from 'components/components/academy/AcademyDashboardCard'
import StartclassButton from 'components/components/StartClassButton'

// third party components
import moment from 'moment'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './academy.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Academy = props => {
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

  const [getAcademyWithPlazas, { data: mainData, loading: mainLoading, error: mainError }] = useLazyQuery(
    graphql.queries.getAcademyWithPlazas
  )
  const [getSessionsByDashboard, { data: sessionData, loading: sessionLoading, error: sessionError }] = useLazyQuery(
    graphql.queries.getSessionsByDashboard
  )
  const [cardData, setCardData] = useState([])
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })
  const [events, setEvents] = useState([])

  // handlers
  useEffect(() => {
    getSessionsByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
  }, [])

  useEffect(() => {
    getAcademyWithPlazas()
  }, [getAcademyWithPlazas])

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
    if (!mainError && mainData && mainData.getAcademyWithPlazas) {
      setCardData(mainData.getAcademyWithPlazas)
    }
  }, [mainLoading, mainData, mainError])

  const handleClickStartButton = () => {
    router.push({
      pathname: '/dashboard/live-streaming',
      query: { id: streamingEvent.id },
    })
  }

  const handleWatchNow = data => {
    dispatch({ type: 'set', isLoading: true })
    router.push(`/academy/${data.id}`)
  }

  return viewport !== 'mobile' ? (
    <div className={globalStyles.dashContainer}>
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Mis cursos Academy</div>
        <div className={'flex justify-end'}>
          <StartclassButton
            handleClick={() => handleClickStartButton()}
            label={'Comenzar clase'}
            visible={streamingEvent.toggle}
          />
          <NotificationButton />
        </div>
      </div>
      <div className={'grid grid-cols-12 gap-4 lg:gap-8 mb-24'}>
        {cardData?.map((card, index) => (
          <div className={'flex justify-center col-span-6 md:col-span-4 mt-9'} key={index}>
            <AcademyDashboardCard data={card} index={index} handleWatchNow={handleWatchNow} viewport={viewport} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <>Mobile View</>
  )
}

export default Academy

Academy.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Academy">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
