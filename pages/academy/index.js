import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './academy.module.scss'
import ArrowButton from 'components/components/ArrowButton'
import AcademyCard from 'components/components/Academy/AcademyCard'
import CircularMark from 'components/components/CircularMark'
import AcademyData from 'assets/data/AcademyData'
import { useRouter } from 'next/router'

const Academy = () => {
  const router = useRouter()

  const [cardData, setCardData] = useState([])
  const [filter, setFilter] = useState([
    { id: 0, label: 'filtro 1', active: false },
    { id: 1, label: 'filtro 2', active: false },
  ])

  useEffect(() => {
    setCardData(AcademyData)
  }, [])

  const handleClickFilter = id => {
    const newArr = JSON.parse(JSON.stringify(filter))
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === id) {
        newArr[i].active = !newArr[i].active
        break
      }
    }
    setFilter(newArr)
  }

  const handleClickPayment = data => {
    console.log(data)
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
              <div className="flex justify-start mt-6">
                {filter.map((item, index) => (
                  <div className="mr-2" key={index}>
                    <ArrowButton filter={item} onClick={handleClickFilter} key={index} />
                  </div>
                ))}
              </div>
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
