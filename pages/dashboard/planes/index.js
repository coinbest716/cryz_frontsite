import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import dynamic from 'next/dynamic'

// third party components
import ReactPlayer from 'react-player'
import 'react-calendar/dist/Calendar.css'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
// import Profile from 'components/components/dashboard/Profile'
import Material from 'components/components/dashboard/Material'
import Feature from 'components/components/academy/Feature'
import DownloadPDF from 'components/components/academy/DownloadPDF'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './planes.module.scss'

// images and icons
import downIcon from 'public/images/down.svg'

// json data
import PlanData from 'assets/data/PlanData.json'
import MonthListData from 'assets/data/MonthListData.json'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Calendar = dynamic(() => import('react-calendar'), { ssr: false })

const Planes = () => {
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
  const [plansOnlineData, setPlansOnlineData] = useState({})
  const url = 'https://www.w3schools.com/html/mov_bbb.mp4'
  const [feature, setFeature] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState('')
  const [materials, setMaterials] = useState([])
  const [grayMaterials, setGrayMaterials] = useState([])
  const [greenMaterials, setGreenMaterials] = useState([])
  const noteDescription =
    'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.'

  const [getOnlinePlanByDashboard, { data: onlinePlanData, loading: onlinePlanLoading, error: onlinePlanError }] =
    useLazyQuery(graphql.queries.getOnlinePlanByDashboard)

  // handlers
  useEffect(() => {
    setMaterials(PlanData.materialData)
    setGrayMaterials(PlanData.grayMaterialData)
    setGreenMaterials(PlanData.greenMaterialData)
    setCurrentMonth(MonthListData[new Date().getMonth()].month)
    getOnlinePlanByDashboard({
      variables: {
        patient_id: 1,
        select_date: new Date().toISOString(),
      },
    })
  }, [getOnlinePlanByDashboard])

  useEffect(() => {
    if (!onlinePlanError && onlinePlanData && onlinePlanData.getOnlinePlanByDashboard) {
      console.log(onlinePlanData.getOnlinePlanByDashboard)
      setPlansOnlineData(onlinePlanData.getOnlinePlanByDashboard)
    }
  }, [onlinePlanLoading, onlinePlanData, onlinePlanError])

  useEffect(() => {
    setFeature([
      { id: 0, path: '/images/category.svg', bgColor: '#D2DADA', topLabel: 'Nivel', lowLabel: '1' },
      { id: 1, path: '/images/type.svg', bgColor: '#DFDBD5', topLabel: 'Tandas', lowLabel: '2' },
      { id: 2, path: '/images/time.svg', bgColor: '#E3BBAA', topLabel: 'Descanso', lowLabel: '20 seg' },
      { id: 3, path: '/images/star.svg', bgColor: '#F5DEC2', topLabel: 'Peso', lowLabel: '05 kg' },
    ])
  }, [])

  const handleClickMonth = () => {
    setShowCalendar(!showCalendar)
  }

  const handleChangeDate = value => {
    setDate(value)
    setShowCalendar(false)
  }

  const updateCalendarLabel = label => {
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  return (
    <div className={globalStyles.dashContainer}>
      <div className={'flex justify-between'}>
        <div>
          <div className={styles.highBoldLabel}>Planes online</div>
        </div>
        <div className={'flex justify-end items-center'}>
          <NotificationButton />
          {/* <Profile /> */}
        </div>
      </div>
      <div className={'grid grid-cols-12 gap-8'}>
        <div className={'col-span-12 md:col-span-9 sm:col-span-12'}>
          <div className={'flex items-center'}>
            <div className={styles.chapter}>Chapter 2 &nbsp; </div>
            <div className={styles.dot}></div>
            <div className={styles.chapterTitle}>{plansOnlineData.name}</div>
          </div>
          <div className={'pt-6'}>
            <ReactPlayer url={url} width="100%" height="100%" className={styles.reactPlayer} controls={true} />
          </div>

          <div className={'flex flex-wrap justify-between pt-12 gap-4'}>
            <div className={styles.blockSection + ' flex flex-wrap justify-between items-center px-5 py-5'}>
              <div className={styles.blackName + ' py-2 pr-4'}>Información del bloque</div>
              <div className={'flex justify-end flex-1'}>
                {feature.map((item, index) => (
                  <div key={index} className={'pl-4 lg:px-5'}>
                    <Feature data={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className={'hidden lg:flex'}>
              <DownloadPDF data={plansOnlineData?.routine?.document[0]} type={'plan'} />
            </div>
          </div>

          <div className={styles.noteSection + ' mt-5 px-4 py-8 block lg:hidden'}>
            <div className={styles.notes}>Notas :</div>
            <div className={styles.noteDescription}>{noteDescription}</div>
          </div>

          <div className={'w-full flex pt-7'}>
            <div className={'mr-8 px-8 py-5 ' + styles.materialSection}>
              <div className={styles.materialTitle + ' pb-2'}>Material necesario</div>
              {materials.map((item, index) => (
                <div className={'py-2'} key={index}>
                  <Material item={item} />
                </div>
              ))}
            </div>
            <div className={'hidden lg:block px-4 py-8 ' + styles.noteSection}>
              <div className={styles.notes}>Notas :</div>
              <div className={styles.noteDescription}>{noteDescription}</div>
            </div>
            <div className={'flex justify-end lg:hidden'}>
              <DownloadPDF data={plansOnlineData?.routine?.document[0]} type={'plan'} />
            </div>
          </div>
        </div>
        <div className={'col-span-12 md:col-span-3 sm:col-span-12'}>
          <div className={'rounded-xl bg-white py-4 px-6 pb-10 mt-10 relative'}>
            <div className={'flex justify-between items-center'}>
              <div className={styles.monthName}>{currentMonth}</div>
              <div
                className={'flex items-center pl-4 pr-2 py-1 cursor-pointer ' + styles.monthPickerSection}
                onClick={handleClickMonth}
              >
                <div className={styles.monthSelect + ' pr-3'}>Mes</div>
                <Image src={downIcon} alt="" width={7} height={7} />
              </div>
            </div>
            <div className={'calendarWrapper'}>
              <Calendar
                className={showCalendar ? '' : 'hidden'}
                value={date}
                onChange={handleChangeDate}
                showDoubleView={false}
                showNavigation={true}
                locale="es"
                navigationLabel={({ label }) => updateCalendarLabel(label)}
              />
            </div>
            <div className={styles.videoMaterialTitle + ' pt-8'}>CALENTAMIENTO</div>
            <div className={'pt-7'}>
              {grayMaterials.map((item, index) => (
                <div className={'py-2'} key={index}>
                  <Material item={item} type={'gray'} />
                </div>
              ))}
            </div>
            <div className={styles.videoMaterialTitle + ' pt-8'}>ABDOMINALES</div>
            <div className={'pt-7'}>
              {greenMaterials.map((item, index) => (
                <div className={'py-2'} key={index}>
                  <Material item={item} type={'green'} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Planes

Planes.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
