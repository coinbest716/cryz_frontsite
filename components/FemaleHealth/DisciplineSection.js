import React, { useEffect, useMemo, useState } from 'react'
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

const ColorList = ['#f8f5f4', '#F3F3EB', '#F1F1F1', '#99A7A9', '#d9dfdf', '#e8ebeb', '#cecbce']

const DisciplineSection = props => {
  // variables
  const { viewport } = props
  const router = useRouter()

  const [disciplineList, setDisciplineList] = useState([])
  const [getDisciplineList, { data: disciplineListData, loading: disciplineListLoading, error: disciplineListError }] =
    useLazyQuery(graphql.queries.getDisciplineList)

  const BoxList = [
    // default
    {
      id: 0,
      elem: [
        { order: 1, width: 2, pos: 1 },
        { order: 2, width: 2, pos: 2 },
        { order: 3, width: 2, pos: 3 },
        { order: 4, width: 2, pos: 4 },
        { order: 5, width: 3, pos: 5 },
        { order: 6, width: 2, pos: 6 },
        { order: 7, width: 2, pos: 7 },
      ],
    },
    // box01 selected
    {
      id: 1,
      elem: [
        { order: 1, width: 3, pos: 1 },
        { order: 2, width: 1, pos: 2 },
        { order: 3, width: 1, pos: 3 },
        { order: 4, width: 1, pos: 4 },
        { order: 5, width: 3, pos: 5 },
        { order: 6, width: 2, pos: 6 },
        { order: 7, width: 2, pos: 7 },
      ],
    },
    // box02 selected
    {
      id: 2,
      elem: [
        { order: 1, width: 1, pos: 1 },
        { order: 2, width: 3, pos: 2 },
        { order: 3, width: 1, pos: 3 },
        { order: 4, width: 1, pos: 4 },
        { order: 5, width: 3, pos: 5 },
        { order: 6, width: 2, pos: 6 },
        { order: 7, width: 2, pos: 7 },
      ],
    },
    // box03 selected
    {
      id: 3,
      elem: [
        { order: 1, width: 1, pos: 1 },
        { order: 2, width: 1, pos: 2 },
        { order: 3, width: 3, pos: 3 },
        { order: 4, width: 1, pos: 4 },
        { order: 5, width: 3, pos: 5 },
        { order: 6, width: 2, pos: 6 },
        { order: 7, width: 2, pos: 7 },
      ],
    },
    // box04 selected
    {
      id: 4,
      elem: [
        { order: 1, width: 1, pos: 1 },
        { order: 2, width: 1, pos: 2 },
        { order: 3, width: 1, pos: 3 },
        { order: 4, width: 3, pos: 4 },
        { order: 5, width: 3, pos: 5 },
        { order: 6, width: 2, pos: 6 },
        { order: 7, width: 2, pos: 7 },
      ],
    },
    // box05 selected
    {
      id: 5,
      elem: [
        { order: 1, width: 2, pos: 1 },
        { order: 2, width: 2, pos: 2 },
        { order: 3, width: 2, pos: 3 },
        { order: 4, width: 2, pos: 4 },
        { order: 5, width: 3, pos: 5 },
        { order: 6, width: 2, pos: 6 },
        { order: 7, width: 2, pos: 7 },
      ],
    },
    // box06 selected
    {
      id: 6,
      elem: [
        { order: 1, width: 2, pos: 1 },
        { order: 2, width: 2, pos: 2 },
        { order: 3, width: 2, pos: 3 },
        { order: 4, width: 2, pos: 4 },
        { order: 5, width: 2, pos: 5 },
        { order: 6, width: 3, pos: 6 },
        { order: 7, width: 2, pos: 7 },
      ],
    },
    // box07 selected
    {
      id: 7,
      elem: [
        { order: 1, width: 2, pos: 1 },
        { order: 2, width: 2, pos: 2 },
        { order: 3, width: 2, pos: 3 },
        { order: 4, width: 2, pos: 4 },
        { order: 5, width: 2, pos: 5 },
        { order: 6, width: 2, pos: 6 },
        { order: 7, width: 3, pos: 7 },
      ],
    },
  ]

  const [type, setType] = useState({
    id: 5,
    elem: [
      { order: 1, width: 2, pos: 1 },
      { order: 2, width: 2, pos: 2 },
      { order: 3, width: 2, pos: 3 },
      { order: 4, width: 2, pos: 4 },
      { order: 5, width: 3, pos: 5 },
      { order: 6, width: 2, pos: 6 },
      { order: 7, width: 2, pos: 7 },
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
        if (temp.id !== 8) {
          array.push(temp)
        }
      })
      setDisciplineList(array)
    }
  }, [disciplineListLoading, disciplineListData, disciplineListError])

  const handleMouseOver = (order, index) => {
    if (index === 4 && order !== 5) {
      setType(BoxList[5])
    } else {
      setType(BoxList[order])
    }
  }

  const handleClick = id => {
    router.push('/female-health/' + id)
  }

  return (
    <div className={globalStyles.container}>
      <div className={styles.container}>
        <div className={styles.title}>Disciplinas</div>
        <div className={styles.divider} />
        {/* disciplines part */}
        {disciplineList.length !== 0 ? (
          <div className={'w-full flex flex-wrap justify-between ' + styles.disciplineCard}>
            {type.elem.map((item, index) => (
              <div
                key={index}
                className={
                  'relative cursor-pointer ' +
                  (item.width === 1 ? styles.box01 : item.width === 2 ? styles.box02 : styles.box03)
                }
                style={{ backgroundColor: disciplineList[index].bgColor }}
                onMouseOver={() => handleMouseOver(item.order, index)}
                onClick={() => handleClick(disciplineList[item.order - 1].id)}
              >
                <div className={'w-full h-full relative'}>
                  <div className={'absolute ' + styles.cardTitle}>{disciplineList[item.order - 1].name}</div>
                  <div className={'absolute ' + styles.cardArrow}>
                    <Image
                      src={item.order === type.id ? ArrowRightGrayIcon : ArrowRightUpGrayIcon}
                      alt=""
                      width={item.order === type.id ? 30 : 40}
                      height={item.order === type.id ? 24 : 32}
                    />
                    {viewport === 'ipad' && item.order === type.id ? (
                      <div className={'ml-4 cursor-pointer'}>VER MÁS</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {item.order === type.id ? (
                    <Image
                      src={
                        disciplineList[item.order - 1]?.image
                          ? disciplineList[item.order - 1]?.image
                          : 'https://via.placeholder.com/576x288?text=Placeholder'
                      }
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
        ) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  )
}

export default DisciplineSection
