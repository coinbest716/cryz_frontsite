import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './academy.module.scss'
import AcademyCard from 'components/components/academy/AcademyCard'
import CircularMark from 'components/components/CircularMark'
import AcademyData from 'assets/data/AcademyData'
import { useRouter } from 'next/router'

const Academy = () => {
  const router = useRouter()
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    setCardData(AcademyData)
  }, [])

  const handleClickPayment = data => {
    router.push(`/academy/${data.id}`)
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container}>
          <div className="flex justify-between pt-28">
            <div>
              <div className={styles.topTitle}>Academy</div>
              <div className={styles.topDash} />
            </div>
            <div>
              <div className={'z-10'}>
                <CircularMark />
              </div>
            </div>
          </div>
          <div className={styles.cardTitle + ' mb-5'}>Destacados</div>
          <div className="grid grid-cols-12 gap-12 mb-24">
            {cardData?.map((card, index) => (
              <div className={'col-span-12 flex  md:col-span-4 sm:col-span-12 ' + styles.cardAlign} key={index}>
                <AcademyCard data={card} handleClickPayment={handleClickPayment} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Academy

Academy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
