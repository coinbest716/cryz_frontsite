import React, { useState } from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './dashboard.module.scss'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import welcomeIcon from 'public/images/welcome-header.svg'
import Image from 'next/image'
import router from 'next/router'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const Calendar = dynamic(() => import('react-calendar'), { ssr: false })
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import ProgressBar from 'components/components/dashboard/ProgressBar'
import bonosIcon from 'public/images/bonos.svg'
import NewMessageBox from 'components/components/dashboard/NewMessageBox'

const Dashboard = () => {
  const [value, onChange] = useState(new Date())

  const chartOptions = {
    series: [
      {
        name: 'Actividad semanal',
        data: [4, 20, 10, 30, 36, 80, 30, 91],
      },
    ],
    options: {
      chart: {
        background: 'transparent',
        foreColor: '#939AAC',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
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

  const message = [
    {
      name: 'Oluchi Mazi',
      content: 'I’m getting a late today',
    },
    {
      name: 'Shinohara Ryoma',
      content: 'What are the homework…',
    },
    {
      name: 'Paromita Haque',
      content: 'I’m getting a late today',
    },
    {
      name: 'Oluchi Mazi',
      content: 'I’m getting a late today',
    },
    {
      name: 'Shinohara Ryoma',
      content: 'What are the homework…',
    },
    {
      name: 'Paromita Haque',
      content: 'I’m getting a late today',
    },
  ]

  const mark = ['21-10-2021', '22-10-2021', '23-10-2021']

  const handleClickStartClass = () => {
    console.log('handleClickStartClass redirect live video section wc-64')
    router.push('/dashboard/live-streaming')
  }
  const handleClickView = () => {
    console.log('handleClickView redirect purchase section wc-67')
  }
  const handleClickHours = () => {
    console.log('handleClickHours')
    router.push('/dashboard/profile')
  }
  const handleChangeProfile = () => {
    console.log('handleChangeProfile')
  }
  const handleClickWeight = () => {
    console.log('handleClickWeight')
  }
  const handleClickRmember = () => {
    console.log('handleClickRmember')
  }
  const handleClickMessage = () => {
    console.log('handleClickMessage redirect  message section in side menu')
    router.push('/dashboard/message')
  }

  return (
    <div className={'w-full ' + styles.container}>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8 sm:col-span-12 py-16 px-9">
          <div className="flex justify-between items-center">
            <div>
              <div className={styles.highBoldLabel}>Dashboard</div>
              <div className={'pt-2 ' + styles.today}>Domingo, 12 de Diciembre 2021</div>
            </div>
            <div>
              <DashboardButton handleClick={handleClickStartClass} label={'Comenzar clase'} type={'startClass'} />
            </div>
          </div>
          <div className={'flex items-center mt-7 px-9 ' + styles.welcomeSection}>
            <div className="py-4 pr-4">
              <div className={styles.welcomeLabel}>Bienvenido</div>
              <div className={styles.welcomeLabel}>Mariano Perez</div>
              <div className={'pt-2 ' + styles.welcomeDescription}>
                Muy pronto vas a finalizar tu Bono 10 sesiones de Entrenamiento Intensivo… Puedes consultar tus sesiones
                y renovar tu bono pinchando a continuación en el botón
              </div>
              <div className="pt-4">
                <DashboardButton handleClick={handleClickView} label={'Ver'} type={'view'} />
              </div>
            </div>
            <div style={{ minWidth: '220px' }}>
              <Image src={welcomeIcon} alt="" width={220} height={254} />
            </div>
          </div>
          <div className={'flex justify-between items-center mt-7 px-9 pt-7 pb-1 ' + styles.welcomeSection}>
            <div className="w-full">
              <div className={styles.highBoldLabel}>Actividad semanal</div>
              <div>
                <Chart options={chartOptions.options} series={chartOptions.series} type="area" height="200px" />
              </div>
            </div>
            <div className="px-2 ">
              <div className={'text-center pb-5 ' + styles.estimateHours}>Este mes</div>
              <DashboardButton handleClick={handleClickHours} label={'75,2'} type={'hour'} />
            </div>
          </div>
          <div className={'mt-7 px-9 py-7 flex justify-between ' + styles.welcomeSection}>
            <div>
              <div className={styles.remember}>Recuerda!!</div>
              <div className={'pt-2 ' + styles.rememberDescription}>Tienes un cuestionario pendiente de completar…</div>
            </div>
            <DashboardButton handleClick={handleClickRmember} label={'Hacerlo'} type={'viewRed'} />
          </div>
          <div className={'grid grid-cols-12 gap-7 '}>
            <div className="col-span-12 md:col-span-6 sm:col-span-12">
              <div className={'mt-7 px-9 py-7 w-full ' + styles.welcomeSection}>
                <Calendar
                  className={styles.calendar}
                  onChange={onChange}
                  value={value}
                  tileClassName={({ date, view }) => {
                    if (mark.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                      return 'highlight'
                    }
                  }}
                  tileDisabled={({ date }) => date.getDay() === 0}
                  /*maxDate={new Date(2020, 1, 0)}</div>*/
                  minDate={new Date()}
                ></Calendar>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 sm:col-span-12">
              <div className={'mt-7 px-9 py-7 w-full ' + styles.welcomeSection}>
                <div className={'text-center ' + styles.highBoldLabel}>Mis Bonos</div>
                <div className={'text-center pt-5'}>
                  <Image src={bonosIcon} alt="" width={50} height={50} />
                </div>
                <div>
                  <div className="py-3">
                    <ProgressBar percentage={70} label={'Mujer'} type={'women'} />
                  </div>
                  <div className="py-3">
                    <ProgressBar percentage={50} label={'Nutrición'} type={'nutrition'} />
                  </div>
                  <div className="py-3">
                    <ProgressBar percentage={30} label={'Entrenamiento'} type={'training'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 sm:col-span-12">
          <div className="bg-white h-full px-9 py-10">
            <div>
              <div className={styles.highBoldLabel}>Perfil</div>
              <div className={'pt-2 ' + styles.mediumLabel}>80% Perfil Completado</div>
              <div className="p-8 text-center">
                <div className="pt-7 flex justify-center">
                  <img
                    src="/images/default-avatar.svg"
                    style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: '#c9cacd' }}
                  />
                </div>
                <div className={'pt-4 ' + styles.highBoldLabel}>Mariano Pérez</div>
                <div className={'pt-2 ' + styles.mediumLabel}>Madrid</div>
                <div className="pt-6 flex justify-center">
                  <DashboardButton handleClick={handleChangeProfile} label={'Editar Perfil'} type={'editProfile'} />
                </div>
                <div className="pt-14 flex justify-between">
                  <div className={'relative flex justify-center w-24 h-24 rounded-xl ' + styles.bodyInfo}>
                    <div className="absolute -top-4">
                      <DashboardButton handleClick={handleClickWeight} label={''} type={'iconWeight'} />
                      <div className={'pt-2 ' + styles.smallLabel}>Peso</div>
                      <div className={'pt-3 ' + styles.mediumBoldLabel}>56,6 kg</div>
                    </div>
                  </div>
                  <div className={'relative flex justify-center w-24 h-24 rounded-xl ' + styles.bodyInfo}>
                    <div className="absolute -top-4">
                      <DashboardButton handleClick={handleClickWeight} label={''} type={'iconHeight'} />
                      <div className={'pt-2 ' + styles.smallLabel}>Altura</div>
                      <div className={'pt-3 ' + styles.mediumBoldLabel}>170 cm</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-20">
                <div className={styles.highBoldLabel}>Mensajes</div>
                <div className={'pt-2 ' + styles.mediumLabel}>Tienes 3 mensajes nuevos</div>
                <div className="pt-6">
                  {message.map((item, index) => (
                    <div className="py-2 flex justify-center" key={index}>
                      <NewMessageBox handleClickMessage={handleClickMessage} name={item.name} content={item.content} />
                    </div>
                  ))}
                </div>
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
