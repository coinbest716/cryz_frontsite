import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useDispatch } from 'react-redux'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NutritionItem from 'components/components/dashboard/nutrition/NutritionItem'

import moment from 'moment'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-calendar/dist/Calendar.css'
const MonthCalendar = dynamic(() => import('react-calendar'), { ssr: false })

import DashboardButton from 'components/components/dashboard/DashboardButton'
import NotificationButton from 'components/components/dashboard/NotificationButton'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

import plus from 'public/images/plus-gray.svg'
import minus from 'public/images/minus-gray.svg'

import styles from './nutrition.module.scss'

const Nutrition = props => {
  const { viewport } = props
  const router = useRouter()
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

  let mockup_nutritions = [
    {
      collapse: true,
      date: '2022-01-06T18:04:57.000Z',
      name: 'Pierde peso en 7 dias con carbohidratos y grasas',
      description:
        'Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velitNam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi  ',
      documentions: [
        {
          title: 'Documentación 1',
          url: '',
        },
        {
          title: 'Documentación 2',
          url: '',
        },
        {
          title: 'Documentación 3',
          url: '',
        },
        {
          title: 'Documentación 4',
          url: '',
        },
        {
          title: 'Documentación 5',
          url: '',
        },
      ],
    },
    {
      collapse: true,
      date: '2022-01-06T18:04:57.000Z',
      name: 'Pierde peso en 7 dias con carbohidratos y grasas',
      description:
        'Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velitNam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi  ',
      documentions: [
        {
          title: 'Documentación 1',
          url: '',
        },
        {
          title: 'Documentación 2',
          url: '',
        },
        {
          title: 'Documentación 3',
          url: '',
        },
      ],
    },
    {
      collapse: true,
      date: '2022-01-06T18:04:57.000Z',
      name: 'Pierde peso en 7 dias con carbohidratos y grasas',
      description:
        'Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velitNam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi  ',
      documentions: [
        {
          title: 'Documentación 1',
          url: '',
        },
        {
          title: 'Documentación 2',
          url: '',
        },
        {
          title: 'Documentación 3',
          url: '',
        },
      ],
    },
    {
      collapse: true,
      date: '2022-01-06T18:04:57.000Z',
      name: 'Pierde peso en 7 dias con carbohidratos y grasas',
      description:
        'Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velitNam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi  ',
      documentions: [
        {
          title: 'Documentación 1',
          url: '',
        },
        {
          title: 'Documentación 2',
          url: '',
        },
        {
          title: 'Documentación 3',
          url: '',
        },
      ],
    },
  ]
  const [nutritions, setNutritions] = useState([])
  const [calendarValue, setCalendarValue] = useState(new Date())
  const [markDate, setMarkDate] = useState([])
  const [events, setEvents] = useState([])
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })

  const [getSessionsByDashboard, { data: sessionData, loading: sessionLoading, error: sessionError }] = useLazyQuery(
    graphql.queries.getSessionsByDashboard
  )
  const [getNutritionsForDashboard, { data: nutritionData, loading: nutritionLoading, error: nutritionError }] =
    useLazyQuery(graphql.queries.getNutritionsForDashboard)

  useEffect(() => {
    getSessionsByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
    getNutritionsForDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setAvailableEvent()
    let classInterval = setInterval(() => {
      setAvailableEvent
    }, 10000)
    return () => {
      clearInterval(classInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  const setAvailableEvent = () => {
    const currentTime = moment(new Date())
    events.map(item => {
      const startTime = moment(item.start)
      const endTime = moment(item.end)
      const diffTime = startTime.diff(endTime, 'minutes')
      if (startTime.diff(currentTime, 'minutes') >= diffTime && startTime.diff(currentTime, 'minutes') <= 5) {
        setStreamingEvent({ id: item.id, start: item.start, toggle: item.streaming })
      } else {
        setStreamingEvent({ id: -1, start: '', toggle: false })
      }
    })
  }

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
    if (!nutritionError && nutritionData && nutritionData.getNutritionsForDashboard) {
      let _nutritions = nutritionData.getNutritionsForDashboard
      let result = _nutritions.map(function (el) {
        let obj = Object.assign({}, el)
        obj.collapse = true
        return obj
      })
      setNutritions(result)
    }
  }, [nutritionLoading, nutritionData, nutritionError])

  const handleClickStartClass = () => {
    router.push({
      pathname: '/dashboard/live-streaming',
      query: { id: streamingEvent.id },
    })
  }

  const handleChangeDate = value => {
    setCalendarValue(value)
    if (viewport !== 'mobile') {
      const styleDate = moment(value).format('YYYY-MM-DD')
      markDate.map(item => {
        if (item === moment(value).format('DD-MM-YYYY')) {
          let calendarApi = calendarComponentRef.current.getApi()
          calendarApi.gotoDate(styleDate) // call a method on the Calendar object
        }
      })
    }
  }

  const handleClickDocument = fileUrl => {
    let fileName = fileUrl.includes('amazonaws') ? fileUrl.split('_')[1] : fileUrl
    var a = document.createElement('a')
    a.href = fileUrl
    a.setAttribute('download', fileName)
    a.click()
  }

  const handleClickCollpase = index => {
    let _nutritions = [...nutritions]
    _nutritions[index].collapse = !_nutritions[index].collapse
    setNutritions(_nutritions)
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div>mobile nutrition</div>
      ) : (
        <div className={'p-10 ' + styles.container}>
          <div className={'grid grid-cols-12 gap-12'}>
            <div className={'col-span-12 md:col-span-8 sm:col-span-12 flex justify-between'}>
              <div className={styles.highBoldLabel}>Nutrición</div>
            </div>
            <DashboardButton
              handleClick={handleClickStartClass}
              label={'Comenzar clase'}
              type={'startClass'}
              visible={streamingEvent.toggle}
            />
            <div className={'col-span-12 md:col-span-4 sm:col-span-12 flex justify-between items-center'}>
              <NotificationButton />
            </div>
          </div>
          <div className={'grid grid-cols-12 gap-12 pt-8'}>
            <div className={'col-span-12 md:col-span-8 sm:col-span-12 w-full'}>
              <div>
                <div className={'flex justify-evenly items-center mb-4 ' + styles.tableHead}>
                  <div className={'w-1/5 text-center ' + styles.tableHeadTitle}>VISTA</div>
                  <div className={'w-1/5 text-center ' + styles.tableHeadTitle}>FECHA</div>
                  <div className={'w-3/5 ' + styles.tableHeadTitle}>NOMBRE</div>
                </div>
                <div style={{ height: 'calc(100vh - 300px)' }}>
                  <PerfectScrollbar>
                    {nutritions.map((item, index) => (
                      <NutritionItem
                        key={index}
                        item={item}
                        index={index}
                        handleClickCollpase={handleClickCollpase}
                        handleClickDocument={handleClickDocument}
                      />
                    ))}
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12'}>
              <div className={'calendarWrapper'}>
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
        </div>
      )}
    </>
  )
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Nutrition">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
