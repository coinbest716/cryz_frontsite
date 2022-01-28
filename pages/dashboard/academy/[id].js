import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/dashboard/NotificationButton'
import StartclassButton from 'components/components/StartClassButton'
import AcademyTable from 'components/dashboard/academy/AcademyTable'

// third party components
import moment from 'moment'
import 'react-calendar/dist/Calendar.css'
const MonthCalendar = dynamic(() => import('react-calendar'), { ssr: false })

// images and icons
import MenubarIcon from 'assets/images/menubar.svg'
import UserCircleIcon from 'assets/images/user-circle.svg'
import TimerIcon from 'assets/images/timer.svg'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'
import DownIcon from 'public/images/down.svg'
import AcademyPreparingLogoIcon from 'assets/images/academy-preparing-logo.svg'

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

  const [showCalendar, setShowCalendar] = useState(true)
  const [academyData, setAcademyData] = useState('{}')
  const [trainerExist, setTrainerExist] = useState(false)
  const [markDate, setMarkDate] = useState([])
  const [events, setEvents] = useState([])
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })

  useEffect(() => {
    if (router.query.id !== undefined) {
      getAcademyWithPlazasById({ variables: { id: Number(router.query.id) } })
    }
  }, [getAcademyWithPlazasById, router.query])

  useEffect(() => {
    if (academyData !== '{}') {
      if (academyData.training.length !== 0) {
        setTrainerExist(true)
        const sessionArr = academyData.training
        const _events = []
        const _markDate = []
        sessionArr.map(item => {
          const _eventItem = {
            id: item.id,
            title: item.title,
            start: item.hour,
            streaming: item.stream_event,
          }
          _markDate.push(moment(item.day).format('DD-MM-YYYY'))
          _events.push(_eventItem)
        })
        setEvents(_events)
        setMarkDate(_markDate)
      } else {
        setTrainerExist(false)
      }
    }
  }, [academyData])

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

  // mobile part
  const handleClickBack = () => {
    router.push('/dashboard/academy')
  }

  const handleClickMonth = () => {
    setShowCalendar(!showCalendar)
  }

  return viewport !== 'mobile' ? (
    trainerExist === true ? (
      <div className={globalStyles.dashContainer}>
        <div className={'w-full flex justify-between items-center'}>
          <div className={globalStyles.dashTitle}>{academyData.name}</div>
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
        <div className={'flex mt-3'}>
          <div className={'w-7 h-7 flex justify-center items-center mr-2 '} style={{ backgroundColor: '#D2DADA' }}>
            <Image src={MenubarIcon} alt={''} width={16} height={11} />
          </div>
          <div className={'mr-10'}>
            <p className={styles.thinText}>Categoria</p>
            <p className={styles.boldText}>
              {academyData.category !== undefined &&
                academyData.category.charAt(0).toUpperCase() + academyData.category.slice(1)}
            </p>
          </div>
          <div className={'w-7 h-7 flex justify-center items-center mr-2 '} style={{ backgroundColor: '#DFDBD5' }}>
            <Image src={UserCircleIcon} alt={''} width={15} height={15} />
          </div>
          <div className={'mr-10'}>
            <p className={styles.thinText}>Tipo</p>
            <p className={styles.boldText}>
              {academyData.type !== undefined && academyData.type.charAt(0).toUpperCase() + academyData.type.slice(1)}
            </p>
          </div>
          <div className={'w-7 h-7 flex justify-center items-center mr-2 '} style={{ backgroundColor: '#E3BBAA' }}>
            <Image src={TimerIcon} alt={''} width={14} height={13} />
          </div>
          <div className={'mr-10'}>
            <p className={styles.thinText}>Horas</p>
            <p className={styles.boldText}>{academyData.duration}</p>
          </div>
        </div>
        <div className={'flex mt-8'}>
          <div className={styles.descriptionArea}>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: academyData.description }}></p>
          </div>
        </div>
        <div className={'flex mt-8'}>
          <div className={'flex flex-1 w-full mr-8'}>
            {academyData.list !== undefined && (
              <AcademyTable academyID={academyData.id} data={academyData.training} viewport={viewport} />
            )}
          </div>
          <div className={styles.calendarArea + ' calendarWrapper'}>
            <MonthCalendar
              className={styles.calendar}
              value={new Date()}
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
      <div className={'w-full flex flex-wrap justify-center items-center ' + styles.noAcademyArea}>
        <div className={'w-full flex flex-wrap justify-center items-center ' + styles.noAcademyContent}>
          <div className={'w-full flex justify-center ' + styles.preparingTitle}>
            ¡Gracias por inscribirte en nuestro curso de Academy!
          </div>
          <div className="mt-16 mb-20">
            <Image src={AcademyPreparingLogoIcon} alt="" width={231} height={190} />
          </div>
          <div className={'w-full flex flex-wrap justify-center ' + styles.preparingText}>
            <p className="w-full">Unos días antes de comenzar, nos pondremos en contacto contigo.</p>
            <br />
            <br />
            <p className="w-full">
              Si tienes alguna duda, nos puedes mandar un email a <b>info@crysdyazandco.com</b>
            </p>
          </div>
        </div>
      </div>
    )
  ) : trainerExist === true ? (
    <div>
      {/* mobile header part */}
      <div className={styles.mobileHeader}>
        <div className="w-full flex justify-between">
          <div className="flex justify-start items-center cursor-pointer" onClick={() => handleClickBack()}>
            <Image src={ArrowLeftWhite} width={18} height={15} alt="" />
            <div className={styles.mobileHeaderBackString + ' ml-2'}>Academy</div>
          </div>
          <StartclassButton
            handleClick={() => handleClickStartButton()}
            label={'clase'}
            visible={streamingEvent.toggle}
          />
        </div>
        <div className={'mt-4 ' + styles.mobileHeaderTitle}>{academyData.name}</div>
      </div>
      {/* mobile content part */}
      <div className={'mt-32 mb-32 w-full ' + globalStyles.container}>
        {/* calendar part */}
        <div className={'rounded-xl bg-white py-4 px-6 pb-10 mt-10 relative'}>
          <div className={'flex justify-between items-center'}>
            <div className={styles.monthName}></div>
            <div
              className={'flex items-center pl-4 pr-2 py-1 cursor-pointer ' + styles.monthPickerSection}
              onClick={handleClickMonth}
            >
              <div className={styles.monthSelect + ' pr-3'}>Mes</div>
              <Image src={DownIcon} alt="" width={7} height={7} />
            </div>
          </div>
          <div className={styles.calendarArea + ' calendarWrapper'}>
            <MonthCalendar
              className={showCalendar ? '' : 'hidden'}
              value={new Date()}
              locale="es-MX"
              tileClassName={({ date, view }) => {
                if (markDate.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                  return 'highlight'
                }
              }}
            />
          </div>
        </div>
        {/* category part */}
        <div className={'flex justify-between pt-4'}>
          <div
            className={'w-7 h-7 flex justify-center items-center mr-2 rounded-full'}
            style={{ backgroundColor: '#D2DADA' }}
          >
            <Image src={MenubarIcon} alt={''} width={16} height={11} />
          </div>
          <div>
            <p className={styles.thinText}>Categoria</p>
            <p className={styles.boldText}>
              {academyData.category !== undefined &&
                academyData.category.charAt(0).toUpperCase() + academyData.category.slice(1)}
            </p>
          </div>
          <div
            className={'w-7 h-7 flex justify-center items-center mr-2 rounded-full'}
            style={{ backgroundColor: '#DFDBD5' }}
          >
            <Image src={UserCircleIcon} alt={''} width={15} height={15} />
          </div>
          <div>
            <p className={styles.thinText}>Tipo</p>
            <p className={styles.boldText}>
              {academyData.type !== undefined && academyData.type.charAt(0).toUpperCase() + academyData.type.slice(1)}
            </p>
          </div>
          <div
            className={'w-7 h-7 flex justify-center items-center mr-2 rounded-full'}
            style={{ backgroundColor: '#E3BBAA' }}
          >
            <Image src={TimerIcon} alt={''} width={14} height={13} />
          </div>
          <div>
            <p className={styles.thinText}>Horas</p>
            <p className={styles.boldText}>{academyData.duration}</p>
          </div>
        </div>
        {/* description part */}
        <div className={'flex pt-4'}>
          <p className={styles.mobileDescription} dangerouslySetInnerHTML={{ __html: academyData.description }}></p>
        </div>
        <div className="mt-2">
          {academyData.list !== undefined && (
            <AcademyTable academyID={academyData.id} data={academyData.training} viewport={viewport} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={'w-full flex flex-wrap justify-center items-center mt-20'}>
      <div className={'w-full flex flex-wrap justify-center items-center ' + styles.noAcademyContent}>
        <div className={'w-full flex justify-center ' + styles.m_preparingTitle}>
          ¡Gracias por inscribirte en nuestro curso de Academy!
        </div>
        <div className="my-10">
          <Image src={AcademyPreparingLogoIcon} alt="" width={231} height={190} />
        </div>
        <div className={'w-full flex flex-wrap justify-center ' + styles.m_preparingText}>
          <p className="w-full">Unos días antes de comenzar, nos pondremos en contacto contigo.</p>
          <br />
          <br />
          <p className="w-full">
            Si tienes alguna duda, nos puedes mandar un email a <b>info@crysdyazandco.com</b>
          </p>
        </div>
      </div>
    </div>
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
