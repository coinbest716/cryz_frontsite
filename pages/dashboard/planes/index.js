import React, { useState, useEffect } from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './planes.module.scss'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import ReactPlayer from 'react-player'
import Material from 'components/components/dashboard/Material'
import Feature from 'components/components/academy/Feature'
import DownloadPDF from 'components/components/academy/DownloadPDF'
import Image from 'next/image'
import downIcon from 'public/images/down.svg'
import dynamic from 'next/dynamic'
const Calendar = dynamic(() => import('react-calendar'), { ssr: false })
import moment from 'moment'
import 'react-calendar/dist/Calendar.css'
import PlanData from 'assets/data/PlanData.json'

const Planes = () => {
  const url = 'https://www.w3schools.com/html/mov_bbb.mp4'
  const [feature, setFeature] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState('')
  const [materials, setMaterials] = useState([])
  const [grayMaterials, setGrayMaterials] = useState([])
  const [greenMaterials, setGreenMaterials] = useState([])

  useEffect(() => {
    setMaterials(PlanData.materialData)
    setGrayMaterials(PlanData.grayMaterialData)
    setGreenMaterials(PlanData.greenMaterialData)
  }, [])

  const noteDescription =
    'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.'
  useEffect(() => {
    setFeature([
      { id: 0, path: '/images/category.svg', bgColor: '#D2DADA', topLabel: 'Nivel', lowLabel: '1' },
      { id: 1, path: '/images/type.svg', bgColor: '#DFDBD5', topLabel: 'Tandas', lowLabel: '2' },
      { id: 2, path: '/images/time.svg', bgColor: '#E3BBAA', topLabel: 'Descanso', lowLabel: '20 seg' },
      { id: 3, path: '/images/star.svg', bgColor: '#F5DEC2', topLabel: 'Peso', lowLabel: '05 kg' },
    ])
  }, [])
  const handleClickDownlodPDF = () => {
    console.log('handleClickDownlodPDF')
  }
  const handleClickMonth = () => {
    setShowCalendar(!showCalendar)
  }
  const handleChangeDate = value => {
    setDate(value)
    setShowCalendar(false)
  }
  const getOnlyMonth = label => {
    const str = label.split(' ')
    setCurrentMonth(str[0].charAt(0).toUpperCase() + str[0].slice(1))
    return str[0]
  }

  return (
    <div className={'pt-10 pb-24 px-24 ' + styles.container}>
      <div className="flex justify-between">
        <div>
          <div className={styles.highBoldLabel}>Planes online</div>
        </div>
        <div className="flex justify-end items-center">
          <div className="pr-4">
            <NotificationButton />
          </div>
          <ProfileInfo />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-9 sm:col-span-12">
          <div className="flex items-center">
            <div className={styles.chapter}>Chapter 2 &nbsp; </div>
            <div className={styles.dot}></div>
            <div className={styles.chapterTitle}>&nbsp;How to create wireframe</div>
          </div>
          <div className="pt-6">
            <ReactPlayer url={url} width="100%" height="100%" className={styles.reactPlayer} controls={true} />
          </div>

          <div className="flex flex-wrap justify-between pt-12 gap-4">
            <div className={styles.blockSection + ' flex flex-wrap items-center px-5 py-5'}>
              <div className={styles.blackName}>Información del bloque</div>
              {feature.map((item, index) => (
                <div key={index} className="px-2">
                  <Feature data={item} />
                </div>
              ))}
            </div>
            <div>
              <DownloadPDF onClick={handleClickDownlodPDF} type={'plan'} />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 pt-7">
            <div className="col-span-12 md:col-span-4 sm:col-span-12">
              <div className={'px-8 py-5 ' + styles.materialSection}>
                <div className={styles.materialTitle + ' pb-2'}>Material necesario</div>
                {materials.map((item, index) => (
                  <div className="py-2" key={index}>
                    <Material item={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 sm:col-span-12">
              <div className={styles.noteSection + ' px-8 py-4'}>
                <div className={styles.notes}>Notas :</div>
                <div className={styles.noteDescription}>{noteDescription}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 sm:col-span-12">
          <div className="rounded-xl bg-white py-4 px-6 pb-10 mt-10 relative">
            <div className="flex justify-between items-center">
              <div className={styles.monthName}>{currentMonth}</div>
              <div
                className={'flex items-center pl-4 pr-2 py-1 cursor-pointer ' + styles.monthPickerSection}
                onClick={handleClickMonth}
              >
                <div className={styles.monthSelect + ' pr-3'}>Mes</div>
                <Image src={downIcon} alt="" width={7} height={7} />
              </div>
            </div>
            <div className="calendarWrapper">
              <Calendar
                className={showCalendar ? '' : 'hidden'}
                value={date}
                onChange={handleChangeDate}
                showDoubleView={false}
                showNavigation={true}
                // view={'year'}
                locale="es-MX"
                navigationLabel={({ date, label, locale, view }) =>
                  // `Current view: ${view}, date: ${date.toLocaleDateString(locale)}`
                  `${getOnlyMonth(label)}`
                }
              />
            </div>
            <div className={styles.videoMaterialTitle + ' pt-8'}>CALENTAMIENTO</div>
            <div className="pt-7">
              {grayMaterials.map((item, index) => (
                <div className="py-2" key={index}>
                  <Material item={item} type={'gray'} />
                </div>
              ))}
            </div>
            <div className={styles.videoMaterialTitle + ' pt-8'}>ABDOMINALES</div>
            <div className="pt-7">
              {greenMaterials.map((item, index) => (
                <div className="py-2" key={index}>
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
