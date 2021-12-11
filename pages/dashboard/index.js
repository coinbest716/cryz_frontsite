import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// next components
import Image from 'next/image'
import router from 'next/router'
import dynamic from 'next/dynamic'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import ProgressBar from 'components/components/dashboard/ProgressBar'
import NewMessageBox from 'components/components/dashboard/NewMessageBox'

// third party components
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

// styles
import styles from './dashboard.module.scss'

// images and icons
import welcomeIcon from 'public/images/welcome-header.svg'
import bonosIcon from 'public/images/bonos.svg'
import noPendingIcon from 'public/images/no-pending.svg'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
// json data
import DashboardData from 'assets/data/DashboardData.json'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const Calendar = dynamic(() => import('react-calendar'), { ssr: false })

const Dashboard = () => {
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
  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [getAnthropmetryByDashboard, { data: healthData, loading: healthLoading, error: healthError }] = useLazyQuery(
    graphql.queries.getAnthropmetryByDashboard
  )
  const [getSessionsByDashboard, { data: sessionData, loading: sessionLoading, error: sessionError }] = useLazyQuery(
    graphql.queries.getSessionsByDashboard
  )
  const [getPatientIdByDashboard, { data: patientData, loading: patientLoading, error: patientError }] = useLazyQuery(
    graphql.queries.getPatientIdByDashboard
  )
  const [getPurchaseListByDashboard, { data: bonusData, loading: bonusLoading, error: bonusError }] = useLazyQuery(
    graphql.queries.getPurchaseListByDashboard
  )
  const [profilePercentage, setProfilePercentage] = useState(0)
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    lastname: '',
    avatar: '',
    province: '',
    weight: '',
    height: '',
  })
  const [markDate, setMarkDate] = useState([])
  const [calendarValue, setCalendarValue] = useState(new Date())
  const [purchaseData, setPurchaseData] = useState([])
  const today = useSelector(state => state.today)
  const [message, setMessage] = useState([])
  const chartOptions = {
    series: [
      {
        name: 'Actividad semanal',
        data: [4, 20, 10, 30, 36, 80, 30, 91],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        background: 'transparent',
        foreColor: '#939AAC',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#818E8E',
          shadeTo: 'light',
        },
      },
      xaxis: {
        categories: ['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'],
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: 'bottom',
      },
      grid: {
        show: false,
      },
    },
  }

  // handlers
  useEffect(() => {
    setMessage(DashboardData)
    getPatientIdByDashboard({
      variables: {
        email: localStorage.getItem('email'),
      },
    })
    getPatientByEmail({
      variables: {
        email: localStorage.getItem('email'),
      },
    })
  }, [])

  useEffect(() => {
    if (!personalError && personalData && personalData.getPatientByEmail) {
      const data = personalData.getPatientByEmail
      setPersonalInfo({
        ...personalInfo,
        name: data.name,
        lastname: data.lastname,
        avatar: data.avatar,
        province: data.bill_province,
      })
      getProfilePercentage(data)
    }
  }, [personalLoading, personalData, personalError])

  useEffect(() => {
    if (!bonusError && bonusData && bonusData.getPurchaseListByDashboard) {
      const data = bonusData.getPurchaseListByDashboard
      setPurchaseData(data)
    }
  }, [bonusLoading, bonusData, bonusError])

  useEffect(() => {
    if (!patientError && patientData && patientData.getPatientIdByDashboard) {
      const patient_id = patientData.getPatientIdByDashboard
      localStorage.setItem('patient_id', patient_id)
      getSessionsByDashboard({ variables: { patient_id: patient_id } })
      getAnthropmetryByDashboard({ variables: { patient_id: patient_id } })
      getPurchaseListByDashboard({ variables: { patient_id: patient_id } })
    }
  }, [patientLoading, patientData, patientError])

  useEffect(() => {
    if (!healthError && healthData && healthData.getAnthropmetryByDashboard) {
      const data = healthData.getAnthropmetryByDashboard
      let _personalInfo = { ...personalInfo }
      data.map(item => {
        if (item.name === 'peso' && item.data.length > 0) {
          _personalInfo = { ..._personalInfo, weight: item.data[0].value }
        } else if (item.name === 'altura' && item.data.length > 0) {
          _personalInfo = { ..._personalInfo, height: item.data[0].value }
        }
      })
      setPersonalInfo(_personalInfo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthLoading, healthData, healthError])

  useEffect(() => {
    if (!sessionError && sessionData && sessionData.getSessionsByDashboard) {
      const sessionArr = sessionData.getSessionsByDashboard
      const _markDate = []
      sessionArr.map(item => {
        _markDate.push(moment(item.start_time).format('DD-MM-YYYY'))
      })
      setMarkDate(_markDate)
    }
  }, [sessionLoading, sessionData, sessionError])

  const getProfilePercentage = _personalInfo => {
    let fillCount = -6
    Object.values(_personalInfo).map(item => {
      if (item !== '' && item !== undefined) {
        fillCount += 1
      }
    })
    const temp = (fillCount / 14) * 100
    const percentage = Math.ceil(temp / 5) * 5
    if (percentage <= 0) {
      setProfilePercentage(0)
    } else if (percentage >= 100) {
      setProfilePercentage(100)
    } else {
      setProfilePercentage(percentage)
    }
  }

  const handleClickRmember = () => {
    console.log('handleClickRmember')
  }

  const handleClickRedirect = type => {
    switch (type) {
      case 'startClass':
        router.push('/dashboard/live-streaming')
        break
      case 'view':
        router.push('/dashboard/shopping')
        break
      case 'hour':
        router.push('/dashboard/profile#health')
        break
      case 'editProfile':
        router.push('/dashboard/profile')
        break
      case 'iconWeight':
        router.push('/dashboard/profile#health')
        break
      case 'messageBox':
        router.push('/dashboard/message')
        break
      case 'calendar':
        router.push('/dashboard/calendar')
        break
      case 'bonos':
        router.push('/dashboard/shopping/order-detail')
        break
    }
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

  const updateCalendarLabel = label => {
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  return (
    <div className={'w-full ' + styles.container}>
      <div className={'grid grid-cols-12'}>
        <div className={'col-span-12 md:col-span-8 sm:col-span-12 py-16 px-9'}>
          <div className={'flex justify-between items-center'}>
            <div>
              <div className={styles.highBoldLabel}>Dashboard</div>
              {message.length ? <div className={'pt-2 ' + styles.today}>{today}</div> : <></>}
            </div>
            <div>
              {message.length ? (
                <DashboardButton
                  handleClick={() => handleClickRedirect('startClass')}
                  label={'Comenzar clase'}
                  type={'startClass'}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={'flex justify-between items-center mt-7 pl-9 pr-12 ' + styles.welcomeSection}>
            <div className={'py-4 pr-4'}>
              <div className={styles.welcomeLabel}>Bienvenido</div>
              <div className={styles.welcomeLabel}>
                {personalInfo.name}&nbsp;{personalInfo.lastname}
              </div>
              <div className={'pt-2 ' + styles.welcomeDescription}>
                Muy pronto vas a finalizar tu Bono 10 sesiones de Entrenamiento Intensivo… <br /> Puedes consultar tus
                sesiones y renovar tu bono pinchando a continuación en el botón
              </div>
              <div className={'pt-4'}>
                <DashboardButton handleClick={() => handleClickRedirect('view')} label={'Ver'} type={'view'} />
              </div>
            </div>
            <div style={{ minWidth: '220px' }}>
              <Image src={welcomeIcon} alt="" width={220} height={254} />
            </div>
          </div>
          <div className={'flex justify-between items-center mt-7 px-9 pt-7 pb-1 ' + styles.welcomeSection}>
            <div className={'w-full'}>
              <div className={styles.highBoldLabel}>Actividad mensual</div>
              <div>
                <Chart
                  chart={chartOptions.chart}
                  options={chartOptions?.options}
                  series={chartOptions?.series}
                  type="area"
                  height="200px"
                />
              </div>
            </div>
            <div className={'px-2 '}>
              <div className={'text-center pb-5 ' + styles.estimateHours}>Este mes</div>
              <DashboardButton handleClick={() => handleClickRedirect('hour')} label={'75,2'} type={'hour'} />
            </div>
          </div>
          {message.length ? (
            <div className={'mt-7 px-9 py-7 flex justify-between ' + styles.welcomeSection}>
              <div>
                <div className={styles.remember}>Recuerda!!</div>
                <div className={'pt-2 ' + styles.rememberDescription}>
                  Tienes un cuestionario pendiente de completar…
                </div>
              </div>
              <DashboardButton handleClick={handleClickRmember} label={'Hacerlo'} type={'viewRed'} />
            </div>
          ) : (
            <></>
          )}
          <div className={'grid grid-cols-12 gap-7 '}>
            <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
              <div
                className={'mt-7 px-9 py-7 w-full ' + styles.welcomeSection + ' calendarWrapper'}
                // onClick={() => handleClickRedirect('calendar')}
              >
                <Calendar
                  className={styles.calendar}
                  onChange={handleChangeDate}
                  value={calendarValue}
                  locale="es"
                  tileClassName={({ date, view }) => {
                    if (markDate.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                      return 'highlight'
                    }
                  }}
                  navigationLabel={({ label }) => updateCalendarLabel(label)}
                ></Calendar>
              </div>
            </div>
            <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
              <div
                className={'mt-7 px-9 py-7 w-full cursor-pointer ' + styles.welcomeSection}
                onClick={() => handleClickRedirect('bonos')}
              >
                <div className={'flex justify-between items-center'}>
                  <div className={'text-center ' + styles.highBoldLabel}>Mis Bonos</div>
                  <div className={'text-center '}>
                    <Image src={bonosIcon} alt="" width={50} height={50} />
                  </div>
                </div>
                <div>
                  {purchaseData.map(item => {
                    ;<div className={'py-3 h-full pt-6'} key={index}>
                      <ProgressBar data={item} />
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'col-span-12 md:col-span-4 sm:col-span-12'}>
          <div className={'bg-white h-full px-9 py-10'}>
            <div>
              <div className={styles.highBoldLabel}>Perfil</div>
              <div className={'pt-2 ' + styles.mediumLabel}>{profilePercentage}% Perfil Completado</div>
              <div className={'p-8 text-center'}>
                <div className={'pt-7 flex justify-center'}>
                  <div
                    className={'flex justify-center items-center overflow-hidden p-1'}
                    style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: '#c9cacd' }}
                  >
                    <Image
                      src={personalInfo.avatar || '/images/default-avatar.svg'}
                      alt=""
                      width={140}
                      height={140}
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                </div>
                <div className={'pt-4 ' + styles.highBoldLabel}>
                  {personalInfo.name}&nbsp;{personalInfo.lastname}
                </div>
                <div className={'pt-2 ' + styles.mediumLabel}>{personalInfo.province}</div>
                <div className={'pt-6 flex justify-center'}>
                  <DashboardButton
                    handleClick={() => handleClickRedirect('editProfile')}
                    label={'Editar Perfil'}
                    type={'editProfile'}
                  />
                </div>
                <div className={'pt-14 flex justify-between'}>
                  <div className={'relative flex justify-center w-24 h-24 rounded-xl ' + styles.bodyInfo}>
                    <div className={'absolute -top-4'}>
                      <DashboardButton
                        handleClick={() => handleClickRedirect('iconWeight')}
                        label={''}
                        type={'iconWeight'}
                      />
                      <div className={'pt-2 ' + styles.smallLabel}>Peso</div>
                      <div className={'pt-3 ' + styles.mediumBoldLabel}>
                        {personalInfo.weight && personalInfo.weight + ' kg'}
                      </div>
                    </div>
                  </div>
                  <div className={'relative flex justify-center w-24 h-24 rounded-xl ' + styles.bodyInfo}>
                    <div className={'absolute -top-4'}>
                      <DashboardButton
                        handleClick={() => handleClickRedirect('iconWeight')}
                        label={''}
                        type={'iconHeight'}
                      />
                      <div className={'pt-2 ' + styles.smallLabel}>Altura</div>
                      <div className={'pt-3 ' + styles.mediumBoldLabel}>
                        {personalInfo.height && personalInfo.height + ' cm'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={'pt-20'}>
                <div className={styles.highBoldLabel}>Mensajes</div>
                {message.length ? (
                  <div>
                    <div className={'pt-2 ' + styles.mediumLabel}>Tienes 3 mensajes nuevos</div>
                    <div className={'pt-6'}>
                      {message.map((item, index) => (
                        <div className={'py-2 flex justify-center'} key={index}>
                          <NewMessageBox
                            handleClickMessage={() => handleClickRedirect('messageBox')}
                            name={item.name}
                            content={item.content}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={'pt-7 text-center'}>
                    <Image src={noPendingIcon} alt="" width={268} height={294} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard

Dashboard.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
