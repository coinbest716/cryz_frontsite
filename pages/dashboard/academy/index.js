import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/dashboard/NotificationButton'
import AcademyDashboardCard from 'components/academy/AcademyDashboardCard'
import StartclassButton from 'components/components/StartClassButton'

// third party components
import moment from 'moment'

// images and icons
import AcademyLogoIcon from 'assets/images/academy-logo.svg'

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

  const [getPatientAcademy, { data: mainData, loading: mainLoading, error: mainError }] = useLazyQuery(
    graphql.queries.getPatientAcademy
  )
  const [cardData, setCardData] = useState([])
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })
  const [events, setEvents] = useState([])

  // handlers
  useEffect(() => {
    getPatientAcademy({
      variables: { patient_id: Number(localStorage.getItem('patient_id')) },
    })
  }, [getPatientAcademy])

  useEffect(() => {
    if (cardData.length !== 0) {
      let sessionArr = []
      cardData.map(item =>
        item.training.map(elem => {
          sessionArr.push(elem)
        })
      )
      const _events = []
      sessionArr.map(item => {
        const _eventItem = {
          id: item.id,
          title: item.title,
          start: item.hour,
          streaming: item.stream_event,
        }
        _events.push(_eventItem)
      })
      setEvents(_events)
    }
  }, [cardData])

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
    if (!mainError && mainData && mainData.getPatientAcademy) {
      setCardData(mainData.getPatientAcademy)
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
    router.push(`/dashboard/academy/${data.id}`)
  }

  return viewport !== 'mobile' ? (
    <div className={globalStyles.dashContainer}>
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Mis cursos Academy</div>
        <div className={'flex justify-end'}>
          <div className="mr-16">
            <StartclassButton
              handleClick={() => handleClickStartButton()}
              label={'Comenzar clase'}
              visible={streamingEvent.toggle}
            />
          </div>
          <NotificationButton />
        </div>
      </div>
      {cardData.length !== 0 ? (
        <div className={'grid grid-cols-12 gap-4 lg:gap-8 mb-24'}>
          {cardData?.map((card, index) => (
            <div className={'flex justify-center col-span-6 md:col-span-4 mt-9'} key={index}>
              <AcademyDashboardCard data={card} index={index} handleWatchNow={handleWatchNow} viewport={viewport} />
            </div>
          ))}
        </div>
      ) : (
        <div className={'w-full flex flex-wrap justify-center items-center ' + styles.noAcademyArea}>
          <div className={'w-full flex flex-wrap justify-center ' + styles.noAcademyContent}>
            <Image src={AcademyLogoIcon} alt="" width={231} height={190} />
            <div className={'w-full mt-16 ' + styles.actualmentText}>
              Actualmente, no tienes ninguna formación contratada
            </div>
            <button className={'mt-10 ' + styles.goAcademyButton} onClick={() => router.push('/academy')}>
              Ver Academy
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className={'p-4 mb-32 ' + styles.m_container}>
      <div className={'mt-1 mb-7 ' + styles.m_dashTitle}>Mis cursos Academy</div>
      <div className={'grid grid-cols-12 gap-4'}>
        {cardData?.map((card, index) => (
          <div className={'col-span-6'} key={index}>
            <div className={'flex justify-center col-span-6 md:col-span-4'}>
              <AcademyDashboardCard data={card} index={index} handleWatchNow={handleWatchNow} viewport={viewport} />
            </div>
          </div>
        ))}
      </div>
    </div>
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
