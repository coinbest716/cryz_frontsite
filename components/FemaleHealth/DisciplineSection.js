import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

// images
import ArrowRightGrayIcon from 'assets/images/arrow-right-black.svg'
import ArrowRightUpGrayIcon from 'assets/images/arrow-right-up-black.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/FemaleHealth/DisciplineSection.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const DisciplineSection = props => {
  // variables
  const { viewport } = props
  const router = useRouter()
  const ColorList = ['#f8f5f4', '#F3F3EB', '#F1F1F1', '#99A7A9', '#d9dfdf', '#e8ebeb', '#cecbce']

  const [disciplineList, setDisciplineList] = useState([])
  const [getDisciplineList, { data: disciplineListData, loading: disciplineListLoading, error: disciplineListError }] =
    useLazyQuery(graphql.queries.getDisciplineList)

  const BoxInfo = [
    {
      id: 1,
      bgColor: '#f8f5f4',
      name: 'Suelo pélvico',
      image: '/images/card1.jpg',
      link: '/female-health/pelvic-floor',
    },
    {
      id: 2,
      bgColor: '#F3F3EB',
      name: 'Preparación al parto',
      image: '/images/card2.jpg',
      link: '/female-health/preparation-for-childbirth',
    },
    { id: 3, bgColor: '#F1F1F1', name: 'Menopausia', image: '/images/card3.jpg', link: '/female-health/menopause' },
    { id: 4, bgColor: '#99A7A9', name: 'Postparto', image: '/images/card4.jpg', link: '/female-health/postpartum' },
    { id: 5, bgColor: '#d9dfdf', name: 'Embarazo', image: '/images/card1.jpg', link: '/female-health/pregnancy' },
    {
      id: 6,
      bgColor: '#e8ebeb',
      name: 'Asesoría del sueño infantil',
      image: '/images/card2.jpg',
      link: 'female-health/child-sleep-counseling',
    },
    {
      id: 7,
      bgColor: '#cecbce',
      name: 'Entrena tu diástasis',
      image: '/images/card3.jpg',
      link: '/female-health/train-your-diastasis',
    },
  ]

  const BoxList = [
    // default
    {
      id: 0,
      elem: [
        { id: 1, width: 2, pos: 1 },
        { id: 2, width: 2, pos: 2 },
        { id: 3, width: 2, pos: 3 },
        { id: 4, width: 2, pos: 4 },
        { id: 5, width: 3, pos: 5 },
        { id: 6, width: 2, pos: 6 },
        { id: 7, width: 2, pos: 7 },
      ],
    },
    // box01 selected
    {
      id: 1,
      elem: [
        { id: 1, width: 3, pos: 1 },
        { id: 2, width: 1, pos: 2 },
        { id: 3, width: 1, pos: 3 },
        { id: 4, width: 1, pos: 4 },
        { id: 5, width: 3, pos: 5 },
        { id: 6, width: 2, pos: 6 },
        { id: 7, width: 2, pos: 7 },
      ],
    },
    // box02 selected
    {
      id: 2,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 2, width: 3, pos: 2 },
        { id: 3, width: 1, pos: 3 },
        { id: 4, width: 1, pos: 4 },
        { id: 5, width: 3, pos: 5 },
        { id: 6, width: 2, pos: 6 },
        { id: 7, width: 2, pos: 7 },
      ],
    },
    // box03 selected
    {
      id: 3,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 2, width: 1, pos: 2 },
        { id: 3, width: 3, pos: 3 },
        { id: 4, width: 1, pos: 4 },
        { id: 5, width: 3, pos: 5 },
        { id: 6, width: 2, pos: 6 },
        { id: 7, width: 2, pos: 7 },
      ],
    },
    // box04 selected
    {
      id: 4,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 2, width: 1, pos: 2 },
        { id: 3, width: 1, pos: 3 },
        { id: 4, width: 3, pos: 4 },
        { id: 5, width: 3, pos: 5 },
        { id: 6, width: 2, pos: 6 },
        { id: 7, width: 2, pos: 7 },
      ],
    },
    // box05 selected
    {
      id: 5,
      elem: [
        { id: 1, width: 2, pos: 1 },
        { id: 2, width: 2, pos: 2 },
        { id: 3, width: 2, pos: 3 },
        { id: 4, width: 2, pos: 4 },
        { id: 5, width: 3, pos: 5 },
        { id: 6, width: 2, pos: 6 },
        { id: 7, width: 2, pos: 7 },
      ],
    },
    // box06 selected
    {
      id: 6,
      elem: [
        { id: 1, width: 2, pos: 1 },
        { id: 2, width: 2, pos: 2 },
        { id: 3, width: 2, pos: 3 },
        { id: 4, width: 2, pos: 4 },
        { id: 5, width: 2, pos: 5 },
        { id: 6, width: 3, pos: 6 },
        { id: 7, width: 2, pos: 7 },
      ],
    },
    // box07 selected
    {
      id: 7,
      elem: [
        { id: 1, width: 2, pos: 1 },
        { id: 2, width: 2, pos: 2 },
        { id: 3, width: 2, pos: 3 },
        { id: 4, width: 2, pos: 4 },
        { id: 5, width: 2, pos: 5 },
        { id: 6, width: 2, pos: 6 },
        { id: 7, width: 3, pos: 7 },
      ],
    },
  ]

  const [type, setType] = useState({
    id: 5,
    elem: [
      { id: 1, width: 2, pos: 1 },
      { id: 2, width: 2, pos: 2 },
      { id: 3, width: 2, pos: 3 },
      { id: 4, width: 2, pos: 4 },
      { id: 5, width: 3, pos: 5 },
      { id: 6, width: 2, pos: 6 },
      { id: 7, width: 2, pos: 7 },
    ],
  })

  // handlers
  useEffect(() => {
    getDisciplineList()
  }, [getDisciplineList])

  useEffect(() => {
    if (!disciplineListError && disciplineListData && disciplineListData.getDisciplineList) {
      let array = []
      let temp = {}
      disciplineListData.getDisciplineList.map((item, index) => {
        temp = JSON.parse(JSON.stringify(item))
        temp.bgColor = ColorList[index]
        array.push(temp)
      })
      setDisciplineList(array)
    }
  }, [disciplineListLoading, disciplineListData, disciplineListError])

  const handleMouseOver = (id, index) => {
    if (index === 4 && id !== 5) {
      setType(BoxList[5])
    } else {
      setType(BoxList[id])
    }
  }

  const handleClick = id => {
    router.push(id)
  }

  return (
    <div className={globalStyles.container}>
      <div className={styles.container}>
        <div className={styles.title}>Disciplinas</div>
        <div className={styles.divider} />
        {/* disciplines part */}
        <div className={'w-full flex flex-wrap justify-between ' + styles.disciplineCard}>
          {type.elem.map((item, index) => (
            <div
              key={index}
              className={
                'relative cursor-pointer ' +
                (item.width === 1 ? styles.box01 : item.width === 2 ? styles.box02 : styles.box03)
              }
              style={{ backgroundColor: BoxInfo[item.id - 1].bgColor }}
              onMouseOver={() => handleMouseOver(item.id, index)}
              onClick={() => handleClick(BoxInfo[item.id - 1].id)}
            >
              <div className={'w-full h-full relative'}>
                <div className={'absolute ' + styles.cardTitle}>{BoxInfo[item.id - 1].name}</div>
                <div className={'absolute ' + styles.cardArrow}>
                  <Image
                    src={item.id === type.id ? ArrowRightGrayIcon : ArrowRightUpGrayIcon}
                    alt=""
                    width={item.id === type.id ? 30 : 40}
                    height={item.id === type.id ? 24 : 32}
                  />
                  {viewport === 'ipad' && item.id === type.id ? (
                    <div className={'ml-4 cursor-pointer'}>VER MÁS</div>
                  ) : (
                    <></>
                  )}
                </div>
                {item.id === type.id ? (
                  <Image
                    src={BoxInfo[item.id - 1].image}
                    alt=""
                    width={576}
                    height={288}
                    className={styles.imageArea}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisciplineSection
