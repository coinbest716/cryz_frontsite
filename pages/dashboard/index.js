import React, { useState } from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './dashboard.module.scss'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import welcomeIcon from 'public/images/welcome-header.svg'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { route } from 'next/dist/server/router'
import router from 'next/router'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Dashboard = () => {
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

  const handleClickStartClass = () => {
    console.log('handleClickStartClass redirect live video section wc-64')
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
  const handleClickMember = () => {
    console.log('handleClickMember')
  }

  // <DashboardButton handleClick={handleClickHours} label={'75,2'} type={'hour'} />
  // <DashboardButton handleClick={handleChangeProfile} label={'Editar Perfil'} type={'editProfile'} />
  // <DashboardButton handleClick={handleClickWeight} label={''} type={'iconWeight'} />
  // <DashboardButton handleClick={handleClickWeight} label={''} type={'iconHeight'} />

  return (
    <div className={'px-24 py-10 w-full ' + styles.container}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 sm:col-span-12">
          <div className="flex justify-between items-center">
            <div>
              <div className={styles.dashboardTitle}>Dashboard</div>
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
              <div className={styles.dashboardTitle}>Actividad semanal</div>
              <div>
                <Chart options={chartOptions.options} series={chartOptions.series} type="area" height="200px" />
              </div>
            </div>
            <div className="px-2 ">
              <div className={'text-center pb-5 ' + styles.estimateHours}>Este mes</div>
              <DashboardButton handleClick={handleClickHours} label={'75,2'} type={'hour'} />
            </div>
          </div>
          <div className={'mt-7 px-9 py-7 ' + styles.welcomeSection}>
            Recuerda!!
            <DashboardButton handleClick={handleClickMember} label={'Hacerlo'} type={'viewRed'} />
          </div>
          <div className={'mt-7 px-9 py-7 ' + styles.welcomeSection}>calendar section</div>
        </div>
        <div className="col-span-12 md:col-span-4 sm:col-span-12">
          <div className={styles.welcomeSection}>Profile Section</div>
          <div className={styles.welcomeSection}>Message Section</div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard

Dashboard.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
