import React from 'react'
import Image from 'next/image'
import router from 'next/router'

// images
import ArrowRightGrayIcon from 'assets/images/arrow-right-black.svg'
import ArrowRightUpGrayIcon from 'assets/images/arrow-right-up-black.svg'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'components/FemaleHealth/DisciplineSection.module.scss'

const DisciplineSection = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const BoxInfo = [
    {
      id: 1,
      bgColor: '#f8f5f4',
      title: 'Suelo pélvico',
      image: '/images/card1.jpg',
      link: '/female-health/pelvic-floor',
    },
    {
      id: 2,
      bgColor: '#F3F3EB',
      title: 'Preparación al parto',
      image: '/images/card2.jpg',
      link: '/female-health/preparation-for-childbirth',
    },
    { id: 3, bgColor: '#F1F1F1', title: 'Menopausia', image: '/images/card3.jpg', link: '/female-health/menopause' },
    { id: 4, bgColor: '#99A7A9', title: 'Postparto', image: '/images/card4.jpg', link: '/female-health/postpartum' },
    { id: 5, bgColor: '#d9dfdf', title: 'Embarazo', image: '/images/card1.jpg', link: '/female-health/pregnancy' },
    {
      id: 6,
      bgColor: '#e8ebeb',
      title: 'Asesoría del sueño infantil',
      image: '/images/card2.jpg',
      link: 'female-health/child-sleep-counseling',
    },
    {
      id: 7,
      bgColor: '#cecbce',
      title: 'Entrena tu diástasis',
      image: '/images/card3.jpg',
      link: '/female-health/train-your-diastasis',
    },
  ]

  const BoxList = [
    // default
    {
      id: 0,
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

  const [type, setType] = React.useState({})
  const [selectedItem, setSelectedItem] = React.useState(5)

  React.useEffect(() => {
    setType(BoxList[0])
  }, [])

  const handleSetType = (id, index) => {
    setIsLoading(true)
    setSelectedItem(id)
    if (index === 4 && id !== 5) {
      setType(BoxList[5])
    } else {
      setType(BoxList[id])
    }
  }

  React.useEffect(() => {
    if (JSON.stringify(type) !== JSON.stringify({})) {
      setIsLoading(false)
    }
  }, [type])

  return (
    <div className={globalStyles.container}>
      <div className={styles.container}>
        <div className={styles.title}>Disciplinas</div>
        <div className={styles.divider} />
        {/* disciplines part */}
        <div className={'w-full flex flex-wrap justify-between ' + styles.disciplineCard}>
          {JSON.stringify(type) !== JSON.stringify({}) ? (
            type.elem.map((item, index) => (
              <div
                key={index}
                className={
                  'relative cursor-pointer ' +
                  (item.width === 1 ? styles.box01 : item.width === 2 ? styles.box02 : styles.box03)
                }
                style={{ backgroundColor: BoxInfo[item.id - 1].bgColor }}
                onMouseOver={() => (isLoading === false ? handleSetType(item.id, index) : '')}
                onClick={() => router.push(BoxInfo[item.id - 1].link)}
              >
                <div className="w-full h-full relative">
                  <div className={'absolute ' + styles.cardTitle}>{BoxInfo[item.id - 1].title}</div>
                  <div className={'absolute ' + styles.cardArrow}>
                    <Image
                      src={item.id === selectedItem ? ArrowRightGrayIcon : ArrowRightUpGrayIcon}
                      alt=""
                      width={item.id === selectedItem ? 30 : 40}
                      height={item.id === selectedItem ? 24 : 32}
                    />
                  </div>
                  {item.id === selectedItem ? (
                    <Image
                      src={BoxInfo[item.id - 1].image}
                      alt=""
                      width={576}
                      height={288}
                      layout="fill"
                      objectFit="cover"
                      className="opacity-40"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default DisciplineSection
