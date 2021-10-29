import React, { useState, useEffect } from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './plans.module.scss'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import ReactPlayer from 'react-player'
import Material from 'components/components/dashboard/Material'
import Feature from 'components/components/academy/Feature'
import DownloadPDF from 'components/components/academy/DownloadPDF'

const Plans = () => {
  const url = 'https://www.w3schools.com/html/mov_bbb.mp4'
  const [feature, setFeature] = useState([])
  const materials = [
    {
      url: '/images/card1.jpg',
      label: 'Pesas de 2kg',
      description: '2 unidades',
    },
    {
      url: '/images/card1.jpg',
      label: 'Esterilla fina',
      description: '1 unidades',
    },
    {
      url: '/images/card1.jpg',
      label: 'Gomas elásticas',
      description: '3 unidades',
    },
  ]
  useEffect(() => {
    setFeature([
      { id: 0, path: '/images/category.svg', bgColor: '#D2DADA', topLabel: 'Categoria', lowLabel: 'Presencial' },
      { id: 1, path: '/images/type.svg', bgColor: '#DFDBD5', topLabel: 'Tipo', lowLabel: 'Profesional' },
      { id: 1, path: '/images/time.svg', bgColor: '#E3BBAA', topLabel: 'Tiempo', lowLabel: '15h.' },
    ])
  }, [])
  const handleClickDownlodPDF = () => {
    console.log('handleClickDownlodPDF')
  }
  return (
    <div className={'pt-10 pb-24 px-24 ' + styles.container}>
      <div className="flex justify-between">
        <div>
          <div className={styles.highBoldLabel}>Direcciones de facturación</div>
        </div>
        <div className="flex justify-end items-center">
          <div className="pr-4">
            <NotificationButton />
          </div>
          <ProfileInfo />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-8 sm:col-span-12">
          <div className={styles.title}>1 to 1 Streaming</div>
          <div className="pt-14">
            <ReactPlayer url={url} width="100%" height="100%" className={styles.reactPlayer} controls={true} />
          </div>

          <div className="flex justify-between pt-10">
            {feature.map((item, index) => (
              <div key={index}>
                <Feature data={item} />
              </div>
            ))}
            <div>
              <DownloadPDF onClick={handleClickDownlodPDF} />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="pt-7">
              {materials.map((item, index) => (
                <div className="py-2" key={index}>
                  <Material item={item} />
                </div>
              ))}
            </div>
            <div>notes</div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 sm:col-span-12">
          <div className="rounded-xl bg-white py-4 px-16 pb-10 mt-10">
            <div className={styles.material}>Material necesario</div>
            <div className="pt-7">
              {materials.map((item, index) => (
                <div className="py-2" key={index}>
                  <Material item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Plans

Plans.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
