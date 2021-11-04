import React, { useEffect, useState } from 'react'
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
import ProgressBar from 'components/components/dashboard/ProgressBar'
import bonosIcon from 'public/images/bonos.svg'
import NewMessageBox from 'components/components/dashboard/NewMessageBox'
import noPendingIcon from 'public/images/no-pending.svg'
import DashboardData from 'assets/data/DashboardData.json'

const Dashboard = () => {
  const [value, onChange] = useState(new Date())
  const [message, setMessage] = useState([])

  useEffect(() => {
    setMessage(DashboardData)
  }, [])

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

  return (
    <div className={'w-full ' + styles.container}>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8 sm:col-span-12 py-16 px-9">
          <div className="flex justify-between items-center">
            <div>
              <div className={styles.highBoldLabel}>Dashboard</div>
              {message.length ? <div className={'pt-2 ' + styles.today}>Domingo, 12 de Diciembre 2021</div> : <></>}
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
            <div className="py-4 pr-4">
              <div className={styles.welcomeLabel}>Bienvenido</div>
              <div className={styles.welcomeLabel}>Mariano Perez</div>
              <div className={'pt-2 ' + styles.welcomeDescription}>
                Muy pronto vas a finalizar tu Bono 10 sesiones de Entrenamiento Intensivo… <br /> Puedes consultar tus
                sesiones y renovar tu bono pinchando a continuación en el botón
              </div>
              <div className="pt-4">
                <DashboardButton handleClick={() => handleClickRedirect('view')} label={'Ver'} type={'view'} />
              </div>
            </div>
            <div style={{ minWidth: '220px' }}>
              <Image src={welcomeIcon} alt="" width={220} height={254} />
            </div>
          </div>
          <div className={'flex justify-between items-center mt-7 px-9 pt-7 pb-1 ' + styles.welcomeSection}>
            <div className="w-full">
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
            <div className="px-2 ">
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
            <div className="col-span-12 md:col-span-6 sm:col-span-12">
              <div
                className={'mt-7 px-9 py-7 w-full ' + styles.welcomeSection + ' calendarWrapper'}
                // onClick={() => handleClickRedirect('calendar')}
              >
                <Calendar className={styles.calendar} onChange={onChange} value={value}></Calendar>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 sm:col-span-12">
              <div
                className={'mt-7 px-9 py-7 w-full cursor-pointer ' + styles.welcomeSection}
                onClick={() => handleClickRedirect('bonos')}
              >
                <div className="flex justify-between items-center">
                  <div className={'text-center ' + styles.highBoldLabel}>Mis Bonos</div>
                  <div className={'text-center '}>
                    <Image src={bonosIcon} alt="" width={50} height={50} />
                  </div>
                </div>
                <div>
                  <div className="py-3 h-full pt-6">
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
                  <DashboardButton
                    handleClick={() => handleClickRedirect('editProfile')}
                    label={'Editar Perfil'}
                    type={'editProfile'}
                  />
                </div>
                <div className="pt-14 flex justify-between">
                  <div className={'relative flex justify-center w-24 h-24 rounded-xl ' + styles.bodyInfo}>
                    <div className="absolute -top-4">
                      <DashboardButton
                        handleClick={() => handleClickRedirect('iconWeight')}
                        label={''}
                        type={'iconWeight'}
                      />
                      <div className={'pt-2 ' + styles.smallLabel}>Peso</div>
                      <div className={'pt-3 ' + styles.mediumBoldLabel}>56,6 kg</div>
                    </div>
                  </div>
                  <div className={'relative flex justify-center w-24 h-24 rounded-xl ' + styles.bodyInfo}>
                    <div className="absolute -top-4">
                      <DashboardButton
                        handleClick={() => handleClickRedirect('iconWeight')}
                        label={''}
                        type={'iconHeight'}
                      />
                      <div className={'pt-2 ' + styles.smallLabel}>Altura</div>
                      <div className={'pt-3 ' + styles.mediumBoldLabel}>170 cm</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-20">
                <div className={styles.highBoldLabel}>Mensajes</div>
                {message.length ? (
                  <div>
                    <div className={'pt-2 ' + styles.mediumLabel}>Tienes 3 mensajes nuevos</div>
                    <div className="pt-6">
                      {message.map((item, index) => (
                        <div className="py-2 flex justify-center" key={index}>
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
                  <div className="pt-7 text-center">
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
